import { h } from 'preact';
import { FiPlusCircle } from '@react-icons/all-files/fi/FiPlusCircle';
import { FiMinusCircle } from '@react-icons/all-files/fi/FiMinusCircle';

type Props = {
  quantity: number;
  minimum?: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

export default function Quantity({
  quantity,
  minimum = 1,
  handleIncrement,
  handleDecrement,
}: Props) {
  return (
    <div className="c-qty">
      <button
        className="c-qty__button"
        onClick={handleDecrement}
        disabled={quantity <= minimum}
        type="button"
        aria-label="Decrease quantity"
      >
        <FiMinusCircle size="1.6em" />
      </button>
      <span className="c-qty__value">{quantity}</span>
      <button
        className="c-qty__button"
        onClick={handleIncrement}
        type="button"
        aria-label="Increase quantity"
      >
        <FiPlusCircle size="1.6em" />
      </button>
    </div>
  );
}
