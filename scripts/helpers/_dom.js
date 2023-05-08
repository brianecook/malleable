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
  listen(event, callback) {
    const callbackWithNode = (node) => () =>
      callback(Object.assign(node, nodeListPrototype));

    this.execute((node) =>
      node.addEventListener(event, callbackWithNode(node))
    );
  },
  modifyClass(method, className) {
    this.execute((node) => node.classList[method](className));
  },
  attribute(method, attributeName, value) {
    this.execute((node) => node.setAttribute(attributeName, value));
  },
};

export function select(selector, parent = document) {
  const object =
    typeof selector === 'string' ? parent.querySelectorAll(selector) : selector;
  const selectObject = object && object.length === 1 ? object[0] : object;
  const extendedObject = Object.assign(selectObject, nodeListPrototype);
  return extendedObject;
}
