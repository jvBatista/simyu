export const taxLabels = {
    cdi: '% do CDI',
    aa: '% ao ano',
    am: '% ao mês'
};

export const periodLabels = {
    year: ' ano(s)',
    month: ' mês(es)',
    day: ' dia(s)'
};

export const IRLabels = [
    "Até 180 dias (6 meses)",
    "De 181 a 360 dias (1 ano)",
    "De 361 a 720 dias (2 anos)",
    "Acima de 720 dias (+ 2 anos)"
];

export const handlePeriodLabel = (period: number, timeUnit: string) => {
    if (timeUnit == 'day') {
        let dayText;
        if (period == 1) dayText = 'dia';
        else dayText = 'dias';

        return `${period} ${dayText}`;
    } else if (timeUnit == 'year') {
        let text;

        if (period == 1) text = 'ano';
        else text = 'anos';

        return `${period} ${text}`;
    }

    const years = Math.floor(period / 12);
    const months = period % 12;

    let yearText, monthText;
    if (months == 1) monthText = 'mês';
    else monthText = 'meses';

    if (years == 1) yearText = 'ano';
    else yearText = 'anos';

    if (!years) return `${months} ${monthText}`;
    else if (!months) return `${years} ${yearText}`;

    return `${years} ${yearText} e ${months} ${monthText}`;
}
