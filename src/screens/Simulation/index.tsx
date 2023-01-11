import React, { useEffect, useState } from 'react';
import { Title } from '../../components/atoms/Title';
import { Checkbox } from '../../components/molecules/Checkbox';
import { IncomeField } from '../../components/molecules/IncomeField';
import { InputSection } from '../../components/organisms/InputSection';
import { SingleColumn } from '../../components/templates/SingleColumn';
import { handlePeriodLabel, periodLabels, taxLabels } from '../../utils/labels';
import {
    calculateIOFRate,
    calculateIRRate,
    calculateIncome
} from '../../utils/finCalc';
import {
    CheckboxContainer,
    OptionsInputContainer
} from './styles';
import { OptionsRow } from '../../components/organisms/OptionsRow';

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

    const rateTypes = [
        { label: 'CDI', value: 'cdi' },
        { label: '% a.a', value: 'aa' },
        { label: '% a.m', value: 'am' },
    ];

    const timePeriods = [
        { label: 'anos', value: 'year' },
        { label: 'meses', value: 'month' },
        { label: 'dias', value: 'day' },
    ];


    return (
        <SingleColumn>
            <Title text="simule seu rendimento" />

            <InputSection
                type={'currency'}
                label={'valor inicial'}
                defaultValue={initialValue}
                updateValue={setInitialValue}
            />
            <InputSection
                type={'currency'}
                label={'depositando todo mês'}
                defaultValue={monthlyAdd}
                updateValue={setMonthlyAdd}
            />

            <OptionsInputContainer>
                <OptionsRow options={rateTypes} updateValue={(value) => {
                    if (value == 'cdi' || value == 'aa' || value == 'am') setRateType(value)
                }}
                />

                <InputSection
                    type={'labeled'}
                    label={'com taxa de'}
                    labeledText={taxLabels[rateType]}
                    changeUnit={1}
                    maxValue={1000}
                    defaultValue={incomeRate}
                    updateValue={setIncomeRate}
                    includesDecimals
                />
            </OptionsInputContainer>

            <OptionsInputContainer>
                <OptionsRow options={timePeriods} updateValue={(value) => {
                    if (value == 'year' || value == 'month' || value == 'day') setTimeUnit(value)
                }} />

                <InputSection
                    type={'labeled'}
                    label={'ao longo de'}
                    labeledText={periodLabels[timeUnit]}
                    changeUnit={1}
                    maxValue={1000}
                    minValue={1}
                    defaultValue={period}
                    updateValue={setPeriod}
                />
            </OptionsInputContainer>

            <CheckboxContainer>
                <Checkbox
                    defaultValue={applyIR}
                    label={'aplicar imposto de renda'}
                    updateValue={setApplyIR}
                />
                <Checkbox
                    defaultValue={applyIOF}
                    label={'aplicar IOF'}
                    updateValue={setApplyIOF}
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