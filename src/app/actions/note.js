"use server";

import prisma from "@/lib/prisma";

export const removeNoteAction = async (note_id) => {
  const remRespnse = await prisma.notes.delete({
    where: { id: note_id },
  });
  return remRespnse;
};
