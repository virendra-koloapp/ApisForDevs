import { Handler } from "express";
import { Category } from "../models/category";
import { User } from "../models/user";
import { Product } from "../models/product";

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

export const getAllProductsHandler: Handler = (request, response) => {
  Product.find().then((products) => {
    response.json({ products });
  });
};
