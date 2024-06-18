// Import Prisma client
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");

const users = require("./data/users");
const roles = require("./data/roles");
const attributes = require("./data/attributes");
const categories = require("./data/categories");

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

async function seedAttributes() {
  for (const attribute of attributes) {
    const createdAttribute = await prisma.attribute.upsert({
      create: {
        name: attribute.name,
        description: attribute.description,
      },
      update: {},
      where: {
        name: attribute.name,
      },
    });

    // Get new attribute ID
    const attributeId = createdAttribute.attribute_id;
    // remove all attribute values for this attribute
    await prisma.attributeValue.deleteMany({
      where: {
        attribute_id: attributeId,
      },
    });

    // Seed attribute values for each attribute
    for (const v of attribute.values) {
      const createdAValue = await prisma.attributeValue.upsert({
        create: {
          name: v.name,
          description: v.description,
          attribute_id: attributeId,
        },
        update: {
          name: v.name,
          description: v.description,
          attribute_id: attributeId,
        },
        where: {
          name: v.name,
          attribute_id: attributeId,
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
async function seedCollection() {
  const Collections = [
    { name: "New Arrival", description: "New Arrival" },
    { name: "Best Seller", description: "Best Seller" },
  ];
  for (const collection of Collections) {
    await prisma.collection.upsert({
      create: { name: collection.name, description: collection.description },
      update: { name: collection.name, description: collection.description },
      where: {
        name: collection.name,
      },
    });
  }
}

async function addCat(category, parent_id = null) {
  // add recursive category
  let cat = {
    name: category.name,
    description: category.description,
    category_image: category.category_image,
  }
  if(parent_id !== null) cat.parent_id = parent_id;
  const createdCat = await prisma.category.upsert({
    create: cat,
    update: cat,
    where: {
      name: cat.name,
    },
  });
  // check recursinve
  if (category.children && category.children.length > 0) {
    addCat(cat, createdCat.category_id)
  }
}

async function seedCategory() {
  for (const category of categories) {
    addCat(category);
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
  await seedAttributes();
  await seedCategory();
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
