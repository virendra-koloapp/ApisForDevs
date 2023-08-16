import axios from "axios";
import { Handler } from "express";
import { JSDOM } from "jsdom";
import { ApiError } from "../errors/ApiError";
import { Category } from "../models/category";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";
import { getProductDataFromHTML } from "../utils/flipkart";
import { getHTML } from "../utils/http";

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
  try {
    const response = await axios.get(request.body.url);
    const html = response.data;

    const rawProduct = getProductDataFromHTML(html);

    let category = await Category.findOne({
      title: rawProduct?.category,
    });

    const product = new Product({
      active: true,
      discount: rawProduct?.discount || 0,
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

    const newProduct = await product.save();
    apiResponse.status(201).json({ product: newProduct });
  } catch (error) {
    return next(
      new ApiError({
        message: `couldn't import product`,
        error,
      })
    );
  }
};

export const listUrlsOfAPageHandler: Handler = async (
  request,
  apiResponse,
  next
) => {
  if (!request.body.url) {
    apiResponse.status(400);
    return next(
      new ApiError({
        message: "url is required",
      })
    );
  }

  try {
    const url = request.body.url;
    const html = await getHTML(url);
    const dom = new JSDOM(html);
    const anchors = Array.from(dom.window.document.querySelectorAll("a"));

    const urlObj = new URL(url);
    const host = urlObj.host;
    const protocol = urlObj.protocol;

    let links: string[] = [];

    if (host.includes("flipkart")) {
      links = links.concat(
        anchors
          .map((anchor) => anchor.href)
          .filter((url) => url.includes("pid"))
          .map((url) => {
            try {
              new URL(url);
            } catch (error) {
              return `${protocol}//${host}${url}`;
            }
          }) as string[]
      );
    }

    apiResponse.json({ links });
  } catch (error) {
    return next(
      new ApiError({
        message: `couldn't import links`,
        error,
      })
    );
  }
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
