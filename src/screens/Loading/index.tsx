import React from 'react';
import {
  Container,
  CustomText
} from './styles';

interface LoadingProps {
  prop1: boolean,
  prop2: string;
}

export const Loading = ({ prop1, prop2 }: LoadingProps) => {
  return (
    <Container>
      <CustomText>Open up App.js to start working on your app!</CustomText>
    </Container >
  );
};