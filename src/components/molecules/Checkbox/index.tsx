import React, { useEffect, useState } from 'react';
import { CheckIcon } from '../../atoms/Icons/Icons';
import {
  Box,
  Container,
  Label
} from './styles';

interface CheckboxProps {
  label: string,
  updateValue: (value: boolean) => void,
  defaultValue?: boolean
}

export const Checkbox = ({
  label,
  updateValue,
  defaultValue = true
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    updateValue(checked);
  }, [checked]);

  return (
    <Container>
      <Box checked={checked} onPress={() => setChecked(!checked)}>
        {checked && <CheckIcon />}
      </Box>

      <Label>{label}</Label>
    </Container >
  );
};