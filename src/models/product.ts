import mongoose from "mongoose";
import { COLLECTION_NAMES } from "../constants";
import { Category } from "./category";
import _ from "lodash";

const schemaProps = {
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
};

const productSchema = new mongoose.Schema(schemaProps, {
  toJSON: {
    virtuals: true,
  },
  virtuals: {
    sellPrice: {
      get: function () {
        const price: number = this.price;
        const discount: number = this.discount;

        if (!discount) {
          return price;
        }

        return price - price * discount * 0.01;
      },
    },
    id: {
      get() {
        return this._id;
      },
    },
  },
  statics: {
    getProducts(params = Object()) {
      const query = params?.query || Object();
      const { category, limit = 10, page = 1, search } = query;

      const skip = (page - 1) * limit;

      const filter = {
        ...(category ? { category } : {}),
        ...(search
          ? {
              $or: [
                {
                  title: {
                    $regex: search,
                    $options: "i",
                  },
                },
                {
                  description: {
                    $regex: search,
                    $options: "i",
                  },
                },
              ],
            }
          : {}),
      };
      return this.find(filter).populate("category").limit(limit).skip(skip);
    },
  },
});

export const Product = mongoose.model(COLLECTION_NAMES.PRODUCT, productSchema);
