import React from 'react';
import { Container, ChildContainer, ScrollArea } from './styles';

interface SingleColumnProps {
  children: React.ReactNode[] | React.ReactNode
}

export const SingleColumn = ({ children }: SingleColumnProps) => {
  return (
    <Container>
      <ScrollArea nestedScrollEnabled={true}>
        {
          (children as React.ReactNode[]).map((element, index) => (
            <ChildContainer key={index}>
              {element}
            </ChildContainer>
          ))
        }
      </ScrollArea>
    </Container >
  );
};