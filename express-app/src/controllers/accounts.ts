import { Handler } from "express";

import { object, string } from "yup";
import { User } from "../db/User.js";

export const loginHandler: Handler = (request, response) => {
  const schema = object({
    email: string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    password: string().required().min(2),
  });

  return schema
    .validate(request.body, {
      abortEarly: false,
    })
    .then((value) => {
      return new User(value).login();
    })
    .then((payload) => {
      response.json(payload);
    })
    .catch((error) => {̦
      return response.status(400).json({
        message: error.message,
        ...error,
      });
    });
};
export const registerHandler: Handler = (request, response) => {
  const schema = object({
    email: string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .required(),
    firstName: string().required().min(2),
    lastName: string().required().min(2),
    password: string().required().min(2),
  });

  return schema
    .validate(request.body, {
      abortEarly: false,
    })
    .then((value) => {
      return User.createUser(value);
    })
    .then((user) => {
      response.json({ user });
    })
    .catch((error) => {
      return response.status(400).json({
        message: error.message,
        ...error,
      });
    });
};
