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
  } else if (typeof type === 'function') {
    node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
  }
  return node;
}

// 处理属性
function updateNode(node, nextVal) {
  Object.keys(nextVal).filter(key => key !== 'children').forEach(k => node[k] = nextVal[k])
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

// 处理函数组件
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const fnnode = type(props);
  // vnode -> node
  const node = createNode(fnnode);
  return node;
}

// 处理类组件
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  // 实例化类
  const instance = new type(props);
  const classnode = instance.render();
  const node = createNode(classnode);
  return node
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