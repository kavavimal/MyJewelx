const { AcountType } = require("@prisma/client");
const permissions = require("./permissions");

module.exports = [
  {
    email: "admin@jewlex.com",
    username: "admin",
    account_type: AcountType.ADMIN,
    role: {
      connect: { role_name: AcountType.ADMIN },
    },
  },
  {
    email: "vendor@jewlex.com",
    username: "vendor",
    account_type: AcountType.VENDOR,
    role: {
      connect: { role_name: AcountType.VENDOR },
    },
  },
  {
    email: "customer@jewlex.com",
    username: "customer",
    account_type: AcountType.CUSTOMER,
    // first_name: "admin",
    // last_name: "",
    // phone_number: "",
    role: {
      connect: { role_name: AcountType.CUSTOMER },
    },
  },
];
