import prisma from "@/lib/prisma";
import { attributeIDs } from "@/utils/constants";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateProductVariationPrices = async (newPrices) => {
  const variations = await prisma.productVariation.findMany({
    where: {
      net_weight: {
        not: null,
      },
      isPriceFixed: false,
    },
    include: {
      product: {
        include: {
          attributes: true,
          ProductAttributeValue: true,
        },
      },
      productAttributeValues: {
        include: {
          productAttributeValue: {
            include: {
              attribute: true,
              attributeValue: true,
            },
          },
        },
      },
    },
  });

  // find attribute matching with pricing history table for variation
  for (const variation of variations) {
    const materialVariation = variation?.productAttributeValues?.find(
      (pav) =>
        pav?.productAttributeValue?.attribute_id === attributeIDs.MATERIAL
    );
    const isGold =
      Number(materialVariation?.productAttributeValue?.attributeValue_id) ===
      Number(attributeIDs.MATERIAL_GOLD);
    const making_charges = JSON.parse(variation.making_charges);
    const other_charges = JSON.parse(variation.other_charges);

    let price = 0;
    let metalPrice = 0;
    let p = 0;
    if (isGold) {
      const materialGoldKaratVariation = variation.productAttributeValues.find(
        (pav) =>
          pav?.productAttributeValue?.attribute_id === attributeIDs.GOLDKARAT
      );

      const mapstring = String(
        materialGoldKaratVariation.productAttributeValue.attributeValue.name
      )
        .replace(/\s/g, "")
        .toLowerCase();
      if (Object.keys(newPrices).includes(mapstring)) {
        p = newPrices[mapstring];
        metalPrice = p;
      }
    } else {
      const mapstring = String(
        materialVariation?.productAttributeValue?.attributeValue.name
      )
        .replace(/\s/g, "")
        .toLowerCase();
      if (Object.keys(newPrices).includes(mapstring)) {
        p = newPrices[mapstring];
        metalPrice = p;
      }
    }
    metalPrice = metalPrice * variation.net_weight;
    price = price + metalPrice;
    switch (making_charges.charge_type) {
      case "Per Gram On Net Weight":
        price =
          price +
            parseFloat(making_charges.value || 0) *
              parseFloat(variation.net_weight || 0) || 0;
        break;
      case "Per Piece / Flat":
        price = price + (parseFloat(making_charges.value) || 0);
        break;
      case "Per(%) On Metal Rate On Karat":
        const metalpricemakingcharge =
          (metalPrice * (parseFloat(making_charges.value) || 0)) / 100;
        price = price + metalpricemakingcharge;
        break;
      default:
        break;
    }
    const gemstoneAmounts = other_charges.filter(
      (a) => a.charge_type === "gemstone"
    );
    if (gemstoneAmounts.length > 0) {
      let gemstoneAmount = gemstoneAmounts.reduce(
        (a, b) => a + parseFloat(b.value),
        0
      );
      price = price + gemstoneAmount;
    }

    const additionalAmounts = other_charges.filter(
      (a) => a.charge_type === "additional"
    );
    if (additionalAmounts.length > 0) {
      let additionalAmount = additionalAmounts.reduce(
        (a, b) => a + parseFloat(b.value),
        0
      );
      price = price + additionalAmount;
    }
    if (variation.isDiscount) {
      const discount = other_charges.find((a) => a.charge_type === "discount");
      if (discount) {
        switch (discount.name) {
          case "Per Gram On Net Weight":
            let appliedDiscout =
              parseFloat(variation.net_weight || 0) *
                parseFloat(discount.value || 0) || 0;
            price = price - appliedDiscout;
            discount.discount = appliedDiscout;
            break;
          case "Per Piece / Flat":
            price = price - (parseFloat(discount.value) || 0);
            discount.discount = parseFloat(discount.value) || 0;
            break;
          case "Per(%) On Metal Rate On Karat":
            const metalpriceDiscount =
              (metalPrice * (parseFloat(discount.value) || 0)) / 100;
            price = price - metalpriceDiscount || 0;
            discount.discount = metalpriceDiscount;
            break;
          default:
            break;
        }
      }
    }

    if (variation?.shipping_charge) {
      price = price + parseFloat(variation?.shipping_charge || 0);
    }

    let totalPrice = parseFloat(price);
    const vat = other_charges.find((a) => a.charge_type === "vat/tax");
    if (vat.value === "5") {
      const vatprice = (price * 5) / 100;
      vat.tax = vatprice;
      totalPrice = parseFloat(price) + parseFloat(vatprice);
    }

    await prisma.productVariation.update({
      where: { variation_id: variation.variation_id },
      data: {
        selling_price: totalPrice,
        making_charges: JSON.stringify({ ...making_charges, metalPrice: p }),
        other_charges: JSON.stringify(other_charges),
      },
    });
  }
};

const pricingHistoryUpdateSchema = z.object({
  karat24: z
    .number({ message: "karat24 must be a number" })
    .nonnegative({ message: "karat24 is required" }),
  karat22: z
    .number({ message: "karat22 must be a number" })
    .nonnegative({ message: "karat22 is required" }),
  karat21: z
    .number({ message: "karat21 must be a number" })
    .nonnegative({ message: "karat21 is required" }),
  karat18: z
    .number({ message: "karat18 must be a number" })
    .nonnegative({ message: "karat18 is required" }),
  karat14: z
    .number({ message: "karat14 must be a number" })
    .nonnegative({ message: "karat14 is required" }),
  karat09: z
    .number({ message: "karat09 must be a number" })
    .nonnegative({ message: "karat09 is required" }),
  silver: z
    .number({ message: "silver must be a number" })
    .nonnegative({ message: "silver is required" }),
  platinum: z
    .number({ message: "platinum must be a number" })
    .nonnegative({ message: "platinum is required" }),
  palladium: z
    .number({ message: "palladium must be a number" })
    .nonnegative({ message: "palladium is required" }),
});

const pricingHistoryCreateSchema = pricingHistoryUpdateSchema.extend({
  date: z.string({ message: "date is required and must be a string" }),
});

export async function POST(request) {
  try {
    const req = await request.formData();

    // const date = parseFloat(req.get("date"));
    const isoString = new Date().toISOString();
    const date = isoString.substring(0, 10);

    const pricingHistory = await prisma.pricingHistory.findFirst({
      where: { date: date },
    });

    const inputData = {
      karat24: parseFloat(req.get("karat24")),
      karat22: parseFloat(req.get("karat22")),
      karat21: parseFloat(req.get("karat21")),
      karat18: parseFloat(req.get("karat18")),
      karat14: parseFloat(req.get("karat14")),
      karat09: parseFloat(req.get("karat09")),
      silver: parseFloat(req.get("silver")),
      platinum: parseFloat(req.get("platinum")),
      palladium: parseFloat(req.get("palladium")),
    };

    if (pricingHistory) {
      // Validate the input data using Zod
      const validatedData = pricingHistoryUpdateSchema.parse(inputData);

      const updatedPricingHistory = await prisma.pricingHistory.update({
        where: { date: date },
        data: validatedData,
      });
      await updateProductVariationPrices(updatedPricingHistory);
      return NextResponse.json(
        {
          message: `Pricing history updated successfully`,
          updatedPricingHistory,
        },
        { status: 200 }
      );
    } else {
      // Validate the input data using Zod
      const validatedData = pricingHistoryCreateSchema.parse({
        date,
        ...inputData,
      });

      const newPricingHistory = await prisma.pricingHistory.create({
        data: validatedData,
      });

      return NextResponse.json(
        {
          message: `Pricing is created for the date ${date}`,
          newPricingHistory,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
