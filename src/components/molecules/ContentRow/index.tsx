import React, { useState } from 'react';
import { ArrowDown } from '../../atoms/Icons/Icons';
import { RegularText } from '../../atoms/RegularText';
import {
  IconContainer,
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
      <Row onPress={() => setOpened(!opened)}>
        <RegularText size='larger'>{title}</RegularText>

        <IconContainer opened={opened}>
          <ArrowDown />
        </IconContainer>
      </Row>

      <Content opened={opened}>
        {children}
      </Content>
    </Container >
  );
};