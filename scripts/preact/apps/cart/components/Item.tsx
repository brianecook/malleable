import { h } from 'preact';
import { MdClose } from '@react-icons/all-files/md/MdClose';
import Quantity from '../../../components/Quantity';
import { LineItem } from '../../../types';

const { formatMoney } = window.helpers;

type Props = {
  item: LineItem;
  handleInc: () => void;
  handleDec: () => void;
  handleRemove: () => void;
};

export default function Item({
  item,
  handleInc,
  handleDec,
  handleRemove,
}: Props) {
  return (
    <div className="c-item">
      <div className="u-noLineHeight">
        <a href={item.url}>
          <img src={item.featured_image.url} alt={item.product_title} />
        </a>
      </div>
      <div className="c-item__details">
        <p>{item.title}</p>
        <p>{formatMoney(item.price)}</p>
        <div className="c-item__bottom">
          <div className="c-item__actions">
            <Quantity
              minimum={0}
              quantity={item.quantity}
              handleIncrement={handleInc}
              handleDecrement={handleDec}
            />
          </div>
          <button
            onClick={handleRemove}
            aria-label="Remove item from cart"
            type="button"
          >
            <MdClose size="1em" />
          </button>
        </div>
      </div>
    </div>
  );
}
