import { NextResponse } from "next/server";
import { z } from "zod";

const vendorStoreSchema = z.object({
  license_number: z
    .string()
    .min(12, "License number should be of minimum 12 characters")
    .max(20, "To long license number"),
  issued_at: z.string().min(1, "License Issued place required"),
  issued_date: z.string().min(1, "License Issued date required"),
  expiry_date: z.string().min(1, "License Issued date required"),
  licence_address: z.string().optional(),
  licence_city: z.string().min(1, "License city required"),
  licence_state: z.string().min(1, "License state required"),
  licence_zip_code: z.string().min(1, "License zip code required"),
  licence_country: z.string().min(1, "License country required"),
});
const vendorPaymentInfoSchema = z.object({
  account_name: z.string().min(1, "License Issued date required"),
  account_number: z.string().min(8, "License Issued date required"),
  bank_name: z.string().min(1, "License Issued date required"),
  routing_number: z.string().min(1, "Routing Number required"),
  bank_iban: z.string().min(1, "License Issued date required"),
  bank_swift_code: z.string().min(1, "License Issued date required"),
  bank_address: z.string().optional(),
  bank_city: z.string().min(1, "License Issued date required"),
  bank_zip_code: z.string().min(1, "License Issued date required"),
  bank_country: z.string().min(1, "License Issued date required"),
});

export async function PUT(request, { params }) {
  try {
    const vendor_id = Number(params.id);
    const res = await request.formData();

    // const update_type = res.get("update_type");
    const license_number = res.get("license_number");
    const issued_at = res.get("issued_at");
    const issued_date = res.get("issued_date");
    const expiry_date = res.get("expiry_date");
    const licence_address = res.get("licence_address");
    const licence_city = res.get("licence_city");
    const licence_state = res.get("licence_state");
    const licence_zip_code = res.get("licence_zip_code");
    const licence_country = res.get("licence_country");
    const account_name = res.get("account_name");
    const account_number = res.get("account_number");
    const bank_name = res.get("bank_name");
    const bank_iban = res.get("bank_iban");
    const routing_number = res.get("routing_number");
    const bank_swift_code = res.get("bank_swift_code");
    const bank_address = res.get("bank_address");
    const bank_city = res.get("bank_city");
    const bank_zip_code = res.get("bank_zip_code");
    const bank_country = res.get("bank_country");

    let vendorUpdateData = {};
    if (license_number) {
      vendorUpdateData = vendorStoreSchema.parse({
        issued_at,
        issued_date,
        expiry_date,
        license_number,
        licence_address,
        licence_city,
        licence_state,
        licence_zip_code,
        licence_country,
      });
    } else {
      vendorUpdateData = vendorPaymentInfoSchema.parse({
        account_name,
        account_number,
        bank_name,
        bank_iban,
        routing_number,
        bank_swift_code,
        bank_address,
        bank_city,
        bank_zip_code,
        bank_country,
      });
    }

    // Update the vendor in the database using Prisma
    const updatedVendor = await prisma.vendor.update({
      where: {
        id: vendor_id,
      },
      data: vendorUpdateData,
    });

    return NextResponse.json(
      {
        message: `Vendor ${
          license_number ? "Store" : "Payment"
        } information updated successfully`,
        updatedVendor,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  }
}
