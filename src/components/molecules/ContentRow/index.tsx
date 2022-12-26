import React, { useState } from 'react';
import { ArrowDown } from '../../atoms/Icons/Icons';
import { RegularText } from '../../atoms/RegularText';
import {
  Button,
  Container,
  Content,
  Row
} from './styles';

interface ContentRowProps {
  title: string,
  children: React.ReactNode;
}

export const ContentRow = ({ title, children }: ContentRowProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <Container>
      <Row>
        <RegularText size='larger'>{title}</RegularText>

        <Button onPress={() => setOpened(!opened)} opened={opened}>
          <ArrowDown />
        </Button>
      </Row>

      <Content opened={opened}>
        {children}
      </Content>
    </Container >
  );
};