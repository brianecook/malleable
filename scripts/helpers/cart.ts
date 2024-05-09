import { Cart } from '../preact/types';
import { getData, postData } from './api';

function informCartUpdated(response?: object) {
  const event = new CustomEvent('cartUpdated', {
    detail: {
      currentCart: response,
    },
  });

  document.dispatchEvent(event);
}

export async function getCart(): Promise<Cart> {
  const response = (await getData('/cart.js')) as Cart;
  return response;
}

export async function addToCart(id: number | string, quantity = 1) {
  const response = await postData('/cart/add.js', {
    items: [
      {
        id,
        quantity,
      },
    ],
  });
  informCartUpdated();
  return response;
}

export async function updateCart(id: number, quantity: number) {
  const response = await postData('/cart/change.js', {
    id,
    quantity,
  });
  informCartUpdated();
  return response;
}

export async function clearCart() {
  const response = await postData('/cart/clear.js');
  informCartUpdated();
  return response;
}
