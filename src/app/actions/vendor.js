"use server";
import prisma from "@/lib/prisma";
import { sendVendorStatusChangeEmail } from "@/lib/sendMails";
import { revalidatePath } from "next/cache";
import { UserStatus } from "@prisma/client";

export const changeVendorStatus = async (id, status) => {
  try {
    const vendor = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    sendVendorStatusChangeEmail(vendor);
    revalidatePath("/");
    return vendor;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getStoreURLs = () => {
  return prisma.vendor.findMany({
    select: {
      store_url: true,
    },
  });
};

export const getAccountNumbers = () => {
  return prisma.vendor.findMany({
    select: {
      account_number: true,
    },
  });
};

export const getLicenseNumbers = () => {
  return prisma.vendor.findMany({
    select: {
      license_number: true,
    },
  });
};

export const searchVendors = async (data) => {
  try {
    const transformedKarats = data?.karats?.map(
      (karat) => karat.replace("Karat ", "") + " Karat"
    );
    let vendors = await prisma.user.findMany({
      where: {
        role_id: 2,
        status: UserStatus.ACTIVE,
        ...(data?.locations?.length > 0 && {
          vendor: {
            OR: [
              {
                licence_city: {
                  in: data.locations, // Use 'in' instead of 'contains'
                },
              },
              {
                licence_state: {
                  in: data.locations, // Use 'in' instead of 'contains'
                },
              },
            ],
          },
        }),

        // ...(data?.likes &&
        //   data?.likes.min &&
        //   data?.likes.max && {
        //     vendor: {
        //       likesReceived: {
        //         some: {
        //           _count: {
        //             likesReceived: {
        //               gte: data.likes.min,
        //               lte: data.likes.max,
        //             },
        //           },
        //         },
        //       },
        //     },
        //   }),

        ...(data.categories.length > 0 ||
        data.subCategories.length > 0 ||
        data.metals.length > 0 ||
        data.characteristics.length > 0 ||
        data.karats.length > 0 ||
        data.tags.length > 0 ||
        data.collections.length > 0
          ? {
              products: {
                some: {
                  status: "PUBLISHED",
                  ...(data.categories &&
                    data.categories.length > 0 && {
                      categoryId: {
                        in: data.categories,
                      },
                    }),
                  ...(data.subCategories &&
                    data.subCategories.length > 0 && {
                      subCategoryId: {
                        in: data.subCategories,
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
                  ...(data.tags &&
                    data.tags.length > 0 && {
                      tags: {
                        some: {
                          tag_id: {
                            in: data.tags,
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
                  ...(data.karats &&
                    data.karats.length > 0 && {
                      variations: {
                        some: {
                          OR: transformedKarats.map((karat) => ({
                            variation_name: {
                              contains: karat,
                              mode: "insensitive",
                            },
                          })),
                        },
                      },
                    }),
                },
              },
            }
          : {}),
      },
      include: {
        vendor: true,
        reviews: true,
        products: {
          include: {
            variations: {
              include: {
                orderItems: true,
                image: true,
              },
            },
            reviews: true,
            tags: true,
            collections: true,
          },
        },
        image: true,
        banner_image: true,
        _count: {
          select: {
            products: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
        likesReceived: true,
        _count: {
          select: {
            likesReceived: true,
            products: true,
            reviews: true,
          },
        },
      },
    });
    if (data?.rating && data?.rating?.length > 0) {
      vendors = vendors.filter((vendor) => {
        const reviews = vendor?.reviews || [];
        if (reviews.length !== 0) {
          const allRating = reviews.map((item) => item.rating);
          const sumRating = allRating.reduce((a, b) => a + b, 0);
          const avgRating = Math.floor(sumRating / allRating.length) || 0;

          return data?.rating.includes(avgRating);
        }
      });
    }

    if (data?.likes && (data?.likes.min !== 0 || data?.likes.max !== 2000)) {
      vendors = vendors.filter((vendor) => {
        const likesCount = vendor?.likesReceived?.length || 0;

        return likesCount >= data.likes.min && likesCount <= data.likes.max;
      });
    }

    if (data?.soldProducts && data?.soldProducts.length > 0) {
      vendors = vendors.filter((vendor) => {
        const products = vendor?.products || [];

        if (products.length !== 0) {
          const totalSoldItems = products.reduce((totalItems, product) => {
            const productOrderItems = product?.variations?.reduce(
              (variationItems, variation) =>
                variationItems + (variation.orderItems?.length || 0),
              0
            );
            return totalItems + productOrderItems;
          }, 0);

          return data.soldProducts.some(
            (prod) => totalSoldItems >= prod.min && totalSoldItems <= prod.max
          );
        }

        return false;
      });
    }

    return vendors;
  } catch (e) {
    console.log("Error in searchVendors:", e);
    return [];
  }
};

export const getVendors = async () => {
  return prisma.user.findMany({
    where: {
      role_id: 2,
    },
    include: {
      vendor: true,
    },
  });
};
