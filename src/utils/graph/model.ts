import { Skia } from "@shopify/react-native-skia";
import { scaleLinear } from "d3";
import { DataPoint } from "../../components/molecules/IncomeGraph/Data";

import { curveLines } from "./Math";

export const PADDING = 16;

export const COLORS = [
  ["#082E8E", "#79F1F1"].map(Skia.Color),
  ["#FF7605", "#FFDD28"].map(Skia.Color),
  ["#2CA6CD", "#70EE5B"].map(Skia.Color),
  ["#B4176C", "#FF6040"].map(Skia.Color)
];

const POINTS = 20;

// const buildGraph = (
//   datapoints: DataPoints,
//   label: string,
//   WIDTH: number,
//   HEIGHT: number
// ) => {
//   const AJUSTED_SIZE = HEIGHT - PADDING * 2;
//   const priceList = datapoints.prices.slice(0, POINTS);
//   const formattedValues = priceList
//     .map((price) => [parseFloat(price[0]), price[1]] as [number, number])
//     .reverse();
//   const prices = formattedValues.map((value) => value[0]);
//   const dates = formattedValues.map((value) => value[1]);
//   const minDate = Math.min(...dates);
//   const maxDate = Math.max(...dates);
//   const minPrice = Math.min(...prices);
//   const maxPrice = Math.max(...prices);
//   const points = formattedValues.map(([price, date]) => {
//     const x = ((date - minDate) / (maxDate - minDate)) * WIDTH;
//     const y = ((price - minPrice) / (maxPrice - minPrice)) * AJUSTED_SIZE;
//     return { x, y };
//   });
//   points.push({ x: WIDTH + 10, y: points[points.length - 1].y });
//   const path = curveLines(points, 0.1, "complex");
//   return {
//     label,
//     minPrice,
//     maxPrice,
//     percentChange: datapoints.percent_change,
//     path,
//   };
// };

export const buildGraph2 = (
  data: DataPoint[],
  WIDTH: number,
  HEIGHT: number
) => {
  const AJUSTED_SIZE = HEIGHT - PADDING * 2;
  const yMax = Math.max(...data.map(val => val.value));
  const yPos = scaleLinear().domain([0, yMax]).range([AJUSTED_SIZE, 20]);

  const xMax = Math.max(...data.map(val => val.month));
  const xMin = Math.min(...data.map(val => val.month));
  const xPos = scaleLinear().domain([xMin, xMax]).range([0, WIDTH]);

  const points = data.map(({ month, value }) => {
    const x = xPos(month);
    const y = yPos(value);
    return { x, y };
  });
  points.push({ x: WIDTH + 10, y: points[points.length - 1].y });
  const path = curveLines(points, 0.1, "complex");

  return path;
};
