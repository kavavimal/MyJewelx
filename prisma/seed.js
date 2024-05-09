const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const permissions = [
  //   { permission_id: 1, permission_name: "customer_add", description: "User can add Customers"},
  //   { permission_id: 2, permission_name: "customer_update", description: "User can Update Customers"},
  //   { permission_id: 3, permission_name: "customer_delete", description: "User can delete Customers"},
  //   { permission_id: 4, permission_name: "customer_read", description: "User can read Customers"},
  //   { permission_id: 5, permission_name: "vendor_add", description: "User can add Vendors"},
  //   { permission_id: 6, permission_name: "vendor_update", description: "User can update Vendors"},
  //   { permission_id: 7, permission_name: "vendor_delete", description: "User can delete Vendors"},
  //   { permission_id: 8, permission_name: "vendor_read", description: "User can read Vendors"},
  ];

  if (permissions && permissions.length > 0 ) { 
  await Promise.all(
    permissions.map(async (permission) => {
      await prisma.permission.upsert({
        where: { permission_id: permission.permission_id },
        update: { permission_name: permission.permission_name, description: permission.description },
        create: permission,
      });
    })
  );
}
}


main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });