import { h } from 'preact';

type Props = {
  percentComplete: number;
};

export default function Progress({ percentComplete }: Props) {
  return (
    <div className="c-progress">
      <div
        className="c-progress__progress"
        style={{ width: `${percentComplete}%` }}
      />
    </div>
  );
}
