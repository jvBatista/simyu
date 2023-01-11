import React from 'react';
import {
  Container,
  ButtonText
} from './styles';

interface CircleButtonProps {
  variant?: "default" | "secondary",
  buttonFunction: VoidFunction,
}

export const CircleButton = ({
  variant = 'default',
  buttonFunction
}: CircleButtonProps) => {
  return (
    <Container
      variant={variant}
      onPress={buttonFunction}
      delayPressOut={0}

    >
      <ButtonText variant={variant}>{variant == 'default' ? '+' : '-'}</ButtonText>
    </Container >
  );
};