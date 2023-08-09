import { faker } from "@faker-js/faker";
import { Category } from "../models/category";

export const generateProducts = (count: number) =>
  Category.find()
    .then((categories) => categories.map((c) => c.id))
    .then((categoryIds) => {
      return new Array(count).fill(0).map(() => {
        const product = {
          _id: faker.database.mongodbObjectId(),
          title: faker.commerce.productName(),
          price: faker.datatype.number({ min: 50000, max: 300000 }),
          discount: faker.datatype.number({ min: 0, max: 50 }),
          category: faker.helpers.arrayElement(categoryIds),
          active: true,
          description: faker.commerce.productDescription(),
          images: [
            {
              path: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/V/6V2W1PA-1_T1680320748.png",
              external: true,
              _id: faker.database.mongodbObjectId(),
            },
            {
              path: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/V/6V2W1PA-1_T1680320748.png",
              external: true,
              _id: faker.database.mongodbObjectId(),
            },
          ],
          specification: {
            color: faker.color.human(),
            length: faker.datatype.number({ min: 10, max: 50 }),
            height: faker.datatype.number({ min: 5, max: 30 }),
            model: faker.lorem.word(),
          },
          __v: 0,
        };

        // Add random specifications
        for (let j = 0; j < 10; j++) {
          const key = faker.random.word();
          const value = faker.random.words();
          (product as any).specification[key] = value;
        }

        return product;
      });
    });
