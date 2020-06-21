import React from 'react';
import { Button } from 'antd';
import styles from './HelloWorld.module.css';

export interface HelloWorldProps {
  what: string;
}

export const Hello: React.FC<HelloWorldProps> = ({ what }) => (
  <header className={styles.header}>
    <Button>Click button with andD</Button>
    <p>Hello {what}!</p>
  </header>
);
