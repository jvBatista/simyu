import React, { useEffect, useState } from 'react';
import { RadioButton } from '../../molecules/RadioButton';
import { Container } from './styles';

interface OptionsRowProps {
  options: {
    label: string,
    value: string
  }[],
  updateValue: (value: string) => void
}

export const OptionsRow = ({ options, updateValue }: OptionsRowProps) => {
  const [value, setValue] = useState(options[0].value);

  useEffect(() => {
    updateValue(value);
  }, [value]);

  const renderOptions = () => {
    return (
      options.map((option, index) => (
        <RadioButton
          key={index}
          label={option.label}
          buttonFunction={() => setValue(option.value)}
          checked={value == option.value}
        />
      ))
    )
  }

  return (
    <Container>
      {renderOptions()}
    </Container >
  );
};