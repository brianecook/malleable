type ClassList = {
  [key: string]: boolean;
};

export function classes(baseClasses: string, modifiers: ClassList) {
  const keys = Object.keys(modifiers);
  const updatedClasses = keys.filter((key) => modifiers[key]);
  return {
    className: `${baseClasses} ${updatedClasses.join(' ')}`,
  };
}

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
