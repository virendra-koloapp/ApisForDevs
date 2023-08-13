import { Handler } from "express";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { User } from "../models/user";
import { Order } from "../models/order";

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

export const getAllOrdersHandler: Handler = async (request, response) => {
  const status = request.query.status as string;
  const user = request.query.user as string;

  Order.getOrders({
    status: +status,
    user: user,
  }).then((orders) => {
    response.json({ orders });
  });
};
