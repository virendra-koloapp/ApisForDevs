import { Handler } from "express";
import { User } from "../models/user";

export const getAllUsersHandler: Handler = (request, response) => {
  User.find().then((users) => {
    response.json({ users });
  });
};
