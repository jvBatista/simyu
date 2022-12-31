import React from 'react';
import { handlePeriodLabel } from '../../../utils/labels';
import { RegularText } from '../../atoms/RegularText';
import { InputSlider } from '../../atoms/Slider';
import { CenteredRow, Row, SliderContainer } from './styles';

interface SliderInputSectionProps {
  label: string,
  value: number,
  setValue: (value: number) => void,
  maxValue: number
}

export const SliderInputSection = ({
  label,
  value,
  setValue,
  maxValue
}: SliderInputSectionProps) => {


  return (
    <SliderContainer>
      <Row>
        <RegularText size='smaller' variant='cyan'>{label}</RegularText>
      </Row>

      <InputSlider
        value={value}
        setValue={setValue}
        maxValue={maxValue}
      />

      <CenteredRow>
        <RegularText>{handlePeriodLabel(value)}</RegularText>
      </CenteredRow>
    </SliderContainer>
  );
};