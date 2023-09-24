import { mkdir } from "fs";
import { join } from "path";
import { cwd } from "process";
import { JsonDB, Config } from "node-json-db";

const currentWorkingDirectory = cwd();
const DB_FOLDER_NAME = "DATABASE";
const DB_FOLDER_PATH = join(currentWorkingDirectory, DB_FOLDER_NAME);

const UsersDB = new JsonDB(
  new Config(join(DB_FOLDER_PATH, "USERS"), true, false, "/")
);
const ProductsDB = new JsonDB(
  new Config(join(DB_FOLDER_PATH, "PRODUCTS"), true, false, "/")
);
const CategoriesDB = new JsonDB(
  new Config(join(DB_FOLDER_PATH, "CATEGORIES"), true, false, "/")
);
const OrdersDB = new JsonDB(
  new Config(join(DB_FOLDER_PATH, "ORDERS"), true, false, "/")
);

function setupDBFolder() {
  mkdir(DB_FOLDER_PATH, () => {});
}

export {
  setupDBFolder,
  DB_FOLDER_PATH,
  ProductsDB,
  UsersDB,
  OrdersDB,
  CategoriesDB,
};
