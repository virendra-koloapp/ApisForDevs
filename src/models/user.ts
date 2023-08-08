import mongoose, { SchemaTypes } from "mongoose";
require("mongoose-type-email");
import { COLLECTION_NAMES } from "../constants";

const ADMIN_TYPE = "ADMIN";
const CUSTOMER_TYPE = "CUSTOMER";
const userTypeEnum = [ADMIN_TYPE, CUSTOMER_TYPE];

const userSchema = new mongoose.Schema(
  {
    email: {
      type: (SchemaTypes as any).Email,
      required: true,
      unique: true,
    },
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: userTypeEnum,
      default: CUSTOMER_TYPE,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model(COLLECTION_NAMES.USER, userSchema);
