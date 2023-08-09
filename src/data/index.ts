import { Category } from "../models/category";
import { Product } from "../models/product";
import { logger } from "../utils/logger";
import { categories } from "./categories";
import { generateProducts } from "./products";

const saveCategories = () => {
  return Category.create(
    categories.map(
      (title) =>
        new Category({
          title,
        })
    )
  )
    .then(() => {
      logger.info("Saved Categories");
    })
    .catch(() => logger.info("Failed to save categories"));
};
const saveProducts = async () => {
  const count = await Product.count();

  if (count >= 100) {
    return;
  }
  const products = await generateProducts(100);
  return Product.create(products)
    .then(() => {
      logger.info("Saved Products");
    })
    .catch(() => logger.info("Failed to save Products"));
};

export const generateMockData = async () => {
  await saveCategories();
  await saveProducts();
};
