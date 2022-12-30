import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  Canvas,
  Path,
  Group,
  useValue,
  useComputedValue,
  LinearGradient,
  vec,
  SkiaValue,
  SkPath,
  Line
} from "@shopify/react-native-skia";
import { getYForX } from "../../../utils/graph/Math";
import { COLORS, buildGraph2 } from "../../../utils/graph/model";
import { useGraphTouchHandler } from "../../../utils/graph/useGraphTouchHandler";
import { GraphCursor } from "../../atoms/GraphCursor";
import { DataPoint, originalData } from "./Data";
import { GraphPointer } from "../../atoms/GraphPointer";

interface IncomeGraphProps {
  data: DataPoint[][]
};

const PADDING = 24;

export const IncomeGraph = ({ data }: IncomeGraphProps) => {
  const window = useWindowDimensions();
  const width = window.width - PADDING * 2;
  const height = window.height / 3;
  const translateY = height / 12;

  const x = useValue(20);
  const handleGraphData = (data: DataPoint[][]) => {
    const newData = data.map((graph) => {
      const path = useComputedValue(() => {
        return buildGraph2(graph, width, height);
      }, [data]);

      const y = useComputedValue(
        () => getYForX(path.current.toCmds(), x.current),
        [x, path]
      );

      return {
        path,
        y
      }
    })

    return newData;
  }
  const graphData = handleGraphData(data);

  // const graphData = useComputedValue(() => {
  //   const newData = data.map((graph) => {
  //     const path = buildGraph2(graph, width, height);

  //     const y = useComputedValue(
  //       () => getYForX(path.toCmds(), x.current),
  //       [x, path]
  //     );

  //     return {
  //       path,
  //       y
  //     }
  //   })

  //   return newData;
  // }, [data]);

  // const path = useComputedValue(() => {
  //   return buildGraph2(data[0], width, height);
  // }, [data]);

  // const y = useComputedValue(
  //   () => getYForX(path.current.toCmds(), x.current),
  //   [x, path]
  // );


  // const [graphData, setGraphData] = useState<{
  //   path: SkiaValue<SkPath>;
  //   y: SkiaValue<number>;
  // }[]>(handleGraphData(data))

  useEffect(() => {
    console.log(data)
  }, [data])

  const cursorGraph = buildGraph2([{ month: 0, value: 10 }], width, height);
  const path3 = useComputedValue(() => {
    return cursorGraph;
  }, []);
  const y3 = useComputedValue(
    () => 5,
    [x, path3]
  );

  const onTouch = useGraphTouchHandler(x, y3, width);

  return (
    <View>
      <Canvas style={{ width: width, height }}
        onTouch={onTouch}
      >
        {
          [1, 2, 3, 4, 5, 6].map((i) => (
            <Line
              p1={vec(0, (265 / 6) * i)}
              p2={vec(400, (265 / 6) * i)}
              color="lightgrey"
              opacity={0.2}
              style="stroke"
              strokeWidth={1}
            />
          ))
        }
        {
          graphData.map((graph, index) => (
            <Group transform={[{ translateY }]}
              key={index}
            >
              <Path
                style="stroke"
                path={graph.path}
                strokeWidth={4}
                strokeJoin="round"
                strokeCap="round"
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(width, 0)}
                  colors={COLORS[index % 4]}
                />
              </Path>
              <GraphPointer colorIndex={index % 4} x={x} y={graph.y} width={width} />
            </Group>
          ))
        }
        <Group transform={[{ translateY }]}>
          <GraphCursor colorIndex={3} x={x} y={y3} width={width} />
        </Group>
      </Canvas>
    </View>
  );
};
