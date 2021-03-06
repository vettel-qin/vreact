import React from 'react';
import ReactDOM from './react-dom';
import Component from './Component';
import './index.css';

class ClassCompoent extends Component {
  render() {
    return (<div className='classComponent'>类组件</div>)
  }
}

// const FnComponent = () => {
//   return (
//     <div className="fnComponent">函数组件</div>
//   )
// }

function FnComponent() {
  return (
    <div className="fnComponent">函数组件</div>
  )
}

const jsx = (
  <section>
    <h1 className="title">vreact</h1>
    <h3>简版react</h3>
    <FnComponent />
    <ClassCompoent />
  </section>
);

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

