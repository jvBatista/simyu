import React from 'react';
import {
  Container,
  CustomText
} from './styles';

interface SimulationProps {
  prop1: boolean,
  prop2: string;
}

export const Simulation = ({ prop1, prop2 }: SimulationProps) => {
  return (
    <Container>
      <CustomText>Open up App.js to start working on your app!</CustomText>
    </Container >
  );
};