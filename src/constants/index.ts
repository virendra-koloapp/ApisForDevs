export const COLLECTION_NAMES = {
  USER: "User",
  CATEGORY: "Category",
  PRODUCT: "Product",
  ORDER: "Order",
};

export const USER_TYPE_ADMIN = "ADMIN";
export const USER_TYPE_CUSTOMER = "CUSTOMER";
export const USER_TYPES = {
  USER_TYPE_ADMIN,
  USER_TYPE_CUSTOMER,
};

const required = (key: string) =>
  (() => {
    throw new Error(`${key} is required !! `);
  })();

export const APP_CONFIG = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || required("JWT_SECRET"),
};
