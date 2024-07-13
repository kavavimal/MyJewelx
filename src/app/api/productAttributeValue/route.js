import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const productAttributeValueRelationSchema = z.object({
  product_id: z.number(),
  attribute_and_values: z.array(
    z.object({
      attribute_id: z.number(),
      aValues: z.array(z.number()),
    })
  ),
});

export async function POST(request) {
  try {
    const res = await request.formData();
    const product_id = Number(res.get("product_id"));
    const attribute_and_values = await JSON.parse(
      res.get("attribute_and_values")
    );

    const parsedAttributeAndValues = productAttributeValueRelationSchema.parse({
      product_id,
      attribute_and_values,
    });

    const productAttributeValues = await prisma.productAttributeValue.findMany({
      where: {
        product_id: product_id,
      },
      include: {
        productvariations: true,
      },
    });

    const product_attribute_values =
      parsedAttributeAndValues.attribute_and_values.flatMap((record) => {
        return record.aValues.map((value) => ({
          product_id: parsedAttributeAndValues.product_id,
          attribute_id: Number(record.attribute_id),
          attributeValue_id: Number(value),
        }));
      });

    if (productAttributeValues.length > 0) {
      let toCreate = [];
    let toDelete = [];

    const existingRecordsMap = new Map(
      productAttributeValues.map(record => [
        `${record.attribute_id}-${record.attributeValue_id}`,
        record
      ])
    );

    product_attribute_values.forEach(newRecord => {
      const key = `${newRecord.attribute_id}-${newRecord.attributeValue_id}`;
      if (!existingRecordsMap.has(key)) {
        toCreate.push(newRecord);
      } else {
        // If the record exists in the new data, remove it from the map (so we don't delete it later)
        existingRecordsMap.delete(key);
      }
    });

    // Remaining items in existingRecordsMap are to be deleted
    toDelete = Array.from(existingRecordsMap.values());

      if (toDelete.length > 0) {
        let variation_id_array = toDelete.flatMap((item) => {
          return item.productvariations.map(
            (variation_item) => variation_item.productVariation_id
          );
        });
        
        if (variation_id_array.length > 0) {
          await prisma.productVariationAttribute.deleteMany({
            where: { productVariation_id: { in: variation_id_array } },
          });

          await prisma.productVariation.deleteMany({
            where: { variation_id: { in: variation_id_array } },
          });
        }
        await prisma.productAttributeValue.deleteMany({
          where: {
            productAttributeValue_id: {
              in: toDelete.map((item) => item.productAttributeValue_id),
            },
          },
        });
      }

      if (toCreate.length > 0) {
        await prisma.productAttributeValue.createMany({
          data: toCreate,
        });
      }

      const updatedProductAttributeValue =
        await prisma.productAttributeValue.findMany({
          where: {
            product_id: product_id,
          },
        });

      return NextResponse.json(
        {
          message: "Product, attribute and attributeValue relations updated",
          updatedProductAttributeValue,
        },
        { status: 201 }
      );
    } else {
      const createManyRelations = await prisma.productAttributeValue.createMany(
        {
          data: product_attribute_values,
          skipDuplicates: true,
        }
      );

      const updatedProductAttributeValue =
        await prisma.productAttributeValue.findMany({
          where: {
            product_id: product_id,
          },
        });

      return NextResponse.json(
        {
          message: "Product, attribute and attributeValue relations created",
          createManyRelations,
          updatedProductAttributeValue,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("error from catch", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation error",
          issues: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  }
}
