import { jsx, css } from '@emotion/core';
import styles from './Drawer.module.css';
import { useSpring, a } from 'react-spring';
import { useDrag, rubberbandIfOutOfBounds } from 'react-use-gesture';
import { CartList } from '../CartList/CartList';
import { AiOutlineArrowRight } from 'react-icons/ai';

export const Drawer = ({
  bind,
  animationStyles: { y },
  visibleHeight,
  stops,
}) => {
  return (
    <a.div
      className={styles.wrapper}
      css={css`
        grid-template-rows: ${-visibleHeight.toFixed(2) * 0.1}px ${-visibleHeight.toFixed(
            2
          ) * 0.7}px ${-visibleHeight.toFixed(2) * 0.2}px;
      `}
      style={{
        y: y,
      }}
    >
      <section {...bind()} className={styles.draggable}>
        <div className={styles.selector} />
      </section>
      <CartList></CartList>
      <a.button
        className={styles.checkout}
        style={{
          scaleX: y.to(stops, [0.1, 1]),
        }}
      >
        <span
          css={css`
            margin: 0 5%;
          `}
        >
          Continue
        </span>
        <AiOutlineArrowRight></AiOutlineArrowRight>
      </a.button>
    </a.div>
  );
};

export const findNearestNumberInArray = (n, arr) => {
  const sortedArr = [...arr].sort((a, b) => a - b);
  if (n <= sortedArr[0]) return sortedArr[0];
  if (n >= sortedArr[arr.length - 1]) return sortedArr[arr.length - 1];

  for (let i = 1; i < sortedArr.length; i++) {
    const prev = sortedArr[i - 1];
    const current = sortedArr[i];
    if (current === n) return current;
    if (current > n && prev < n) {
      return current - n < n - prev ? current : prev;
    }
  }
  return false;
};
