"use server";

import prisma from "@/lib/prisma";

export const updatePODStatus =  async (id, newStatus) => {
    try {
      const findPodRec = await prisma.productOnDemand.findFirst({
        where: { id },
      });
      if (!findPodRec) {
        return {
          message: "Product Request not found",
          status: "error",
        };
      }
     
      const podData = await prisma.productOnDemand.update({
        where: { id },
        data: { Status: newStatus },
      });
      return { message: "Request Status Updated Succesfully", podData };
    } catch (e) {
      return {
        message: "Something went wrong",
        status: "error",
        error: e,
      };
    }
  };
  