import React from 'react';
import {
  Container,
  ButtonText
} from './styles';

interface CircleButtonProps {
  buttonFunction: VoidFunction,
  variant?: "default" | "secondary";
}

export const CircleButton = ({
  buttonFunction,
  variant='default'
}: CircleButtonProps) => {
  return (
    <Container variant={variant} onPress={buttonFunction}>
      <ButtonText variant={variant}>{variant == 'default' ? '+' : '-'}</ButtonText>
    </Container >
  );
};