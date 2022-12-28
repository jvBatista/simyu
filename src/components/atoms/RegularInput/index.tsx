import React from 'react';
import { Container, Input } from './styles';

interface InputProps {
  value: string,
  setValue: (value: string) => void,
}

export const RegularInput = ({
  value,
  setValue,
}: InputProps) => {

  return (
    <Container>
      <Input
        value={value}
        onChangeText={setValue}
        keyboardType='numeric'
      />
    </Container >
  );
};