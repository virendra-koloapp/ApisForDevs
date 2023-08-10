import mongoose, { SchemaTypes } from "mongoose";
import { COLLECTION_NAMES } from "../constants";
import { User } from "./user";
import { Product } from "./product";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: SchemaTypes.ObjectId,
    ref: Product,
    required: true,
  },
  quantity: {
    type: SchemaTypes.Number,
    required: true,
  },
  price: {
    type: SchemaTypes.Number,
    required: true,
  },
  discount: {
    type: SchemaTypes.Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: User,
    },
    total: {
      type: SchemaTypes.Number,
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    statics: {
      getOrders(args: TOrderParams) {
        return this.find({
          ...(args.user ? { user: args.user } : {}),
        }).populate("items.product");
      },
    },
  }
);

export const Order = mongoose.model(COLLECTION_NAMES.ORDER, orderSchema);

type TOrderParams = {
  user: string;
};
