import { Handler } from "express";
import { set } from "lodash";
import { ApiError } from "../errors/ApiError";
import { getPayloadFromToken, getTokenFromHeaders } from "../utils/jwt";

export const userAuthMiddleware: Handler = (request, response, next) => {
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

  set(request, "user.id", payload.id);
  return next();
};
