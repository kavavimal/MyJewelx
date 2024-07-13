import prisma from "@/lib/prisma";

export async function otpDelete() {
  const OTPs = prisma.otpVerification.findMany();

  const expiredOTPs = [];
  await OTPs.map((otp) => {
    if (Date.now() > otp.expiry) {
      expiredOTPs.push(otp.id);
    }
  });

  const deletedOTPs = await prisma.otpVerification.deleteMany({
    where: { id: { in: expiredOTPs } },
  });

  return deletedOTPs;
}
