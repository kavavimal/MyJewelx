import React from "react";
import Products from "./componets/Products";
import prisma from "@/lib/prisma";
import { attributeIDs } from "@/utils/constants";
import { checkUserSession } from "@/app/actions/users";
import { AcountType } from "@prisma/client";
export const revalidate = 0;

const getProducts = async () => {
  const user = await checkUserSession();
  try {
    if (user.role.role_name !== AcountType.ADMIN) {
      return prisma.product.findMany({
        where: {
          user_id: user.id,
        },
        include: {
          variations: {
            include: {
              image: true,
            },
          },

          reviews: {
            include: {
              fromUser: true,
              user: true,
              images: true,
              product: {
                include: {
                  user: true,
                },
              },
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
    }
    return prisma.product.findMany({
      include: {
        variations: {
          include: {
            image: true,
          },
        },
        ProductAttributeValue: {
          include: {
            attribute: true,
            attributeValue: true,
          },
        },
        reviews: {
          include: {
            fromUser: true,
            user: true,
            images: true,
            product: {
              include: {
                user: true,
              },
            },
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
  } catch (error) {}
};

const getAttributes = async () => {
  return prisma.attribute.findMany({
    include: {
      values: true,
    },
    where: {
      attribute_id: {
        equals: attributeIDs.MATERIAL,
      },
    },
  });
};

const getKarats = async () => {
  return prisma.attribute.findMany({
    include: {
      values: true,
    },
    where: {
      attribute_id: {
        equals: attributeIDs.GOLDKARAT,
      },
    },
  });
};
const products = async () => {
  const response = await getProducts();
  const attr = await getAttributes();
  const karat = await getKarats();
  return (
    <>
      <Products products={response} attributes={attr} karats={karat} />
    </>
  );
};

export default products;
