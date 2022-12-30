import { IOF, IR } from "./taxes";

const CDI = 13.65;

const roundUp = (num: number, cases = 2) => {
    return +num.toFixed(cases);
}

const toMonthlyRate = (rate: number, rateType: string) => {
    // [(1 + 0,1)^ 1/12 – 1] x 100

    if (rateType == 'am') return rate;

    let rateCoef = 1 + (rate / 100);
    let monthlyRate = 0;

    if (rateType == 'aa')
        monthlyRate = (Math.pow(rateCoef, 1 / 12) - 1) * 100;
    else if (rateType == 'cdi') {
        const convertedRate = CDI * (rate / 100);
        rateCoef = 1 + (convertedRate / 100);

        monthlyRate = (Math.pow(rateCoef, 1 / 12) - 1) * 100;
    }


    return +monthlyRate.toFixed(3);
}

const toMonths = (period: number, timeUnit: string) => {
    let periodInMonths = 0;

    if (timeUnit == 'month') periodInMonths = period;
    else if (timeUnit == 'day') periodInMonths = period / 30;
    else if (timeUnit == 'year') periodInMonths = period * 12;

    return periodInMonths;
}

export const calculateIRRate = (period: number, timeUnit: string) => {
    let periodInDays = 0;

    if (timeUnit == 'day') periodInDays = period;
    else if (timeUnit == 'month') periodInDays = period * 30;
    else if (timeUnit == 'year') periodInDays = period * 360;

    if (periodInDays > 721) return IR[IR.length - 1].tax;

    let tax = IR.find(element => period >= element.minDays && period < element.maxDays)?.tax;
    return tax ? tax : 0;
}

export const calculateIOFRate = (period: number, timeUnit: string) => {
    if (timeUnit != 'day' || period > 30 || period == 0) return 0;

    const tax = IOF.find(element => element.day == period)?.tax
    return tax ? tax : 0;
}

interface IncomeCalcProps {
    period: number,
    timeUnit: string,
    rateType: string,
    initialValue: number,
    monthlyAdd: number,
    incomeRate: number,
    irRate: number,
    iofRate: number
};


export const calculateIncome = ({
    period,
    timeUnit,
    rateType,
    initialValue,
    monthlyAdd,
    incomeRate,
    irRate,
    iofRate
}: IncomeCalcProps) => {
    // M = (C x ((1 + (i / 100)) ^ n)) + (a × (((((1 + (i / 100))) ^ n )− 1) ÷ (i / 100))
    let totalAmount, grossIncome, amountMinusIncome, netIncome;

    const rateCoef = 1 + (toMonthlyRate(incomeRate, rateType) / 100);
    const periodInMonths = toMonths(period, timeUnit);
    const irCoef = 1 - (irRate / 100);
    const iofCoef = 1 - (iofRate / 100);

    totalAmount = (initialValue * roundUp(Math.pow(rateCoef, periodInMonths), 4));
    totalAmount = totalAmount + (monthlyAdd * (roundUp(Math.pow(rateCoef, periodInMonths) - 1, 4) / (toMonthlyRate(incomeRate, rateType) / 100)));

    amountMinusIncome = initialValue + (monthlyAdd * periodInMonths);
    grossIncome = roundUp(totalAmount - amountMinusIncome);
    netIncome = +roundUp((grossIncome * irCoef) * iofCoef).toFixed(2);
    totalAmount = roundUp(amountMinusIncome + netIncome);

    const irDiscountedValue = roundUp(grossIncome * (irRate / 100));
    const iofDiscountedValue = roundUp((grossIncome - irDiscountedValue) * (iofRate / 100));

    // console.log({
    //     rate: toMonthlyRate(incomeRate, timeUnit),
    //     periodInMonths,
    //     ir: irRate,
    //     iof: iofRate,
    //     totalAmount,
    //     amountMinusIncome,
    //     grossIncome,
    //     netIncome,
    //     irDiscountedValue,
    //     iofDiscountedValue
    // })

    return {
        totalAmount,
        amountMinusIncome,
        grossIncome,
        netIncome,
        irDiscountedValue,
        iofDiscountedValue
    };
};
