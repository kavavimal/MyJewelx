"use server";

import prisma from "@/lib/prisma";
import { JODStatusMail } from "@/lib/sendMails";

export const updatePODStatus = async (id, newStatus) => {
  try {
    const findPodRec = await prisma.productOnDemand.findFirst({
      where: { id },
      include: {
        user: true,
      },
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
    await JODStatusMail(findPodRec.user, {
      new: podData?.Status,
      prev: findPodRec.Status,
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
