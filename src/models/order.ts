import mongoose, { SchemaTypes } from "mongoose";
import {
  COLLECTION_NAMES,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_CREATED,
} from "../constants";
import { User } from "./user";
import { Product } from "./product";

const orderStatusCodeToString: Record<number, string> = {
  [ORDER_STATUS_CREATED]: "CREATED",
  [ORDER_STATUS_CONFIRMED]: "CONFIRMED",
  [ORDER_STATUS_COMPLETED]: "COMPLETED",
};

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
    status: {
      type: Number,
      enum: [
        ORDER_STATUS_CREATED,
        ORDER_STATUS_CONFIRMED,
        ORDER_STATUS_COMPLETED,
      ],
      default: ORDER_STATUS_CREATED,
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },

    virtuals: {
      orderStatus: {
        get() {
          return orderStatusCodeToString[this.status];
        },
      },
    },
    statics: {
      getOrders(args?: TOrderParams) {
        const filter = {
          ...(args?.user ? { user: args.user } : {}),
          ...(!isNaN(args?.status as number) ? { status: args?.status } : {}),
        };

        console.log({ args: args, filter });

        return this.find(filter).populate("items.product");
      },
    },
  }
);

export const Order = mongoose.model(COLLECTION_NAMES.ORDER, orderSchema);

type TOrderParams = Partial<{
  user: string;
  status: number;
}>;
