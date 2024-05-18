const { AcountType } = require("@prisma/client");
const permissions = require("./permissions");

module.exports = [
  {
    email: "admin@jewlex.com",
    firstName: "admin",
    lastName: "user",
    account_type: AcountType.ADMIN,
    role: {
      connect: { role_name: AcountType.ADMIN },
    },
  },
  {
    email: "vendor@jewlex.com",
    firstName: "vendor",
    lastName: "user",
    account_type: AcountType.VENDOR,
    role: {
      connect: { role_name: AcountType.VENDOR },
    },
  },
  {
    email: "customer@jewlex.com",
    firstName: "customer",
    lastName: "user",
    account_type: AcountType.CUSTOMER,
    role: {
      connect: { role_name: AcountType.CUSTOMER },
    },
  },
];
