import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

export const useAspectRatio = (aspectRatio) => {
  const [ref, bounds] = useMeasure();
  const [style, setStyle] = useState({ height: 0 });
  useEffect(() => {
    setStyle({ height: bounds.width / (aspectRatio[0] / aspectRatio[1]) });
  }, [bounds]);
  return [ref, style];
};
