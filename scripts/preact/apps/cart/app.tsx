import { h, render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import select from 'selectricity';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import Item from './components/Item';
import { Cart as CartType } from '../../../types';
import useModal from '../../hooks/useModal';
import Progress from '../../components/Progress';

function Cart() {
  const { open, setOpen, openListener } = useModal();
  const [cart, setCart] = useState<CartType | null>(null);

  const { getCart, postData, formatMoney } = window.helpers;

  const freeShippingThreshold: number | null =
    window.freeShippingThreshold || null;

  const firstUpdate = useRef(true);

  useEffect(() => {
    openListener('cartToggled');

    document.addEventListener('cartUpdated', async () => {
      const updatedCart = await getCart();
      setCart(updatedCart);
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        const currentCart = await getCart();
        setCart(currentCart);
      } else {
        select('[data-cart-count]').textContent =
          cart?.item_count.toString() || '0';
      }
    };

    fetchCart();
  }, [cart]);

  const handleChangeQuantity = async (line: number, quantity: number) => {
    const response = (await postData('/cart/change.js', {
      line,
      quantity,
    })) as CartType;
    setCart(response);
  };

  const itemsSubtotalPrice = cart?.items_subtotal_price || 0;
  const subtotal = formatMoney(itemsSubtotalPrice);
  const freeShippingThresholdValue = freeShippingThreshold || 0;

  const amountToFreeShipping = freeShippingThresholdValue - itemsSubtotalPrice;
  const percentToFreeShipping =
    (itemsSubtotalPrice / freeShippingThresholdValue) * 100;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close cart"
          className="c-overlay"
          onClick={() => setOpen(false)}
        />
      )}
      <div className={`c-cart ${open ? 'c-cart--open' : ''}`}>
        <div className="c-cart__inner">
          <div className="c-cart__header">
            <div>
              <strong>Your Cart</strong> ({cart?.item_count}{' '}
              {cart?.item_count === 1 ? 'item' : 'items'})
            </div>
            <button
              aria-label="Close cart"
              className="c-cart__close"
              onClick={() => setOpen(false)}
              type="button"
            >
              <MdClose size="1.6em" />
            </button>
          </div>
          <div className="c-cart__items">
            {cart?.items?.map((item, index) => {
              const index1 = index + 1;
              return (
                <Item
                  key={item.id}
                  item={item}
                  handleInc={() =>
                    handleChangeQuantity(index1, item.quantity + 1)
                  }
                  handleDec={() =>
                    handleChangeQuantity(index1, item.quantity - 1)
                  }
                  handleRemove={() => handleChangeQuantity(index1, 0)}
                />
              );
            })}
          </div>
        </div>
        <div className="c-cart__bottom">
          {freeShippingThreshold && (
            <div className="c-cart__message u-textCenter">
              {amountToFreeShipping > 0 ? (
                <>
                  Spend {formatMoney(amountToFreeShipping)} more for free
                  shipping
                  <div className="c-cart__progress">
                    <Progress percentComplete={percentToFreeShipping} />
                  </div>
                </>
              ) : (
                window.freeShippingSuccessMessage
              )}
            </div>
          )}
          <p className="c-cart__subtotal">Total: {subtotal}</p>
          <a className="c-cart__cta c-btn" href="/checkout">
            Checkout
          </a>
        </div>
      </div>
    </>
  );
}

const $cart = document.querySelector('#app-cart');

if ($cart) {
  render(<Cart />, $cart);
}
