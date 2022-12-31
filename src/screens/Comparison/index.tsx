import React, { useState } from 'react';
import { CircleButton } from '../../components/atoms/CircleButton';
import { Title } from '../../components/atoms/Title';
import { IncomeCompareField } from '../../components/molecules/IncomeCompareField';
import { InputSection } from '../../components/organisms/InputSection';
import { InvestCard } from '../../components/organisms/InvestCard';
import { SingleColumn } from '../../components/templates/SingleColumn';
import { calculateIOFRate, calculateIRRate, calculateIncome } from '../../utils/finCalc';
import { CardContainer, CenteredRow } from './styles';
import { handlePeriodLabel } from '../../utils/labels';
import { SliderInputSection } from '../../components/molecules/SliderInputSection';


export interface InvestProps {
  id: string,
  name: string,
  incomeRate: number,
  rateType: 'cdi' | 'aa' | 'am',
  applyIR: boolean,
  applyIOF: boolean
}

export const Comparison = () => {
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyAdd, setMonthlyAdd] = useState(100);
  const [periodInMonths, setPeriodInMonths] = useState(12);
  const [counter, setCounter] = useState(0);
  const [investList, setInvestList] = useState<InvestProps[]>([
    {
      id: new Date().getTime().toString(),
      name: `Investimento ${1}`,
      incomeRate: 100,
      rateType: 'cdi',
      applyIR: true,
      applyIOF: true
    }
  ]);

  const months: number[] = [];

  for (let i = 0; i <= 360; i += 1) {
    if (i < 13) months.push(i); // first 12 months
    else if (i < 121 && i % 6 == 0) months.push(i); // every 6 months for 10 years
    else if (i % 12 == 0) months.push(i); // every year for 20 years
  }

  const createNewInvest = () => {
    let newList = investList;

    newList.push({
      id: new Date().getTime().toString(),
      name: `Investimento ${investList.length}`,
      incomeRate: 100,
      rateType: 'cdi',
      applyIR: true,
      applyIOF: true
    });

    setCounter(counter + 1);
    setInvestList([...newList]);
  }

  const updateInvestData = (index: number, data: InvestProps) => {
    let newList = investList;
    newList[index] = data;

    setInvestList([...newList]);
  }

  const deleteInvest = (id: string) => {
    const item = investList.find(item => item.id == id);
    console.log(item);

    if (typeof item != "undefined") {
      const newList = [...investList];

      const index = newList.indexOf(item);
      if (index > -1) newList.splice(index, 1);

      setInvestList([...newList]);
    }
  }

  const calculateInvestIncome = (invest: InvestProps) => {
    const incomeData = calculateIncome({
      period: periodInMonths,
      timeUnit: 'month',
      rateType: invest.rateType,
      initialValue,
      monthlyAdd,
      incomeRate: invest.incomeRate,
      irRate: invest.applyIR ? calculateIRRate(periodInMonths, 'month') : 0,
      iofRate: invest.applyIOF ? calculateIOFRate(periodInMonths, 'month') : 0,
    });

    return incomeData;
  }

  const handleMonthSelection = (value: number) => {
    setPeriodInMonths(months[value]);
  }


  return (
    <SingleColumn>
      <Title text="compare investimentos" />

      <InputSection
        type={'currency'}
        label={'valor inicial'}
        value={initialValue}
        setValue={setInitialValue}
      />
      <InputSection
        type={'currency'}
        label={'depositando todo mês'}
        value={monthlyAdd}
        setValue={setMonthlyAdd}
      />

      <SliderInputSection
        value={periodInMonths}
        setValue={handleMonthSelection}
        maxValue={months.length - 1}
        label={'ao longo de'}
      />

      {investList.length ? investList.map(({ id }, index) => (
        <CardContainer key={id} cardIndex={index}>
          <InvestCard
            id={id}
            index={index}
            updateData={updateInvestData}
            deleteInvest={deleteInvest}
            initialValue={initialValue}
            monthlyAdd={monthlyAdd}
          />
        </CardContainer>
      )) : null}

      <CenteredRow>
        <CircleButton buttonFunction={createNewInvest} />
      </CenteredRow>
      {investList.length ?
        <IncomeCompareField
          period={handlePeriodLabel(periodInMonths)}
          investIncomeList={investList.map((item) => {
            const { totalAmount, netIncome } = calculateInvestIncome(item);

            return {
              name: item.name,
              totalAmount,
              netIncome,
            }
          })}
        /> : null}
    </SingleColumn>
  );
}