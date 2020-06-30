import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.module.less';

// @ts-ignore
if (ReactDOM.render) {
  // @ts-ignore
  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
} else {
  // @ts-ignore
  ReactDOM.unstable_createRoot(document.getElementById('root') as HTMLElement).render(<App />);
}
