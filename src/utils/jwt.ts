import jsonwebtoken from "jsonwebtoken";
import { APP_CONFIG } from "../constants";

export const createUserToken = (payload: any) => {
  return jsonwebtoken.sign(payload, APP_CONFIG.JWT_SECRET);
};
