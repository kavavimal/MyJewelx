const { AcountType } = require("@prisma/client");

module.exports = [
  {
    name: AcountType.ADMIN,
    permissions: ["customers_view", "customer_create", "customer_update", "customer_delete",
      "vendors_view", "vendor_create", "vendor_update", "vendor_delete",
      "products_view", "product_create", "product_update", "product_delete",
      "roles_view", "role_create", "role_update", 'role_delete',
      "permissions_view", "permission_create", "permission_update", "permission_delete",
      "whishList_view",
      "feedbacks_view","feedback_delete",
      "orders_view", "orders_place", "order_update", "order_status_update"],
  },
  {
    name: AcountType.VENDOR,
    permissions: ["products_view", "product_create", "product_update", "product_delete", "whishList_view",
      "feedbacks_view", "orders_view", "order_status_update",
    ],
  },
  { name: AcountType.CUSTOMER, 
    permissions: ["products_view", "feedback_create", "feedbacks_view", "feedback_update",
   "feedback_delete", "whishList_view", "whishList_product_add", "whishList_product_update",
   "whishList_product_remove", "orders_view", "order_place", "order_update", "orders_status_update",] },
];
