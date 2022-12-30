import React from "react";
import { Container, CustomSlider } from "./styles";
import theme from "../../../theme";
import { useWindowDimensions } from "react-native";

interface InputSliderProps {
  value: number,
  setValue: (value: number) => void,
  maxValue: number
};

export const InputSlider = ({
  value,
  setValue,
  maxValue
}: InputSliderProps) => {
  const window = useWindowDimensions();
  const WIDTH = window.width - 64;

  return (
    <Container>
      <CustomSlider
        style={{ width: WIDTH }}
        minimumValue={0}
        maximumValue={maxValue}
        minimumTrackTintColor={theme.colors.cyan}
        maximumTrackTintColor={theme.colors.white}
        thumbTintColor={theme.colors.cyan}
        value={12}
        onValueChange={value => setValue(Math.floor(value))}
      />
    </Container>
  );
};
