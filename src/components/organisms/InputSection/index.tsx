import React from 'react';
import { CircleButton } from '../../atoms/CircleButton';
import { CurrencyInput } from '../../atoms/CurrencyInput';
import { LabeledInput } from '../../atoms/LabeledInput';
import { RegularText } from '../../atoms/RegularText';
import { ButtonContainer, Container, InputRow } from './styles';

interface InputSectionProps {
  label: string,
  value: number,
  setValue: (value: number) => void,
  type: 'currency' | 'labeled',
  labeledText?: string,
  changeUnit?: number,
  maxValue?: number,
  minValue?: number,
  includesDecimals?: boolean
}

export const InputSection = ({
  label,
  value,
  setValue,
  type,
  labeledText = '',
  changeUnit = 100,
  maxValue = 1_000_000,
  minValue = 0.01,
  includesDecimals = false
}: InputSectionProps) => {
  const increaseValue = () => {
    if (value < maxValue) {
      if (value + changeUnit < maxValue) setValue(value + changeUnit);
      else setValue(maxValue);
    }
    else setValue(maxValue);
  };

  const decreaseValue = () => {
    if (value > minValue) {
      if (value - changeUnit > minValue) setValue(value - changeUnit);
      else setValue(minValue);
    }
    else setValue(minValue);
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

        <ButtonContainer>
          <CircleButton buttonFunction={decreaseValue} variant="secondary" />
          <CircleButton buttonFunction={increaseValue} />
        </ButtonContainer>
      </InputRow>
    </Container >
  );
};