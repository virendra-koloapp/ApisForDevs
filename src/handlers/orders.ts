import { Handler } from "express";
import { Order } from "../models/order";
import { AuthenticatedRequest } from "../types";
import Joi from "joi";
import { MAX_ORDER_QUANTITY } from "../constants";
import { ApiError } from "../errors/ApiError";
import { Product } from "../models/product";
import HTTP_CODES from "http-status-codes";
import mongoose from "mongoose";

(Joi as any).objectId = require("joi-objectid")(Joi);

const orderCreateBodyValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: (Joi as any).objectId().required(),
        quantity: Joi.number().min(1).max(MAX_ORDER_QUANTITY).required(),
      })
    )
    .min(1)
    .required(),
});

export const getOrdersHandler: Handler = async (_request, response) => {
  const request = _request as AuthenticatedRequest;

  Order.getOrders({ user: request.user.id }).then((orders) => {
    response.json(orders);
  });
};

export const getOrderByIdHandler: Handler = async (
  _request,
  response,
  next
) => {
  const request = _request as AuthenticatedRequest;
  const userId = request.user.id;
  const orderId = request.params.orderId as string;

  const order = await Order.getOrderById(orderId, userId);

  if (!order) {
    return next(
      new ApiError({
        message: "order not found",
      })
    );
  }

  response.json({
    order,
  });
};

export const createOrderHandler: Handler = async (_request, response, next) => {
  const request = _request as AuthenticatedRequest;

  const { value, error } = orderCreateBodyValidationSchema.validate(
    request.body
  );

  if (error) {
    return next(new ApiError(error.details));
  }

  const { items } = value;

  const itemsIds = items.map((item: any) => item.product);
  const products = await Product.find({
    _id: {
      $in: itemsIds,
    },
  }).select("price discount");

  products.forEach((product, index) => {
    items[index].price = product.price;
    items[index].discount = product.discount;
  });

  /**
   * @refactor : use aggregate function and then calculate the sum
   */

  const total = products
    .map((p: any) => p.sellPrice)
    .reduce((acc, price) => acc + price, 0);

  const order = await new Order({
    items,
    user: request.user.id,
    total,
  }).save();

  response.status(HTTP_CODES.CREATED).json({
    order,
  });
};
