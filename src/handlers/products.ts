import { Handler, json } from "express";
import { Product } from "../models/product";
import { Category } from "../models/category";

export const getProductsHandler: Handler = async (request, response) => {
  const { query } = request;

  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const { q: search, category } = query;

  const products = await Product.getProducts({
    query: {
      category: category as string,
      limit: limit,
      page: page,
      search: search as string,
    },
  });

  response.json({
    products,
  });
};
export const getCategoriesHandler: Handler = async (request, response) => {
  const categories = await Category.find();
  response.json({
    categories,
  });
};
