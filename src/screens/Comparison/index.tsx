import React, { useState } from 'react';
import { CircleButton } from '../../components/atoms/CircleButton';
import { RegularText } from '../../components/atoms/RegularText';
import { Title } from '../../components/atoms/Title';
import { IncomeCompareField } from '../../components/molecules/IncomeCompareField';
import { InputSlider } from '../../components/molecules/Slider';
import { InputSection } from '../../components/organisms/InputSection';
import { InvestCard } from '../../components/organisms/InvestCard';
import { SingleColumn } from '../../components/templates/SingleColumn';
import { calculateIOFRate, calculateIRRate, calculateIncome } from '../../utils/finCalc';
import { CardContainer, CenteredRow, SliderContainer } from './styles';


export interface InvestProps {
  id: number,
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
  const [investList, setInvestList] = useState<InvestProps[]>([]);

  const months: number[] = [];

  for (let i = 0; i <= 360; i += 1) {
    if (i < 13) months.push(i); // first 12 months
    else if (i < 121 && i % 6 == 0) months.push(i); // every 6 months for 10 years
    else if (i % 12 == 0) months.push(i); // every year for 20 years
  }

  const createNewInvest = () => {
    let newList = investList;

    newList.push({
      id: counter,
      name: `Investimento ${investList.length}`,
      incomeRate: 100,
      rateType: 'cdi',
      applyIR: true,
      applyIOF: true
    });

    setCounter(counter + 1);
    setInvestList([...newList]);
  }

  const updateInvestData = (id: number, data: InvestProps) => {
    let newList = investList;
    newList[id] = data;

    setInvestList([...newList]);
  }

  const deleteInvest = (id: number) => {
    const item = investList.find(item => item.id == id);
    console.log(item);

    if (typeof item != "undefined") {
      const newList = [...investList];
      console.log(newList[0] == item)
      const index = newList.indexOf(item);
      if (index > -1) newList.splice(index, 1);

      setInvestList(newList);
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

  const handlePeriodLabel = () => {
    const years = Math.floor(periodInMonths / 12);
    const months = periodInMonths % 12;

    let yearText, monthText;
    if (months == 1) monthText = 'mês';
    else monthText = 'meses';

    if (years == 1) yearText = 'ano';
    else yearText = 'anos';

    if (!years) return `${months} ${monthText}`;
    else if (!months) return `${years} ${yearText}`;

    return `${years} ${yearText} e ${months} ${monthText}`
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

      <SliderContainer>
        <InputSlider
          value={periodInMonths}
          setValue={handleMonthSelection}
          maxValue={months.length - 1}
        />
        <RegularText>{handlePeriodLabel()}</RegularText>
      </SliderContainer>

      {investList.length ? investList.map(({ id }) => (
        <CardContainer key={id}>
          <InvestCard
            id={id}
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
          period={handlePeriodLabel()}
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