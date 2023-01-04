import React, { useEffect, useState } from 'react';
import { Title } from '../../components/atoms/Title';
import { Checkbox } from '../../components/molecules/Checkbox';
import { RadioButton } from '../../components/molecules/RadioButton';
import { IncomeField } from '../../components/molecules/IncomeField';
import { InputSection } from '../../components/organisms/InputSection';
import { SingleColumn } from '../../components/templates/SingleColumn';
import { handlePeriodLabel, periodLabels, taxLabels } from '../../utils/labels';
import {
    calculateIOFRate,
    calculateIRRate,
    calculateIncome,
    toMonths
} from '../../utils/finCalc';
import {
    CheckboxContainer,
    OptionsInputContainer,
    RadioContainer
} from './styles';

export const Simulation = () => {
    const [initialValue, setInitialValue] = useState(1000);
    const [monthlyAdd, setMonthlyAdd] = useState(100);
    const [incomeRate, setIncomeRate] = useState(100);
    const [period, setPeriod] = useState(1);
    const [rateType, setRateType] = useState<'cdi' | 'aa' | 'am'>('cdi');
    const [timeUnit, setTimeUnit] = useState<'year' | 'month' | 'day'>('year');
    const [applyIR, setApplyIR] = useState(true);
    const [applyIOF, setApplyIOF] = useState(true);

    const [incomeResults, setIncomeResults] = useState<{
        totalAmount: number,
        amountMinusIncome: number,
        grossIncome: number,
        netIncome: number,
        irDiscountedValue: number,
        iofDiscountedValue: number
    }>({
        totalAmount: 0,
        amountMinusIncome: 0,
        grossIncome: 0,
        netIncome: 0,
        irDiscountedValue: 0,
        iofDiscountedValue: 0
    });

    useEffect(() => {
        setIncomeResults(calculateIncome({
            period,
            timeUnit,
            rateType,
            initialValue,
            monthlyAdd,
            incomeRate,
            irRate: applyIR ? calculateIRRate(period, timeUnit) : 0,
            iofRate: applyIOF ? calculateIOFRate(period, timeUnit) : 0,
        }));
    }, [
        period,
        initialValue,
        monthlyAdd,
        incomeRate,
        rateType,
        timeUnit,
        applyIOF,
        applyIR
    ]);


    return (
        <SingleColumn>
            <Title text="simule seu rendimento" />

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
                        label="CDI"
                        buttonFunction={() => setRateType('cdi')}
                        checked={rateType == 'cdi'}
                    />
                    <RadioButton
                        label="% a.a"
                        buttonFunction={() => setRateType('aa')}
                        checked={rateType == 'aa'}
                    />
                    <RadioButton
                        label="% a.m"
                        buttonFunction={() => setRateType('am')}
                        checked={rateType == 'am'}
                    />
                </RadioContainer>

                <InputSection
                    type={'labeled'}
                    label={'com taxa de'}
                    labeledText={taxLabels[rateType]}
                    changeUnit={1}
                    maxValue={1000}
                    value={incomeRate}
                    setValue={setIncomeRate}
                    includesDecimals
                />
            </OptionsInputContainer>

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

            <CheckboxContainer>
                <Checkbox
                    checked={applyIR}
                    label={'aplicar imposto de renda'}
                    buttonFunction={() => setApplyIR(!applyIR)}
                />
                <Checkbox
                    checked={applyIOF}
                    label={'aplicar IOF'}
                    buttonFunction={() => setApplyIOF(!applyIOF)}
                />
            </CheckboxContainer>

            <IncomeField
                period={handlePeriodLabel(period, timeUnit)}
                incomeValue={incomeResults.netIncome}
                totalValue={incomeResults.totalAmount}
                grossIncome={incomeResults.grossIncome}
                IRValue={incomeResults.irDiscountedValue}
                IOFValue={incomeResults.iofDiscountedValue}
            />
        </SingleColumn>
    );
}