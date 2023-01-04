const nodeListPrototype = {
  listen(event, callback) {
    this.forEach((node) => {
      node.addEventListener(event, callback);
    });
  },
};

export function select(selector) {
  let nodeList = document.querySelectorAll(selector);
  if (nodeList.length === 1) nodeList = nodeList[0];
  const extendedNodeList = Object.assign(nodeList, nodeListPrototype);
  return extendedNodeList;
}
