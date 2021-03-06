function render(vnode, container) {
  console.log(vnode);
  // step1 vnode -> node 虚拟dom节点生成真实dom节点
  const node = createNode(vnode);

  // step2
  container.appendChild(node);
}

function isStringorNumber(sth) {
  return typeof sth === 'string' || typeof sth === 'number';
}

function createNode(vnode) {
  let node;
  const { type } = vnode;

  // 原生标签节点 如：div、h1
  if (typeof type === 'string') {
    node = updateHostComponent(vnode);
  } else if(isStringorNumber(vnode)) { //文本节点
    node = updateTextComponent(vnode);
  }
  return node;
}

function updateHostComponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  reconcileChildren(node, props.children);
  return node;
}

function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 处理children
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // vnode -> node，再把node插入到parentNode
    render(child, parentNode);
  }
}

export default { render };