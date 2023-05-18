const nodeListPrototype = {
  execute(fn) {
    if (this instanceof Element || this instanceof HTMLDocument) {
      fn(this);
    } else {
      this.forEach((node) => {
        fn(node);
      });
    }
  },
  listen(eventName, callback) {
    const callbackWithNode = (node) => (e) =>
      callback(Object.assign(node, nodeListPrototype), e);

    this.execute((node) =>
      node.addEventListener(eventName, (e) => callbackWithNode(node)(e))
    );
  },
  modifyClass(method, className) {
    this.execute((node) => node.classList[method](className));
  },
  attribute(method, attributeName, value = '') {
    const action = `${method}Attribute`;
    this.execute((node) => node[action](attributeName, value));
  },
};

export function select(selector, parent = document) {
  const improperSelectorPassed =
    typeof selector === 'string' && selector.indexOf('[') !== 0;
  const object =
    typeof selector === 'string' ? parent.querySelectorAll(selector) : selector;
  const selectObject = object && object.length === 1 ? object[0] : object;
  const extendedObject = Object.assign(selectObject, nodeListPrototype);

  if (improperSelectorPassed) {
    console.warn(
      'Improper selector value passed. Please use data attribute as selector.'
    );
  }
  return extendedObject;
}
