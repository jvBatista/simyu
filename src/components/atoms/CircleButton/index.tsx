import React from 'react';
import { AddIcon, RemoveIcon } from '../Icons/Icons';
import {
  Container
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
      {variant == 'default' ? <AddIcon /> : <RemoveIcon />}
    </Container >
  );
};