// Import Prisma client
const { PrismaClient, AcountType } = require("@prisma/client");

const users = require("./data/users");
const roles = require("./data/roles");
const { hash } = require("bcrypt");

// Instantiate Prisma client
const prisma = new PrismaClient();

// Seed roles and permissions
async function seedRolesAndPermissions() {
  for (const role of roles) {
    const createdRole = await prisma.role.upsert({
      create: {
        role_name: role.name,
        // You can add description here if needed
      },
      update: {},
      where: {
        role_name: role.name,
      },
    });

    // Get role ID
    const roleId = createdRole.role_id;

    await prisma.rolePermission.deleteMany({
      where: {
        role_id: roleId,
      },
    });

    // Seed permissions for each role
    for (const permission of role.permissions) {
      const createdPermission = await prisma.permission.upsert({
        create: {
          permission_name: permission,
          // Add description if needed
        },
        update: {},
        where: {
          permission_name: permission,
        },
      });

      // Get permission ID
      const permissionId = createdPermission.permission_id;

      // Create connection between role and permission
      await prisma.rolePermission.create({
        data: {
          role_id: roleId,
          permission_id: permissionId,
        },
      });
    }
  }
}
// Seed users with roles
async function seedUsers() {
  for (const user of users) {
    user.password = await hash(user.firstName + "@123", 10);
    const createUser = await prisma.user.upsert({
      create: user,
      update: user,
      where: {
        email: user.email,
      },
    });
  }
}

// Seed the database
async function seed() {
  //  if wanted to remove all records from the database all tables but autoincrment id will continuew to last one.
  if (false) {
    const tablenames =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== "_prisma_migrations")
      .map((name) => `"public"."${name}"`)
      .join(", ");

    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    } catch (error) {
      console.log({ error });
    }
  }
  await seedRolesAndPermissions();
  await seedUsers();
}

// Run the seeding function
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
