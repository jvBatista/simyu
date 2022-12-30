const months = [];

for (let i = 0; i <= 360; i += 1) {
    if (i < 13) months.push(i); // first 12 months
    else if (i < 121 && i % 6 == 0) months.push(i); // every 6 months for 10 years
    else if (i % 12 == 0) months.push(i); // every year for 20 years
}

console.log(months);