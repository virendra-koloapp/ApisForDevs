import mongoose, { SchemaTypes } from "mongoose";
import { COLLECTION_NAMES, USER_TYPES } from "../constants";
require("mongoose-type-email");

const { USER_TYPE_ADMIN, USER_TYPE_CUSTOMER } = USER_TYPES;
const userTypeEnum = [USER_TYPE_ADMIN, USER_TYPE_CUSTOMER];

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
      default: USER_TYPE_CUSTOMER,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
    statics: {
      getUserByEmail(email: string) {
        return this.findOne({
          email,
        });
      },
    },
  }
);

export const User = mongoose.model(COLLECTION_NAMES.USER, userSchema);
