import React from 'react';
import { Container, Input } from './styles';
import { RegularText } from '../RegularText';

interface InputProps {
  label: string,
  value: number,
  setValue: (value: number) => void,
  includesDecimals?: boolean
}

export const LabeledInput = ({
  label,
  value,
  setValue,
  includesDecimals = false
}: InputProps) => {

  const handleTextChange = (text: string) => {
    if (includesDecimals) {
      if (text.length < 6) {
        if (!text) setValue(0);
        else {
          if (text.includes('.')) {
            text = text.replace('.', '');
            text = text.slice(0, -2) + "." + text.slice(-2);
          }

          setValue(parseFloat(text.replace(',', '').replace(',', '')));
        }
      }
    } else {
      if (text.length < 4) {

        if (!text) setValue(1);
        else setValue(parseFloat(text.replace('.', '')));
      }
    }
  };


  return (
    <Container>
      <Input
        value={value.toString()}
        onChangeText={handleTextChange}
        keyboardType='numeric'
      />
      <RegularText size='larger' weight='medium'>{label}</RegularText>
    </Container >
  );
};