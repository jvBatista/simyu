import React from 'react';
import {
  Container,
  CustomText
} from './styles';

interface CenteredColumnProps {
  prop1: boolean,
  prop2: string;
}

export const CenteredColumn = ({ prop1, prop2 }: CenteredColumnProps) => {
  return (
    <Container>
      <CustomText>Open up App.js to start working on your app!</CustomText>
    </Container >
  );
};