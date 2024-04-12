import { h } from 'preact';
import Quantity from '../../../components/quantity/Quantity.jsx';

const { formatMoney } = window;

export default function Item({ item, handleInc, handleDec, handleRemove }) {
  return (
    <div className="c-item">
      <div className="u-noLineHeight">
        <a href={item.url}>
          <img src={item.featured_image.url} />
        </a>
      </div>
      <div className="c-item__details">
        <p>{item.title}</p>
        <p>{formatMoney(item.price)}</p>
        <div className="c-item__bottom">
          <div className="c-item__actions">
            <Quantity
              miniumum={0}
              quantity={item.quantity}
              handleIncrement={handleInc}
              handleDecrement={handleDec}
            />
          </div>
          <button onClick={handleRemove}>X</button>
        </div>
      </div>
    </div>
  );
}
