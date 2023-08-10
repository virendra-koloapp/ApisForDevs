import { Handler } from "express";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { User } from "../models/user";

export const getAllUsersHandler: Handler = (request, response) => {
  User.find().then((users) => {
    response.json({ users });
  });
};

export const getAllCategoriesHandler: Handler = (request, response) => {
  Category.find().then((categories) => {
    response.json({ categories });
  });
};

export const getAllProductsHandler: Handler = async (request, response) => {
  Product.getProducts().then((products) => {
    response.json({ products });
  });
};
