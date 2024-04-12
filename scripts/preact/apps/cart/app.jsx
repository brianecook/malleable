import { Fragment, h, render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import select from 'selectricity';
import Item from './components/Item.jsx';

const { getData, getCart, postData, formatMoney } = window;

function Cart() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});

  const firstUpdate = useRef(true);

  useEffect(() => {
    document.addEventListener('cartToggled', () => {
      setOpen(!open);
    });

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
        const currentCart = await getData('/cart.js');
        setCart(currentCart);
      } else {
        select('[data-cart-count]').textContent = cart.item_count;
      }
    };

    fetchCart();
  }, [cart]);

  const handleChangeQuantity = async (line, quantity) => {
    const response = await postData('/cart/change.js', {
      line,
      quantity,
    });
    setCart(response);
  };

  const subtotal = formatMoney(cart.items_subtotal_price);

  return (
    <Fragment>
      {open && <div className="c-overlay" onClick={() => setOpen(false)} />}
      <div className={`c-cart ${open ? 'c-cart--open' : ''}`}>
        <div className="c-cart__inner">
          <div className="c-cart__header">
            <div>
              <strong>Your Cart</strong> ({cart.item_count}{' '}
              {cart.item_count === 1 ? 'item' : 'items'})
            </div>
            <button
              className="c-cart__close"
              onClick={() => setOpen(false)}
              type="button"
            >
              X
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
          <p className="c-cart__subtotal">Total: {subtotal}</p>
          <a className="c-cart__cta c-btn" href="/checkout">
            Checkout
          </a>
        </div>
      </div>
    </Fragment>
  );
}

render(<Cart />, document.querySelector('#app-cart'));
