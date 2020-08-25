import React from 'react';
import styles from './CartItem.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAspectRatio } from '../../hooks/useAspectRatio';

export const CartItem = ({ children }) => {
  const [ref, style] = useAspectRatio([1, 1]);
  return (
    <div className={styles.wrapper}>
      <figure className={styles.imgWrapper} ref={ref} style={style}>
        <img src="/example.png" alt="shoe" className={styles.productImg} />
      </figure>
      <section className={styles.itemDetail}>
        <span className={styles.quantity}>x1</span>
        <h3 className={styles.name}>Nike</h3>
        <span className={styles.price}>{`$${100}`}</span>
        <AiOutlineDelete className={styles.delete} size="75%"></AiOutlineDelete>
      </section>
    </div>
  );
};
