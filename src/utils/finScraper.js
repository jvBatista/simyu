const puppeteer = require('puppeteer');

const scrapeStockData = async (stock) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.fundamentus.com.br/detalhes.php?papel=${stock}`);

    let [el] = await page.$x('/html/body/div[1]/div[2]/table[1]/tbody/tr[3]/td[2]/span');
    const nameText = await el.getProperty('textContent');
    let nameValue = await nameText.jsonValue();

    [el] = await page.$x('/html/body/div[1]/div[2]/table[3]/tbody/tr[2]/td[4]/span');
    const plText = await el.getProperty('textContent');
    let plValue = await plText.jsonValue();
    plValue = plValue.replace(',', '.');

    [el] = await page.$x('/html/body/div[1]/div[2]/table[3]/tbody/tr[3]/td[4]/span');
    const pvpText = await el.getProperty('textContent');
    let pvpValue = await pvpText.jsonValue();
    pvpValue = pvpValue.replace(',', '.');

    [el] = await page.$x('/html/body/div[1]/div[2]/table[3]/tbody/tr[2]/td[6]/span');
    const lpaText = await el.getProperty('textContent');
    let lpaValue = await lpaText.jsonValue();
    lpaValue = lpaValue.replace(',', '.');

    [el] = await page.$x('/html/body/div[1]/div[2]/table[3]/tbody/tr[3]/td[6]/span');
    const vpaText = await el.getProperty('textContent');
    let vpaValue = await vpaText.jsonValue();
    vpaValue = vpaValue.replace(',', '.');

    [el] = await page.$x('/html/body/div[1]/div[2]/table[1]/tbody/tr[1]/td[4]/span');
    const stockText = await el.getProperty('textContent');
    let stockValue = await stockText.jsonValue();
    stockValue = stockValue.replace(',', '.');

    [el] = await page.$x('/html/body/div[1]/div[2]/table[3]/tbody/tr[9]/td[4]/span');
    const divYieldText = await el.getProperty('textContent');
    let divYieldValue = await divYieldText.jsonValue();
    divYieldValue = divYieldValue.replace(',', '.');


    await browser.close();

    const fairPrice = Math.sqrt(parseFloat(lpaValue) * parseFloat(vpaValue) * 22.5);
    const ceilPrice = (parseFloat(stockValue) * (parseFloat(divYieldValue.replace('%', '')) / 100)) / 0.06;

    console.log({
        STOCK: stock.toUpperCase(),
        NAME: nameValue,
        VALUE: parseFloat(stockValue),
        PL: parseFloat(plValue),
        PVP: parseFloat(pvpValue),
        LPA: parseFloat(lpaValue),
        VPA: parseFloat(vpaValue),
        DIV_YIELD: parseFloat(divYieldValue.replace('%', '')),
        FAIR_PRICE: Math.round(fairPrice * 100) / 100,
        CEIL_PRICE: Math.round(ceilPrice * 100) / 100
    });
};

const scrapeStockList = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.fundamentus.com.br/detalhes.php?papel=`);

    const result = await page.$$eval('table tr td', tds => tds
        .filter(td => { if (!td.cellIndex) return td })
        .map(td => { return td.innerText }));

    console.log(result)

    fetch('http://localhost:3000/stocks', {
        method: 'POST', // You can use GET or another HTTP method as needed
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stocks: result }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from Rails:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


    await browser.close();
};


scrapeStockList();

const getCompanyFinance = async (page) => {
    // await page.waitForSelector('.dataTables_paginate');

    const pageData = await page.evaluate(() => {
        const table = document.querySelector('#table-balance-results');
        const rows = table.querySelectorAll('tbody tr');

        const values = [];
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const label = cells[0].innerText;
            const value = cells[1].innerText;

            values.push({
                label,
                value
            });
        });

        return values;
    });

    return pageData;
}

const getCompanyDividendsHistory = async (page) => {
    await page.waitForSelector('.dataTables_paginate');

    let hasNextButton = true;
    const dividends = [];

    while (hasNextButton) {
        const pageData = await page.evaluate(() => {
            const table = document.querySelector('#table-dividends-history');
            const rows = table.querySelectorAll('tbody tr');

            const values = [];
            rows.forEach((row) => {
                const cells = row.querySelectorAll('td');
                const tipo = cells[0].innerText;
                const dataCOM = cells[1].innerText;
                const pagamento = cells[2].innerText;
                const valor = parseFloat(cells[3].innerText.trim().replace(',', '.'));

                const currentYear = new Date().getFullYear();
                const tenYearsAgo = (currentYear - 11);
                const reachedLastDecade = parseInt(pagamento.slice(-4)) <= tenYearsAgo;

                if (!reachedLastDecade) {
                    values.push({
                        tipo,
                        dataCOM,
                        pagamento,
                        valor,
                    });
                }
            });

            return values;
        });

        dividends.push(...pageData);

        hasNextButton = await page.evaluate(() => {
            const nextButton = document.querySelector('#table-dividends-history_next');
            return !nextButton.classList.contains('disabled');
        });

        if (hasNextButton) {
            const nextButton = await page.$('#table-dividends-history_next');
            await nextButton.click();
        }
    }

    return dividends;
}

