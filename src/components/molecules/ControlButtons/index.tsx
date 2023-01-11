import React from 'react';
import { CircleButton } from '../../atoms/CircleButton';
import {
  ButtonContainer,
  Container
} from './styles';

interface ControlButtonsProps {
  onDecrease: VoidFunction,
  onIncrease: VoidFunction,
}

export const ControlButtons = ({ onDecrease, onIncrease }: ControlButtonsProps) => {
  return (
    <Container>
      <ButtonContainer>
        <CircleButton buttonFunction={onDecrease} variant="secondary" />
      </ButtonContainer>

      <ButtonContainer>
        <CircleButton buttonFunction={onIncrease} />
      </ButtonContainer>
    </Container >
  );
};