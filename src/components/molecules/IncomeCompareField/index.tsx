import React, { useEffect, useState } from 'react';
import { formatter } from '../../../utils/currencyFormatter';
import { ArrowDown } from '../../atoms/Icons/Icons';
import { RegularText } from '../../atoms/RegularText';
import {
  Button,
  CenteredRow,
  Container,
  DetailsContainer,
  HeaderContainer,
  InfoRow
} from './styles';

interface InvestIncome {
  name: string,
  totalAmount: number,
  netIncome: number,
}

interface IncomeCompareFieldProps {
  period: string,
  investIncomeList: InvestIncome[]
}

export const IncomeCompareField = ({
  period,
  investIncomeList
}: IncomeCompareFieldProps) => {
  const [opened, setOpened] = useState(false);
  const [topInvest, setTopInvest] = useState<InvestIncome>(investIncomeList[0]);

  const pickTopInvest = () => {
    const maxIncome = Math.max(...investIncomeList.map(item => item.totalAmount));
    const topInvest = investIncomeList.find(item => item.totalAmount == maxIncome);

    return topInvest!;
  }

  useEffect(() => {
    const topInvest = pickTopInvest();
    setTopInvest(topInvest);
  }, [investIncomeList])

  return (
    <Container>
      <CenteredRow>
        <Button onPress={() => setOpened(!opened)} rotate={!opened}>
          <ArrowDown width={16} />
        </Button>
      </CenteredRow>

      <RegularText size='smaller'>
        recomendação para <RegularText size='smaller' variant='orange'>{period}</RegularText>
      </RegularText>


      <HeaderContainer>
        <RegularText size='larger' weight='semibold'>{topInvest?.name}</RegularText>
        <RegularText size='larger' weight='semibold'>{formatter.format(topInvest.totalAmount)}</RegularText>
      </HeaderContainer>


      <RegularText>
        seu saldo renderá   <RegularText variant='green' weight='semibold'>{`+ ${formatter.format(topInvest.netIncome)}`}</RegularText>
      </RegularText>

      <DetailsContainer opened={opened}>
        <InfoRow>
          <RegularText size='smaller'>investimentos e rendimentos</RegularText>
        </InfoRow>

        {
          investIncomeList.map((invest, index) => (
            <InfoRow key={index}>
              <RegularText variant={index % 2 == 0 ? 'cyan' : 'orange'} weight='semibold'>{invest.name}</RegularText>
              <RegularText variant={index % 2 == 0 ? 'cyan' : 'orange'} weight='semibold'>{`${formatter.format(invest.totalAmount)}`}</RegularText>
            </InfoRow>
          ))
        }
      </DetailsContainer>
    </Container >
  );
};