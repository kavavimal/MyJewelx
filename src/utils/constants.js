export const attributeIDs = {
  MATERIAL: 5,
  GOLDKARAT: 6,
  SIZE: 2,
  COLOR: 1,
  MATERIAL_GOLD: 25,
  MATERIAL_SILVER: 26,
  MATERIAL_PLATINUM: 27,
  MATERIAL_PALLADIUM: 30,
  SIZE_US: 3,
  SIZE_ASIAN: 4,
  ASIAN: 10,
  US: 11,
};

export const ADMIN_ID = 1;
export const VENDOR_ID = 2;
export const CUSTOMER_ID = 3;

export const ATTRIBUTE_ORDER = [
  attributeIDs.MATERIAL,
  attributeIDs.GOLDKARAT,
  attributeIDs.COLOR,
  attributeIDs.SIZE,
  attributeIDs.SIZE_US,
  attributeIDs.SIZE_ASIAN,
];

export const INDIA = 1;

export const variation_discount_types = {
  1 : "Per Gram On Net Weight",
  2  : "Per(%) On Metal Rate On Karat",
  3 : "Per Piece / Flat",
};
export const CURRENCY_SYMBOL = 'AED';
export const CURRENCY_SYMBOL_PAYPAL = 'USD';

export const SUPPORTED_FORMATS_IMAGES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const FILE_SIZE = 500 * 1024 * 1024; // 500M
