import React from 'react';
import { RegularText } from '../../atoms/RegularText';
import {
  Container, LabelContainer, ValueContainer,
} from './styles';

interface TableRowProps {
  item: {
    label: string,
    value: string
  },
  index: number;
}

export const TableRow = ({ item, index }: TableRowProps) => {
  return (
    <Container>
      <LabelContainer index={index}>
        <RegularText size='smaller'>{item.label}</RegularText>
      </LabelContainer>

      <ValueContainer index={index}>
        <RegularText size='smaller'>{item.value}</RegularText>
      </ValueContainer>
    </Container >
  );
};