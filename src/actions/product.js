"use server";

import { checkUserSession } from "@/app/(frontend)/layout";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const updateProductStatus = async (productId, newStatus) => {
  const user = await checkUserSession();

  try {
    const product = await prisma.product.update({
      data: {
        status: newStatus,
      },
      where: {
        product_id: productId,
      },
    });
    revalidatePath("/");
    return {
      message: "Product Status Updated Successfully",
      product,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};
export const getProduct = async (product_id) => {
  const user = await checkUserSession();
  if (!user) {
    return {
      message: "Unautorized",
      e: "Unautorized",
    };
  }

  try {
    const productData = await prisma.product.findFirst({
      where: { product_id: Number(product_id) },
      include: {
        ProductAttributeValue: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
        attributes: true,
        variations: {
          include: {
            productAttributeValues: {
              include: {
                productAttributeValue: {
                  include: {
                    attributeValue: true,
                    attribute: true,
                  },
                },
              },
            },
            image: true,
          },
        },
        genders: true,
        category: true,
        tags: true,
        collections: true,
        patterns: true,
        states: true,
        productChars: {
          include: {
            characteristic: true,
          },
        },
      },
    });
    return {
      message: "Product fetch Successfully",
      productData,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};

export const getProductAttributes = async (product_id) => {
  const user = await checkUserSession();
  if (!user) {
    return {
      message: "Unautorized",
      e: "Unautorized",
    };
  }

  try {
    const productData = await prisma.productAttributeValue.groupBy({
      by: ["attribute_id"],
      where: { product_id: Number(product_id) },
    });

    return {
      message: "Product attributes fetch Successfully",
      productData,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};

export const createProduct = async (formData) => {
  const user = await checkUserSession();

  try {
    const user_id = user.id;
    const product_name = formData.product_name;
    const attributes = formData.attributes;
    const category = Number(formData.category);
    const subCategory = formData.subCategory
      ? Number(formData.subCategory)
      : null;
    const status = formData.status || "DRAFT";
    const product = await prisma.product.create({
      data: {
        product_name: product_name,
        status: status,
        delivery_includes: "",
        return_policy: "",
        user: {
          connect: { id: user_id },
        },

        attributes: {
          create: attributes.map((attribute_id) => ({
            attribute: {
              connect: { attribute_id: Number(attribute_id) },
            },
          })),
        },
        category: {
          connect: { category_id: category },
        },

        ...(subCategory && {
          subcategory: {
            connect: { category_id: subCategory },
          },
        }),
      },
    });
    return {
      message: "Product Created Successfully",
      product,
      success: true,
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      error: e,
    };
  }
};
