import { useState, useEffect } from 'preact/hooks';
import select from 'selectricity';

export default function useModal() {
  const [open, setOpen] = useState<boolean>(false);

  const $body = select('body');

  useEffect(() => {
    if (open) $body.addClass('u-noScroll');
    else $body.removeClass('u-noScroll');
  }, [open]);

  function openListener(event: string) {
    document.addEventListener(event, () => {
      setOpen(!open);
    });
  }

  return {
    open,
    setOpen,
    openListener,
  };
}
