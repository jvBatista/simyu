import React from 'react';
import { SingleColumn } from '../SingleColumn';
import { Container, ChildContainer, ScrollArea } from './styles';

interface SpacedSingleColumnProps {
  children: React.ReactNode[]
}

export const SpacedSingleColumn = ({ children }: SpacedSingleColumnProps) => {
  const firstChildrenElement = children[0];
  const secondChildrenElement = children[1];

  return (
    <Container>
      <ScrollArea nestedScrollEnabled={true}>
        {
          <SingleColumn>
            {firstChildrenElement}
          </SingleColumn>
        }

        {secondChildrenElement}
      </ScrollArea>
    </Container >
  );
};