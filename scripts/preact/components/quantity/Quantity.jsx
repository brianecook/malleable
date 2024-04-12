import { h } from 'preact';

export default function Quantity({
  quantity,
  minimum,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <div className="c-quantity">
      <button
        className="c-quantity__button"
        onClick={handleDecrement}
        disabled={quantity <= minimum}
        type="button"
      >
        -
      </button>
      <span className="c-quantity__value">{quantity}</span>
      <button
        className="c-quantity__button"
        onClick={handleIncrement}
        type="button"
      >
        +
      </button>
    </div>
  );
}
