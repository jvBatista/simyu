import React, { useState } from 'react';
import { CircleButton } from '../../atoms/CircleButton';
import { CurrencyInput } from '../../atoms/CurrencyInput';
import { LabeledInput } from '../../atoms/LabeledInput';
import { RegularText } from '../../atoms/RegularText';
import { ButtonContainer, ButtonsContainer, Container, InputRow } from './styles';

interface InputSectionProps {
  label: string,
  defaultValue: number,
  updateValue: (value: number) => void,
  type: 'currency' | 'labeled',
  labeledText?: string,
  changeUnit?: number,
  maxValue?: number,
  minValue?: number,
  includesDecimals?: boolean
}

export const InputSection = ({
  label,
  defaultValue,
  updateValue,
  type,
  labeledText = '',
  changeUnit = 100,
  maxValue = 1000000,
  minValue = 0,
  includesDecimals = false
}: InputSectionProps) => {
  const [value, setValue] = useState(defaultValue);
  
  const increaseValue = () => {
    if (value < maxValue) {
      if (value + changeUnit < maxValue) setValue(value + changeUnit);
      else setValue(maxValue);
    }
    else setValue(maxValue);

    updateValue(value);
  };

  const decreaseValue = () => {
    if (value > minValue) {
      if (value - changeUnit > minValue) setValue(value - changeUnit);
      else setValue(minValue);
    }
    else setValue(minValue);

    updateValue(value);
  };

  return (
    <Container>
      <RegularText variant='cyan' size='smaller'>{label}</RegularText>

      <InputRow>
        {type == 'currency' && <CurrencyInput value={value} setValue={setValue} />}
        {
          type == 'labeled' &&
          <LabeledInput
            value={value}
            setValue={setValue}
            label={labeledText}
            includesDecimals={includesDecimals}
          />
        }

        <ButtonsContainer>
          <ButtonContainer>
            <CircleButton buttonFunction={decreaseValue} variant="secondary" />
          </ButtonContainer>

          <ButtonContainer>
            <CircleButton buttonFunction={increaseValue} />
          </ButtonContainer>
        </ButtonsContainer>
      </InputRow>
    </Container >
  );
};