const getStockIndicatorHistory = async (page) => {
    await page.evaluate(() => {
        const buttons = document.querySelectorAll('a.nav-link.period-indicator-history');
        const tenYearsButton = Array.from(buttons).find(button => button.textContent === '10 ANOS');
        tenYearsButton.click();
    });

    // Wait for some time (optional)
    await page.waitForTimeout(1000); // You can add a delay if needed

    // Perform your code inside the iteration
    // For example, you can extract values from the table
    const data = await page.evaluate(() => {
        const tableRows = document.querySelectorAll('#table-indicators-history tbody tr');
        const extractedData = [];

        tableRows.forEach(row => {
            const indicator = row.querySelector('.indicator');
            //   const values = Array.from(row.querySelectorAll('.value')).map(td => td.textContent.trim());
            if (indicator) extractedData.push(Object.keys(indicator));
        });

        return extractedData;
    });

    // const pageData = await page.evaluate(() => {
    //     const table = document.querySelector('#table-indicators-history');
    //     const rows = table.querySelectorAll('tbody tr');

    //     const values = [];
    //     rows.forEach((row) => {
    //         const cells = row.querySelectorAll('td');
    //         const indicador = cells[0].innerText;
    //         const values = [];
    //         cells.forEach((cell, index) => {
    //             if (index != 0) {
    //                 values.push(cell.innerText);
    //             }
    //         })

    //         values.push({
    //             indicador, values
    //         });
    //     });

    //     return values;
    // });

    console.log(data)
}

const getCompanyProfileFields = async (page) => {
    await page.waitForSelector('.action');

    const logoElement = await page.$('.logo img');
    const tickerElement = await page.$('.name-ticker h1');
    const nameElement = await page.$('.name-ticker h2.name-company');

    const logoUrl = await page.evaluate(el => el.getAttribute('src'), logoElement);
    const companyTicker = await page.evaluate(el => el.textContent.trim(), tickerElement);
    const companyName = await page.evaluate(el => el.textContent.trim(), nameElement);

    return { NOME: companyName, COD: companyTicker, logo: logoUrl };
}

const getStockHeaderValues = async (page) => {
    await page.waitForSelector("section[id='cards-ticker']");

    const data = await page.$$eval("._card", (items) =>
        items.map((item) => {
            const name = item.querySelector("div._card-header")?.textContent?.trim();
            const value = item.querySelector("div._card-body")?.textContent?.trim();

            if (name && value) {
                return {
                    name: name.replaceAll('\n', '').trim(),
                    value: value.replaceAll('\n', '').trim(),
                };
            }
        }).filter(Boolean)
    );

    data.pop();
    const headerData = {};
    data.forEach(item => headerData[item.name] = item.value);

    return headerData;
}

const getStockIndicators = async (page) => {
    await page.waitForSelector("div[id='table-indicators']");

    const data = await page.$$eval(".cell", (items) =>
        items.map((item) => {
            const name = item.querySelector("span.d-flex.justify-content-between.align-items-center")?.textContent?.trim();
            const value = item.querySelector("div.value")?.textContent?.trim();

            if (name && value) {
                return {
                    name: name.replaceAll('\n', '').trim(),
                    value: parseFloat(
                        value
                            .replaceAll('\n', '')
                            .trim()
                            .replace(',', '.')
                            .replace('%', '')
                    ),
                };
            }
        }).filter(Boolean)
    );

    const indicators = {};
    data.forEach(item => indicators[item.name] = item.value);

    return indicators;
}

const getCompanyIndicators = async (page) => {
    await page.waitForSelector("div[id='table-indicators-company']");

    const data = await page.$$eval(".cell", (items) =>
        items.map((item) => {
            const name = item.querySelector("span.title")?.textContent?.trim();
            let value = item.querySelector("div.detail-value")?.textContent?.trim();
            if (!value) value = item.querySelector("span.value")?.textContent?.trim();
            else value = parseFloat(
                value
                    .replaceAll('\n', '')
                    .replace('R$ ', '')
                    .replace('%', '')
                    .replaceAll('.', '')
                    .replace(',', '.').trim()
            )

            if (name && value) {
                return {
                    name: name.replaceAll('\n', '').trim(),
                    value
                };
            }
        }).filter(Boolean)
    );

    const companyData = {};
    data.forEach(item => companyData[item.name] = item.value);

    return companyData;
}

