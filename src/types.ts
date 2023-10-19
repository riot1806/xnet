export type Banner = {
  _id: string;
  image: string;
  isCatalogBanner: boolean;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
  products: [];
  sub_categories: [];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  old_price: number;
  category: {};
  sub_categories: Category[];
};

export type Cart = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: {};
  quantity: number;
};
