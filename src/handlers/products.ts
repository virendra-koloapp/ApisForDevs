import { Handler } from "express";
import { Product } from "../models/product";

export const getProductsHandler: Handler = (request, response) => {
  const { query } = request;

  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;
  const { q: search, category } = query;

  const filter = {
    ...(category ? { category } : {}),
    ...(search
      ? {
          $or: [
            {
              title: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {}),
  };

  Product.find(filter)
    .limit(limit)
    .skip(skip)
    .then((products) => {
      response.json({
        products,
      });
    });
};
