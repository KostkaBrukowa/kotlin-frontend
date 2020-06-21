import React from 'react';
import { Layout } from 'antd';
import { Hello } from './hello-world/Hello';

function App() {
  return (
    <Layout>
      <Hello what="world!" />
    </Layout>
  );
}

export default App;
