import React, { useState } from 'react';
import { Container, Input } from './styles';

interface InputProps {
  defaultValue: string,
  updateValue: (value: string) => void,
}

export const RegularInput = ({
  defaultValue,
  updateValue,
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Container>
      <Input
        value={value}
        onChangeText={setValue}
        onBlur={() => updateValue(value)}
      />
    </Container >
  );
};