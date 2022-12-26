import React from 'react';
import { RadioCircle } from '../../atoms/Icons/Icons';
import { RegularText } from '../../atoms/RegularText';
import {
  Button,
  Container
} from './styles';

interface RadioButtonProps {
  checked: boolean,
  label: string;
  buttonFunction: VoidFunction;
}

export const RadioButton = ({
  checked,
  label,
  buttonFunction
}: RadioButtonProps) => {
  return (
    <Container>
      <Button checked={checked} onPress={buttonFunction}>
        {checked && <RadioCircle />}
      </Button>

      <RegularText size='smaller'>{label}</RegularText>
    </Container >
  );
};