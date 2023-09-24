import { Handler } from "express";
import { User } from "../db/User.js";
import { appConfig } from "../config/index.js";

export const getAllUserHandler: Handler = ({ query }, response) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || appConfig.pageSize;
  const search = query.search as string;

  User.getAllUsers(page, limit, search).then((users: any) => {
    response.json({ users });
  });
};
