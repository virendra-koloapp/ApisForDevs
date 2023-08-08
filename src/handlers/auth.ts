import { Handler } from "express";

export const loginHandler: Handler = (request, response) => {
  response.json(loginHandler.name);
};

export const registerHandler: Handler = (request, response) => {
  response.json(registerHandler.name);
};
