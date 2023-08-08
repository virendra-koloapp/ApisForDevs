import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "logs/all-logs.log",
    }),
    new winston.transports.File({
      filename: "logs/error-logs.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/info-logs.log",
      level: "info",
    }),
    new winston.transports.Console(),
  ],
});
