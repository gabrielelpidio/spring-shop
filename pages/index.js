import React, { useRef, useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';
import {
  useSpring,
  a,
  useTransition,
  useChain,
  Transition,
  to,
} from 'react-spring';
import { useDrag, rubberbandIfOutOfBounds } from 'react-use-gesture';
import { AiOutlineShopping } from 'react-icons/ai';

import style from '../styles/layout.module.css';
import { Drawer } from '../components/Drawer/Drawer';

export default function Home() {
  const [ref, bounds] = useMeasure();
  const stops = [0, -(bounds.height - bounds.height * 0.1 - 50)];
  const [visibleHeight, setVisibleHeight] = useState(stops[stops.length - 1]);
  const open = useRef(null);
  const setOpen = (value = !open.current) => {
    open.current = value;
  };
  const [{ y }, set] = useSpring(
    () => ({
      y: 0,
      onRest: () => {
        setOpen(findNearestNumberInArray(y.get(), stops) === stops[1]);
      },
      config: {
        tension: 247,
        friction: 27,
      },
    }),
    [stops]
  );
  const openDrawer = (value) => {
    if (open.current || value === false) {
      set(() => {
        return { y: stops[0] };
      });
    } else if (!open.current || value) {
      set(() => {
        return { y: stops[stops.length - 1] };
      });
    }
  };

  const bind = useDrag(
    ({ movement: [, my], tap, down, swipe: [, swipeY] }) => {
      if (tap) {
        return openDrawer();
      }
      const newY = down
        ? rubberbandIfOutOfBounds(my, stops[stops.length - 1], stops[0])
        : findNearestNumberInArray(my, stops);

      set({ y: newY });
    },
    { initial: () => [0, y.get()], filterTaps: true }
  );

  useEffect(() => setVisibleHeight(stops[stops.length - 1]), [stops]);

  return (
    <>
      <div className={style.layout} ref={ref}>
        <section className={style.top}>
          <a.div
            className={style.backdrop}
            style={{
              display: y
                .to(stops, [0, 1])
                .to((y) => (y > 0.05 ? 'block' : 'none')),
              opacity: y.to(stops, [0, 1]),
            }}
            onClick={openDrawer}
          ></a.div>
          <button className={style.button} onClick={() => openDrawer(true)}>
            <AiOutlineShopping size="2rem" color="white" />
          </button>
        </section>
        <Drawer
          layoutHeight={bounds.height}
          stops={stops}
          visibleHeight={visibleHeight}
          bind={bind}
          animationStyles={{ y }}
        ></Drawer>
      </div>
    </>
  );
}

const findNearestNumberInArray = (n, arr) => {
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

const interpolateValue = (value, from, to) => {
  debugger;
  const percentage = (input, min, max) => ((input - min) * 100) / (max - min);
  const valueInRange = (percent, max, min) =>
    (percent * (max - min)) / 100 + min;

  return valueInRange(
    percentage(value, from[0], from[from.length - 1]),
    to[to.length - 1],
    to[0]
  );
};
