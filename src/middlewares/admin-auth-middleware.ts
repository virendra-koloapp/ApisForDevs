import { Handler } from "express";
import { ApiError } from "../errors/ApiError";
import { getPayloadFromToken, getTokenFromHeaders } from "../utils/jwt";
import { USER_TYPES } from "../constants";
import { set } from "lodash";

export const adminAuthMiddleware: Handler = (request, response, next) => {
  try {
    const token = getTokenFromHeaders(request.headers);

    const sendError = () => {
      response.status(401);
      return next(new ApiError());
    };

    if (!token) {
      return sendError();
    }

    const payload = getPayloadFromToken(token);

    if (!payload) {
      return sendError();
    }

    if (payload.type == USER_TYPES.USER_TYPE_ADMIN) {
      set(request, "user.id", payload.id);
      return next();
    }

    return sendError();
  } catch (error: any) {
    response.json(error.message);
  }
};
