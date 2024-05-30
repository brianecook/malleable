import { StorefrontApiClient } from '@shopify/storefront-api-client';
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
    client: StorefrontApiClient;
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

// export type Variant = {
//   available: boolean;
//   id: number;
//   title: string;
//   option1: string | null;
//   option2: string | null;
//   option3: string | null;
//   options: string[];
//   price: number;
// };

// export type Image = {
//   src: string;
//   width: number;
//   height: number;
//   alt: string;
// };

export type FeaturedImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type Variant = {
  title: string;
  availableForSale: boolean;
  id: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: [
    {
      name: string;
      value: string;
    }
  ];
};

export type Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  altText: string | undefined;
};

export type Option = {
  name: string;
  values: string[];
};

export type Product = {
  availableForSale: boolean;
  id: string;
  title: string;
  handle: string;
  url: string;
  descriptionHtml: TrustedHTML;
  featured_image: FeaturedImage;
  variants: {
    nodes: [Variant];
  };
  images: {
    nodes: [Image];
  };
  options: [Option];
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
