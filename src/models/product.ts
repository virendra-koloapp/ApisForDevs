import mongoose from "mongoose";
import { COLLECTION_NAMES } from "../constants";
import { Category } from "./category";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        path: {
          type: String,
          required: true,
        },
        external: {
          type: Boolean,
          required: true,
        },
      },
    ],
    required: true,
  },
  specification: {
    type: Object,
    required: true,
  },
});

export const Product = mongoose.model(COLLECTION_NAMES.PRODUCT, productSchema);
