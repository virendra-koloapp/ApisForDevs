import mongoose, { SchemaTypes } from "mongoose";
import { COLLECTION_NAMES } from "../constants";
import { categories } from "../data/categories";
import { logger } from "../utils/logger";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model(
  COLLECTION_NAMES.CATEGORY,
  categorySchema
);
