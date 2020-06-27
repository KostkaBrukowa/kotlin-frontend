import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import style from './index.module.less';

// @ts-ignore
if (ReactDOM.createRoot) {
  // @ts-ignore
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
} else {
  // @ts-ignore
  ReactDOM.unstable_createRoot(document.getElementById('root') as HTMLElement).render(<App />);
}
