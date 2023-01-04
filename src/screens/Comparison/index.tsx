import React, { useState } from 'react';
import { CircleButton } from '../../components/atoms/CircleButton';
import { Title } from '../../components/atoms/Title';
import { IncomeCompareField } from '../../components/molecules/IncomeCompareField';
import { InputSection } from '../../components/organisms/InputSection';
import { InvestCard } from '../../components/organisms/InvestCard';
import { SingleColumn } from '../../components/templates/SingleColumn';
import { RadioButton } from '../../components/molecules/RadioButton';
import {
  CardContainer,
  CenteredRow,
  OptionsInputContainer,
  RadioContainer
} from './styles';
import { calculateIOFRate, calculateIRRate, calculateIncome } from '../../utils/finCalc';
import { handlePeriodLabel, periodLabels } from '../../utils/labels';
import { CurveChartIcon } from '../../components/atoms/Icons/Icons';


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
  const [period, setPeriod] = useState(1);
  const [timeUnit, setTimeUnit] = useState<'year' | 'month' | 'day'>('year');
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
      period,
      timeUnit,
      rateType: invest.rateType,
      initialValue,
      monthlyAdd,
      incomeRate: invest.incomeRate,
      irRate: invest.applyIR ? calculateIRRate(period, timeUnit) : 0,
      iofRate: invest.applyIOF ? calculateIOFRate(period, timeUnit) : 0,
    });

    return incomeData;
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

      <OptionsInputContainer>
        <RadioContainer>
          <RadioButton
            label="anos"
            buttonFunction={() => setTimeUnit('year')}
            checked={timeUnit == 'year'}
          />
          <RadioButton
            label="meses"
            buttonFunction={() => setTimeUnit('month')}
            checked={timeUnit == 'month'}
          />
          <RadioButton
            label="dias"
            buttonFunction={() => setTimeUnit('day')}
            checked={timeUnit == 'day'}
          />
        </RadioContainer>

        <InputSection
          type={'labeled'}
          label={'ao longo de'}
          labeledText={periodLabels[timeUnit]}
          changeUnit={1}
          maxValue={1000}
          minValue={1}
          value={period}
          setValue={setPeriod}
        />
      </OptionsInputContainer>



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
          period={handlePeriodLabel(period, timeUnit)}
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