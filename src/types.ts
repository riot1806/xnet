export type Banner = {
  id: string;
  image: string;
  isCatalogBanner: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: string;
  products: [];
  sub_categories: [];
  parent_category:null | number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  old_price: number;
  category: {};
  sub_categories: Category[];
};

export type Cart = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: {};
  quantity: number;
};
