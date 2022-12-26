import React, { useState } from 'react';
import { formatter } from '../../../utils/currencyFormatter';
import { ArrowDown } from '../../atoms/Icons/Icons';
import { RegularText } from '../../atoms/RegularText';
import {
  Button,
  CenteredRow,
  Container, DetailsContainer, HeaderContainer, InfoRow, Line,
} from './styles';

interface YieldFieldProps {
  period: string,
  yieldValue: number,
  totalValue: number,
  grossIncome: number,
  IRValue: number,
  IOFValue: number
}

export const YieldField = ({
  period,
  yieldValue,
  totalValue,
  grossIncome,
  IRValue,
  IOFValue
}: YieldFieldProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <Container>
      <CenteredRow>
        <Button onPress={() => setOpened(!opened)} rotate={!opened}>
          <ArrowDown width={16} />
        </Button>
      </CenteredRow>

      <RegularText size='smaller'>
        valor aproximado em <RegularText size='smaller' variant='orange'>{period}</RegularText>
      </RegularText>


      <HeaderContainer>
        <RegularText size='giant' weight='semibold'>{formatter.format(totalValue)}</RegularText>
      </HeaderContainer>


      <RegularText>
        seu saldo renderá   <RegularText variant='green' weight='semibold'>{`+ ${formatter.format(yieldValue)}`}</RegularText>
      </RegularText>

      <DetailsContainer opened={opened}>
        <InfoRow>
          <RegularText size='smaller'>rendimentos brutos</RegularText>
          <RegularText variant='cyan' weight='semibold'>{`+ ${formatter.format(grossIncome)}`}</RegularText>
        </InfoRow>
        <InfoRow>
          <RegularText size='smaller'>valor descontado IR</RegularText>
          <RegularText variant='red' weight='semibold'>{`- ${formatter.format(IRValue)}`}</RegularText>
        </InfoRow>
        <InfoRow>
          <RegularText size='smaller'>valor descontado IOF</RegularText>
          <RegularText variant='red' weight='semibold'>{`- ${formatter.format(IOFValue)}`}</RegularText>
        </InfoRow>

        <Line />

        <InfoRow>
          <RegularText size='smaller'>rendimentos líquidos</RegularText>
          <RegularText variant='green' weight='semibold'>{`+ ${formatter.format(yieldValue)}`}</RegularText>
        </InfoRow>
      </DetailsContainer>
    </Container >
  );
};