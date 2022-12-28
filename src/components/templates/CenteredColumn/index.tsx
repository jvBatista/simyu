import React from 'react';
import { Container } from './styles';

interface CenteredColumnProps {
  children: React.ReactNode[] | React.ReactNode
}

export const CenteredColumn = ({ children }: CenteredColumnProps) => {
  return (
    <Container>
      {children}
    </Container >
  );
};