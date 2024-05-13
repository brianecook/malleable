import { render, fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';

import Quantity from '../Quantity';

describe('Qty', () => {
  test('renders correctly', () => {
    render(
      <Quantity
        quantity={1}
        handleIncrement={() => {}}
        handleDecrement={() => {}}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('calls handleDecrement when the decrement button is clicked and is above minimum', () => {
    const handleDecrement = jest.fn();
    render(
      <Quantity
        quantity={2}
        handleDecrement={handleDecrement}
        handleIncrement={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Decrease quantity/i }));
    expect(handleDecrement).toHaveBeenCalled();
  });

  test('does not call handleDecrement when the decrement button is clicked and is at the minimum', () => {
    const handleDecrement = jest.fn();
    render(
      <Quantity
        quantity={1}
        handleDecrement={handleDecrement}
        handleIncrement={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Decrease quantity/i }));
    expect(handleDecrement).not.toHaveBeenCalled();
  });

  test('decrement button is disabled when the quantity is at the minimum', () => {
    render(
      <Quantity
        quantity={1}
        handleDecrement={() => {}}
        handleIncrement={() => {}}
      />
    );
    expect(
      screen.getByRole('button', { name: /Decrease quantity/i })
    ).toBeDisabled();
  });

  test('does not call handleDecrement when the decrement button is clicked and quantity is the default minimum', () => {
    const handleDecrement = jest.fn();
    render(
      <Quantity
        quantity={1}
        handleDecrement={handleDecrement}
        handleIncrement={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Decrease quantity/i }));
    expect(handleDecrement).not.toHaveBeenCalled();
  });

  test('does not call handleDecrement when the decrement button is clicked and quantity is at the explicit minimum', () => {
    const handleDecrement = jest.fn();
    render(
      <Quantity
        quantity={2}
        minimum={2}
        handleDecrement={handleDecrement}
        handleIncrement={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Decrease quantity/i }));
    expect(handleDecrement).not.toHaveBeenCalled();
  });

  test('calls handleIncrement when the increment button is clicked', () => {
    const handleIncrement = jest.fn();
    render(
      <Quantity
        quantity={1}
        handleDecrement={() => {}}
        handleIncrement={handleIncrement}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Increase quantity/i }));
    expect(handleIncrement).toHaveBeenCalled();
  });

  test('text of updated quantity is displayed when increment button is clicked', () => {
    const Component = () => {
      const [quantity, setQuantity] = useState<number>(1);
      return (
        <Quantity
          quantity={quantity}
          handleDecrement={() => setQuantity(quantity - 1)}
          handleIncrement={() => setQuantity(quantity + 1)}
        />
      );
    };
    render(<Component />);
    fireEvent.click(screen.getByRole('button', { name: /Increase quantity/i }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
