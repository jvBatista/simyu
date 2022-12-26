import React from 'react';
import { CheckIcon } from '../../atoms/Icons/Icons';
import {
  Box,
  Container,
  Label
} from './styles';

interface CheckboxProps {
  checked: boolean,
  label: string;
  buttonFunction: VoidFunction;
}

export const Checkbox = ({
  checked,
  label,
  buttonFunction
}: CheckboxProps) => {
  return (
    <Container>
      <Box checked={checked} onPress={buttonFunction}>
        {checked && <CheckIcon />}
      </Box>

      <Label>{label}</Label>
    </Container >
  );
};