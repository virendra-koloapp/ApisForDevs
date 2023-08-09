import { Handler } from "express";
import Joi from "joi";
import passwordHash from "password-hash";
import { ApiError } from "../errors/ApiError";
import { User } from "../models/user";
import { createUserToken } from "../utils/jwt";

export const loginHandler: Handler = (request, response) => {
  response.json(loginHandler.name);
};

export const registerHandler: Handler = async (request, response, next) => {
  const validationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
  });

  const { value, error } = validationSchema.validate(request.body);

  if (error) {
    return next(new ApiError(error.details));
  }

  try {
    const user = await new User({
      ...value,
      password: passwordHash.generate(value.password),
    }).save();

    response.json({
      message: "User created",
      access_token: createUserToken({
        id: user.id,
        type: user.type,
      }),
    });
  } catch (error: any) {
    return next(
      new ApiError({
        message: error.message,
        meta: error,
      })
    );
  }
};
