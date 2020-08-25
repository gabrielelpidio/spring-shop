import React from 'react';
import { CartItem } from '../CartItem/CartItem';
import styles from './CartList.module.css';

export const CartList = () => {
  return (
    <ul className={styles.wrapper}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
        <CartItem key={e}></CartItem>
      ))}
    </ul>
  );
};