const getCompanyData = async (page) => {
    await page.waitForSelector(".basic_info");

    const pageData = await page.evaluate(() => {
        const div = document.querySelector('.basic_info');
        const rows = div.querySelectorAll('table tbody tr');

        const data = {};
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const label = cells[0].innerText;
            const value = cells[1].innerText;

            data[label] = value;
        });

        return data;
    });

    return pageData;
}

const dividendYield = (stock) => {
    return stock.dividendHistory.reduce(
        (dividend, currentValue) => {
            dividend.valor + currentValue
        },
        0
    );
}

const scrapeStockData10 = async (stock) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('response', async response => {
        console.log(await response);
        // if (response.resourceType() == 'xhr') {
        // }
    })

    await page.goto(`https://www.google.com/search?safe=active&sca_esv=561015036&sxsrf=AB5stBi12LuEnmaRXJjWCI46b8oiy1DhrQ:1693322501421&q=naruto&tbm=isch&source=lnms&sa=X&ved=2ahUKEwilvr_xlYKBAxUTrZUCHcWNDcIQ0pQJegQIDBAB&biw=1920&bih=944&dpr=1`);

    // const stockObj = {
    //     ...await getCompanyProfileFields(page),
    //     ...await getStockHeaderValues(page)
    // };

    // stockObj.indicators = await getStockIndicators(page);
    // stockObj.company = {
    //     ...await getCompanyData(page),
    //     ...await getCompanyIndicators(page)
    // };
    // stockObj.dividendHistory = await getCompanyDividendsHistory(page);

    // stockObj.finance = await getCompanyFinance(page);
    // await getStockIndicatorHistory(page);

    await browser.close();

    // console.log(stockObj);
};

// scrapeStockData10('vale3');

const url =
    "https://investidor10.com.br/acoes/taee11/";

async function StartScraping() {
    await puppeteer
        .launch({
            // headless: false,
        })
        .then(async (browser) => {
            const page = await browser.newPage();

            await page.setViewport({
                width: 1366,
                height: 768,
            });

            const ids = [];

            const responseHandler = async (response) => {
                const responseType = response.request().resourceType();

                // if (responseType === 'xhr') {
                //     console.log('XHR Response URL:', response.url());
                // } else if (responseType === 'document') {
                //     console.log('Document Response URL:', response.url());
                // }

                const url = response.url();

                if (url.includes('https://investidor10.com.br/api') && !url.includes('component')) {
                    ids.push(url);
                    console.log(url);
                }
            };

            // Add the response event listener
            page.on('response', responseHandler);

            await page.goto(url, {
                waitUntil: "load",
                timeout: 0,
            });

            // Set a timeout to remove the response event listener after 5 seconds
            setTimeout(async () => {
                page.off('response', responseHandler);
                console.log('Stopped listening to responses after 5 seconds.');
                await browser.close();
                console.log(ids);
            }, 1000);

        });
}
// StartScraping();

const scrapeUrls = async (stock) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const urls = [];

    const responseHandler = async (response) => {
        const url = response.url();

        if (url.includes('https://investidor10.com.br/api') && !url.includes('component')) {
            urls.push(url);
            console.log(url);
        }
    };

    page.on('response', responseHandler);

    await page.goto(`https://investidor10.com.br/acoes/${stock}`, {
        waitUntil: "load",
        timeout: 0,
    });

    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

    page.off('response', responseHandler);
    console.log('Stopped listening to responses after 5 seconds.');
    await browser.close();

    // console.log(urls);
    return urls;
}

