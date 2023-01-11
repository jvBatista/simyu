import React from 'react';
import { formatter } from '../../../utils/currencyFormatter';
import { Container, Input } from './styles';

interface InputProps {
  value: number,
  setValue: (value: number) => void,
  updateValue: (value: number) => void
}

export const CurrencyInput = ({
  value,
  setValue,
  updateValue
}: InputProps) => {

  const handleTextChange = (text: string) => {
    if (text.length < 15) {
      if (text.length < 3) setValue(0)
      else {
        text = text.replace('R', '').replace('$', '').replace('.', '');
        text = text.slice(0, -2) + "." + text.slice(-2);

        setValue(parseFloat(text.replace(',', '').replace(',', '')));
      }
    }
  }

  return (
    <Container>
      <Input
        value={formatter.format(value).trim()}
        onChangeText={handleTextChange}
        keyboardType='numeric'
        onBlur={() => updateValue(value)}
      />
    </Container >
  );
};