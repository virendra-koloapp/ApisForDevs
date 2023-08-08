export const COLLECTION_NAMES = {
  USER: "User",
};

const required = (key: string) =>
  (() => {
    throw new Error(`${key} is required !! `);
  })();

export const APP_CONFIG = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || required("JWT_SECRET"),
};
