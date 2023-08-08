import { Handler } from "express";

export const mockHandler: Handler = (req, res) => {
  res.json({
    date: new Date(),
    url: req.url,
    query: req.query,
    body: req.body,
    params: req.params,
  });
};
