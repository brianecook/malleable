import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Btn from '../Btn';

describe('Btn', () => {
  test('renders correctly', () => {
    render(<Btn handleClick={() => {}}>Hello World</Btn>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('calls handleClick on click', () => {
    const handleClick = jest.fn();
    render(<Btn handleClick={handleClick}>Hello World</Btn>);
    fireEvent.click(screen.getByText('Hello World'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('is disabled when adding is true', () => {
    render(
      <Btn handleClick={() => {}} adding>
        Hello World
      </Btn>
    );
    expect(screen.getByText('Hello World')).toBeDisabled();
  });

  test('applies correct classes when adding is true', () => {
    render(
      <Btn handleClick={() => {}} adding>
        Hello World
      </Btn>
    );
    expect(screen.getByText('Hello World')).toHaveClass(
      'c-btn',
      'c-btn--adding'
    );
  });

  test('renders children correctly', () => {
    render(<Btn handleClick={() => {}}>Hello World</Btn>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('button is disabled when disabled prop is true', () => {
    render(
      <Btn handleClick={() => {}} disabled>
        Hello World
      </Btn>
    );
    expect(screen.getByText('Hello World')).toBeDisabled();
  });

  test('button has correct type when type prop is set', () => {
    render(
      <Btn handleClick={() => {}} type="submit">
        Hello World
      </Btn>
    );
    expect(screen.getByText('Hello World')).toHaveAttribute('type', 'submit');
  });
});
