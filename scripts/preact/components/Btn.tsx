import { h } from 'preact';
import { ImSpinner8 } from '@react-icons/all-files/im/ImSpinner8';

type Props = {
  adding?: boolean;
  type?: 'button' | 'submit' | 'reset';
  handleClick: () => void;
  children: string;
  disabled?: boolean;
};

export default function Btn({
  adding = false,
  type = 'button',
  handleClick,
  children,
  disabled,
}: Props) {
  const { classes } = window.helpers;
  return (
    <button
      {...classes('c-btn', {
        'c-btn--adding': adding,
      })}
      type={type} // eslint-disable-line
      onClick={handleClick}
      disabled={adding || disabled}
    >
      {children}
      <div className="c-btn__overlay">
        <ImSpinner8 size="1.3em" color="#fff" />
      </div>
    </button>
  );
}
