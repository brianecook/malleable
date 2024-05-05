import { h } from 'preact';
import { classes } from '../../helpers';

type Props = {
  selected: boolean;
  disabled: boolean;
  label: string;
  handleClick: () => void;
  backgroundUrl: string;
};

export default function Swatch({
  selected,
  disabled,
  label,
  handleClick,
  backgroundUrl,
}: Props) {
  return (
    <button
      {...classes('c-swatch', {
        'c-swatch--selected': selected,
      })}
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    />
  );
}
