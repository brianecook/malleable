export const debounce = <T extends any[]>(
  callback: (...args: T) => void,
  wait: number
) => {
  let timeoutId: number | undefined;
  return (...args: T) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
