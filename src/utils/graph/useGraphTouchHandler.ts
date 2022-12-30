import type { SkiaMutableValue, SkiaValue } from "@shopify/react-native-skia";
import {
  runDecay,
  clamp,
  dist,
  vec,
  useValue,
  useTouchHandler,
} from "@shopify/react-native-skia";

export const useGraphTouchHandler = (
  x: SkiaMutableValue<number>,
  y: SkiaValue<number>,
  width: number
) => {
  const gestureActive = useValue(false);
  const offsetX = useValue(0);
  const onTouch = useTouchHandler({
    onStart: (pos) => {
      const normalizedCenter = vec(x.current, y.current);
      
      if (dist(normalizedCenter, pos) < 50) {
        gestureActive.current = true;
        offsetX.current = x.current - pos.x;
      }
    },
    onActive: (pos) => {
      if (gestureActive.current) {
        x.current = clamp(offsetX.current + pos.x, 0, width);
      }
    },
    onEnd: ({ velocityX }) => {
      if (gestureActive.current) {
        gestureActive.current = false;
        runDecay(x, { velocity: velocityX, clamp: [0, width] });
      }
    },
  });
  return onTouch;
};