import { getCart, addToCart, clearCart } from '../helpers/cart';
import { postData, getData } from '../helpers/api';
import { formatMoney } from '../helpers/money';
import { classes, debounce } from '../helpers/dom';

export type Helpers = {
  getCart: typeof getCart;
  addToCart: typeof addToCart;
  clearCart: typeof clearCart;
  postData: typeof postData;
  getData: typeof getData;
  formatMoney: typeof formatMoney;
  classes: typeof classes;
  debounce: typeof debounce;
};

// declare custom window property types

declare global {
  interface Window {
    Shopify: {
      shop: string;
      country: string;
      locale: string;
      currency: {
        active: string;
        rate: string;
      };
    };
    helpers: Helpers;
    product?: Product;
    freeShippingThreshold?: number;
    freeShippingSuccessMessage?: string;
  }
}

// add additional keys to types as needed

export type OptionsWithValues = {
  name: string;
  position: number;
  values: string[];
};

export type Variant = {
  available: boolean;
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  options: string[];
  price: number;
};

export type Image = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type FeaturedImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type Product = {
  title: string;
  available: boolean;
  variants: Variant[];
  options_with_values: OptionsWithValues[];
  handle: string;
  media: Image[];
  featured_image: FeaturedImage;
  description: TrustedHTML;
  url: string;
};

export type EventProduct = {
  details: Product;
  options_with_values: OptionsWithValues[];
  metafields: Metafields;
};

export type LineItem = {
  id: number;
  url: string;
  title: string;
  price: number;
  quantity: number;
  product_title: string;
  options_with_values: OptionsWithValues[];
  featured_image: {
    url: string;
  };
};

export type Cart = {
  item_count: number;
  items_subtotal_price: number;
  items: LineItem[];
};

export type Metafields = {
  [key: string]: string;
};

export type SearchResults = {
  resources: {
    results: {
      products: Product[];
    };
  };
};