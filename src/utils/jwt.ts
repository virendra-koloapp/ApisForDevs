import jsonwebtoken from "jsonwebtoken";
import { APP_CONFIG } from "../constants";

import { IncomingHttpHeaders } from "http";

export const createUserToken = (payload: any) => {
  return jsonwebtoken.sign(payload, APP_CONFIG.JWT_SECRET);
};

export const getPayloadFromToken = (token: string): any => {
  try {
    return jsonwebtoken.verify(token, APP_CONFIG.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
  const token = headers?.authorization?.split(" ")?.[1];
  return token;
};
