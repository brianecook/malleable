import { h } from 'preact';
import { ImSpinner8 } from '@react-icons/all-files/im/ImSpinner8';
import { classes } from '../../helpers';

type Props = {
  adding: boolean;
  handleClick: () => void;
  children: string;
};

export default function Btn({ adding, handleClick, children }: Props) {
  return (
    <button
      {...classes('c-btn', {
        'c-btn--adding': adding,
      })}
      type="button"
      onClick={handleClick}
      disabled={adding}
    >
      {children}
      <div className="c-btn__overlay">
        <ImSpinner8 size="1.3em" color="#fff" />
      </div>
    </button>
  );
}
