import { Handler } from "express";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { User } from "../models/user";
import { Order } from "../models/order";
import { getProductDataFromHTML } from "../utils/flipkart";
import axios from "axios";
import { ApiError } from "../errors/ApiError";

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
export const importProductFromFlipkartHandler: Handler = async (
  request,
  apiResponse,
  next
) => {
  if (!request.body.url) {
    apiResponse.status(400);
    return next(
      new ApiError({
        message: "Url is required",
      })
    );
  }
  axios.get(request.body.url).then(async (response) => {
    const rawProduct = getProductDataFromHTML(response.data);

    console.log(rawProduct);
    let category = await Category.findOne({
      title: rawProduct?.category,
    });

    const product = new Product({
      active: true,
      discount: rawProduct?.dicount || 0,
      title: rawProduct?.title,
      description: rawProduct?.description,
      images: [
        {
          external: true,
          path: rawProduct?.image,
        },
      ],
      price: rawProduct?.mrp,
      specification: rawProduct?.specifications || {},
    });

    if (!category) {
      category = await new Category({
        title: rawProduct?.category,
      }).save();
    }

    product.category = category._id;

    product.save().then((p) => {
      apiResponse.status(201).json({ product: p });
    });
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
