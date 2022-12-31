import React from 'react';
import { Container, ChildContainer, ScrollArea } from './styles';

interface SingleColumnProps {
  children: React.ReactNode[] | React.ReactNode
}

export const SingleColumn = ({ children }: SingleColumnProps) => {
  const childrenList = children as React.ReactNode[];
  return (
    <Container>
      <ScrollArea nestedScrollEnabled={true}>
        {
          childrenList.map((element, index) => (
            <ChildContainer key={index} isLast={index == (childrenList.length - 1)}>
              {element}
            </ChildContainer>
          ))
        }
      </ScrollArea>
    </Container >
  );
};