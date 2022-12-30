

import type { SkiaValue } from "@shopify/react-native-skia";
import {
  interpolateColors,
  Circle,
  Group,
  useComputedValue,
  Paint,
} from "@shopify/react-native-skia";
import React from "react";

import { COLORS } from "../../../utils/graph/model";

interface GraphCursorProps {
  colorIndex: number
  x: SkiaValue<number>;
  y: SkiaValue<number>;
  width: number;
}

export const GraphCursor = ({ colorIndex, x, y, width }: GraphCursorProps) => {
  const color = useComputedValue(
    () =>
      interpolateColors(
        x.current / width,
        COLORS[colorIndex].map((_, i) => i / COLORS[colorIndex].length),
        COLORS[colorIndex]
      ),
    [x]
  );
  const transform = useComputedValue(
    () => [{ translateX: x.current }, { translateY: y.current }],
    [x, y]
  );
  return (
    <Group transform={transform}>
      <Circle cx={0} cy={0} r={27} color={color} opacity={0.1} />
      <Circle cx={0} cy={0} r={18} color={color} opacity={0.15} />
      <Circle cx={0} cy={0} r={9} color={color}>
        <Paint style="stroke" strokeWidth={2} color="white" />
      </Circle>
    </Group>
  );
};