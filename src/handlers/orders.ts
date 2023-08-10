import { Handler } from "express";
import { Order } from "../models/order";
import { AuthenticatedRequest } from "../types";

export const getOrdersHandler: Handler = async (_request, response) => {
  const request = _request as AuthenticatedRequest;

  Order.getOrders({ user: request.user.id }).then((orders) => {
    response.json(orders);
  });
};