const scrapeStockIds = async (stock) => {
    const urls = await scrapeUrls(stock);
    console.log(urls);

    const ids = {};

    const stockUrl = urls.find(url => url.includes('cotacao/ticker/'));
    ids.stock_id = typeof stockUrl != 'undefined' ? stockUrl.split('cotacao/ticker/')[1] : "";

    const companyUrl = urls.find(url => url.includes('receitaliquida/chart/'));
    ids.company_id = typeof companyUrl != 'undefined' ? companyUrl.split('receitaliquida/chart/')[1].split('/')[0] : "";

    console.log(ids);

    fetch('http://localhost:3000/stocks', {
        method: 'POST', // You can use GET or another HTTP method as needed
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock: {
                ticker: stock.toUpperCase,
                stock_source_id: parseInt(ids.stock_id),
                company_source_id: parseInt(ids.company_id)
            }
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from Rails:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// scrapeStockIds("taee11");

const scrapeStockHistory = async (stock) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/finance/quote/${stock.toUpperCase()}:BVMF?window=1Y`);

    await page.waitForSelector('.ushogf');

    const targetElement = await page.$('.gJBfM');
    let popupText;

    if (targetElement) {
        const boundingBox = await targetElement.boundingBox();

        for (let i = 1; i < 251; i++) {
            if (boundingBox) {
                // Calculate the coordinates for the center of the element
                const offset = (boundingBox.width / 252)
                const x = Math.ceil(boundingBox.x + offset * i);
                console.log(x)
                const y = boundingBox.y + boundingBox.height / 2;

                // Move the mouse cursor to the element's position
                await page.mouse.move(x, y);

                popupText = await page.evaluate(() => {
                    const popup = document.querySelector('p.hSGhwc-SeJRAd');
                    return popup.textContent
                });

                console.log('Popup text:', popupText);
            }
        }
    }
    else console.log('not found')


    await browser.close();

    // console.log(text);
};

// scrapeStockHistory('vale3');

// iron-ore => https://api.investing.com/api/financialdata/961729/historical/chart/?period=P5Y&interval=P1W&pointscount=120
const scrapeCommodity = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://br.investing.com/commodities/iron-ore-62-cfr-futures`, { waitUntil: "load" });

    const pageData = await page.evaluate(() => {
        const items = document.querySelectorAll('ul li');

        const values = [];
        items.forEach((item) => {
            const rawAttb = item.innerText.split('\n')
            const dividend = {
                type: rawAttb[0],
                cum_date: rawAttb[2].split(' ')[2],
                ex_date: rawAttb[3].split(' ')[3],
                payment: parseFloat(rawAttb[4].split('[')[1].replace(']', '').replace(',', '.'))
            }
            values.push(dividend)
        });

        return values;
    });


    await browser.close();

    console.log(pageData);
};

// scrapeCommodity();

const scrapeDividends = async (stock) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://dividendobr.com/lib/search.php?q=${stock}`, { waitUntil: "load" });

    const pageData = await page.evaluate(() => {
        const items = document.querySelectorAll('ul li');

        const values = [];
        items.forEach((item) => {
            const rawAttb = item.innerText.split('\n')
            const dividend = {
                type: rawAttb[0],
                cum_date: rawAttb[2].split(' ')[2],
                ex_date: rawAttb[3].split(' ')[3],
                payment: parseFloat(rawAttb[4].split('[')[1].replace(']', '').replace(',', '.'))
            }
            values.push(dividend)
        });

        return values;
    });


    await browser.close();

    console.log(pageData);
};

// scrapeDividends('vale3')
/*
    Cotação -> https://investidor10.com.br/api/cotacao/ticker/38
    Historico cotação -> https://investidor10.com.br/api/cotacoes/acao/chart/taee11/365/true/real
    Historico Indicadores -> https://investidor10.com.br/api/historico-indicadores/38/5
    DY -> https://investidor10.com.br/api/dividend-yield/chart/taee11/3650/ano/
    Dividendos -> https://investidor10.com.br/api/dividendos/chart/taee11/3650/ano/
    BP -> https://investidor10.com.br/api/balancos/balancopatrimonial/chart/29/true/
    Historico Balancos -> https://investidor10.com.br/api/balancos/balancoresultados/chart/29/5/yearly/
    Cotação x Lucro -> https://investidor10.com.br/api/cotacao-lucro/taee11/adjusted/
    Historico Receita -> https://investidor10.com.br/api/balancos/receitaliquida/chart/29/3650/0/
    Historico Ativos e Passivos -> https://investidor10.com.br/api/balancos/ativospassivos/chart/29/3650/

    38 - cotação, hist indicadores (stock_id)
    29 - bp, hist bp, hist rec, hist atv x pass (company_id)
    taee11 - hist cot, dy, divs, cot x lucro (stock_ticker)



    https://statusinvest.com.br/acao/indicatorhistoricallist, body: { codes[]: patr4, time: 7, byQuarter: false, futureData: false }
    https://statusinvest.com.br/acao/indicatorhistoricallist, body: { codes[]: patr4, time: 5, byQuarter: false, futureData: false }
    https://statusinvest.com.br/acao/payoutresult?code=petr4&companyid=408&type=0
    https://statusinvest.com.br/acao/tickerprice, { ticker: PETR4,type: 0,currences[]: 1 }
    https://statusinvest.com.br/acao/getrevenue?code=PETR4&type=0&viewType=0
    https://statusinvest.com.br/acao/getdre?code=petr4&type=0&futureData=false
    https://statusinvest.com.br/acao/getfluxocaixa?code=petr4&type=0&futureData=false
    https://statusinvest.com.br/acao/getmargins?code=PETR4&type=0
    https://statusinvest.com.br/acao/getbsactivepassivechart?code=PETR4&type=0
    https://statusinvest.com.br/acao/getativos?code=petr4&type=0&futureData=false&range.min=2018&range.max=2022
    https://statusinvest.com.br/acao/getassetreports, {year:2023,code:PETR4}
    https://statusinvest.com.br/sector/getcompanies?categoryType=1&SetorId=1&SubsetorId=&SegmentoId=
*/