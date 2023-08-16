import { JSDOM } from "jsdom";
const CLASSES = {
  MRP: "._3I9_wc",
  SELL_PRICE: "._30jeq3",
  TITLE: ".B_NuCI",
  SPECIFICATION_KEY: "._1hKmbr",
  SPECIFICATION_VALUE: "._21lJbe",
  IMAGE: "._1BweB8 img",
  DISCOUNT: "._3Ay6Sb._31Dcoz",
  CATEGORY: "._3GIHBu:nth-child(2) a",
  DESCRIPTION: "._1mXcCf.RmoJUa",
};

export const getProductDataFromHTML = (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  if (!document) return null;

  const getImageUrl = (query = "") => {
    return (document?.querySelector(query) as HTMLImageElement).src;
  };

  const getValue = ({ query = "", isNumber = false, multiple = false }) => {
    if (!multiple && document) {
      const value = document.querySelector(query)?.textContent || "";
      if (isNumber) {
        return +value?.replace?.(/[^0-9]/g, "");
      }
      return value;
    }

    const nodes = Array.from(document.querySelectorAll(query));

    const values: any[] = [];
    nodes.forEach((node: any) => {
      if (isNumber) {
        values.push(+node.textContent);
      }
      values.push(node.textContent);
    });

    return values;
  };

  const mrp = getValue({
    query: CLASSES.MRP,
    isNumber: true,
  });
  const sellPrice = getValue({
    query: CLASSES.SELL_PRICE,
    isNumber: true,
  });
  const title = getValue({ query: CLASSES.TITLE });
  const discount = getValue({ query: CLASSES.DISCOUNT, isNumber: true });

  const specKeys = getValue({
    query: CLASSES.SPECIFICATION_KEY,
    multiple: true,
  }) as string[];
  const specValues = getValue({
    query: CLASSES.SPECIFICATION_VALUE,
    multiple: true,
  }) as string[];
  const image = getImageUrl(CLASSES.IMAGE);

  const specifications = specKeys.reduce(
    (acc: Record<any, any>, item: string, index: number) => {
      acc[item] = specValues[index];

      return acc;
    },
    {}
  );
  const category = getValue({
    query: CLASSES.CATEGORY,
  });
  const description = getValue({
    query: CLASSES.DESCRIPTION,
  });

  return {
    mrp,
    sellPrice,
    title,
    specifications,
    image,
    discount,
    description: description || title,
    category,
  };
};
