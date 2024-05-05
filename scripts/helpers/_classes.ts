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
