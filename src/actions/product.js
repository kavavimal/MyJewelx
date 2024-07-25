"use server";

import { checkUserSession } from "@/app/(frontend)/layout";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const getProducts = (data = false) => {
  let where = {};
  if (data !== false && data?.status) {
    where = {
      status: { in: data?.status },
    };
  }
  if (data !== false && data?.featured) {
    where = {
      ...where,
      featured: data?.featured,
    };
  }
  return prisma.product.findMany({
    where: where,
    include: {
      variations: {
        include: {
          image: true,
        },
      },
      user: {
        include: {
          vendor: true,
        },
      },
    },
    orderBy: {
      product_id: "desc",
    },
  });
};

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
export const updateProductFeaturedStatus = async (productId, newStatus) => {
  const user = await checkUserSession();

  try {
    const product = await prisma.product.update({
      data: {
        featured: newStatus,
      },
      where: {
        product_id: productId,
      },
    });
    revalidatePath("/");
    return {
      message: "Product Feature Stat Updated Successfully",
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

export const searchProducts = async (data) => {
  // const firstNames =
  //   data?.vendors &&
  //   data.vendors.length > 0 &&
  //   data.vendors.map((vendor) => vendor.split(" ")[0]);
  // const lastName =
  //   data?.vendors &&
  //   data.vendors.length > 0 &&
  //   data.vendors.map((vendor) => vendor.split(" ")[1]);
  try {
    let pricefilter = false;
    if (data?.price && data?.price?.min && data?.price?.max) {
      pricefilter = {
        variations: {
          some: {
            selling_price: {
              gt: Number(data.price.min),
              lt: Number(data.price.max),
            },
          },
        },
      };
    }
    let order = {};

    switch (data.sort) {
      case "Ascending":
        order = { product_id: "asc" };
        break;
      case "Descending":
        order = { product_id: "desc" };
        break;
      default:
        order = { product_id: "asc" };
    }
    const page = data.page || 1;
    const pageSize = data.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const grams = await getGrams(data.q);
    const products = await prisma.product.findMany({
      where: {
        status: "PUBLISHED",
        ...(pricefilter && pricefilter),
        ...(data.categories &&
          data.categories.length > 0 && {
            categoryId: {
              in: data.categories,
            },
          }),
        ...(data?.subCategories &&
          data?.subCategories?.length > 0 && {
            subCategoryId: {
              in: data.subCategories,
            },
          }),

        ...(data?.vendors &&
          data?.vendors?.length > 0 && {
            user: {
              vendor: {
                store_name: {
                  in: data.vendors,
                },
              },
            },
          }),

        ...(data.metals &&
          data.metals.length > 0 && {
            ProductAttributeValue: {
              some: {
                attributeValue_id: {
                  in: data.metals,
                },
              },
            },
          }),

        ...(data.patterns &&
          data.patterns.length > 0 && {
            patterns: {
              some: {
                pattern_id: {
                  in: data.patterns,
                },
              },
            },
          }),

        ...(data.collections &&
          data.collections.length > 0 && {
            collections: {
              some: {
                collection_id: {
                  in: data.collections,
                },
              },
            },
          }),

        ...(data.characteristics &&
          data.characteristics.length > 0 && {
            productChars: {
              some: {
                characteristic: {
                  chars_id: {
                    in: data.characteristics,
                  },
                },
              },
            },
          }),

        ...(data?.category && {
          OR: [
            {
              category: {
                name: {
                  equals: data?.category,
                  mode: "insensitive",
                },
              },
            },
            {
              subcategory: {
                name: {
                  equals: data?.category,
                  mode: "insensitive",
                },
              },
            },
          ],
        }),

        ...(data?.q && {
          OR: [
            {
              product_name: {
                contains: data?.q,
                mode: "insensitive",
              },
            },
            {
              user: {
                OR: [
                  {
                    firstName: {
                      contains: data?.q,
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      contains: data?.q,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
            {
              variations: {
                some: {
                  variation_name: {
                    contains: data?.q,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              ProductAttributeValue: {
                some: {
                  attributeValue: {
                    attribute: {
                      name: {
                        contains: data?.q,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            },
            {
              patterns: {
                some: {
                  pattern: {
                    name: {
                      contains: data?.q,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
            {
              collections: {
                some: {
                  collection: {
                    name: {
                      contains: data?.q,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
            {
              productChars: {
                some: {
                  characteristic: {
                    name: {
                      contains: data?.q,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
            {
              variations: {
                some: {
                  net_weight: {
                    equals: grams,
                  },
                },
              },
            },
            {
              variations: {
                some: {
                  variation_name: {
                    contains: data?.q,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }),
      },
      include: {
        variations: {
          include: { image: true },
        },
        reviews: true,
        user: {
          include: {
            vendor: true,
          },
        },
      },
      orderBy: order,
      // skip: skip,
      // take: pageSize,
    });

    // Manual sorting based on variations' selling price
    if (data.sort === "Low to High" || data.sort === "High to Low") {
      products.sort((a, b) => {
        const aPrice = a.variations.reduce(
          (min, v) => (v.selling_price < min ? v.selling_price : min),
          Number.MAX_VALUE
        );
        const bPrice = b.variations.reduce(
          (min, v) => (v.selling_price < min ? v.selling_price : min),
          Number.MAX_VALUE
        );

        return data.sort === "Low to High" ? aPrice - bPrice : bPrice - aPrice;
      });
    }
    return products;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const getVendors = async () => {
  return await prisma.user.findMany({
    where: {
      role_id: 2,
    },
    include: {
      vendor: true,
    },
  });
};

export const getMetals = async () => {
  return await prisma.attributeValue.findMany({
    where: {
      attribute_id: 5,
    },
  });
};

export const getPatterns = async () => {
  return await prisma.pattern.findMany();
};

export const getCharacteristics = async () => {
  return prisma.characteristic.findMany();
};

export const getCollections = async () => {
  return prisma.collection.findMany();
};

async function getGrams(str) {
  // Regular expression to find the number followed by "gram" (case insensitive)
  const regex = /(\d+)\s*gram/i;

  // Execute the regex on the input string
  const match = await str?.match(regex);

  // If a match is found, return the number of grams
  if (match) {
    return parseInt(match[1], 10); // Parse the captured number as an integer
  } else {
    // If no match is found, return null or any default value
    return null;
  }
}
