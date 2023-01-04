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

    const data = await page.$$eval('table tr td', tds => tds
        .filter(td => { if (!td.cellIndex) return td })
        .map(td => { return td.innerText }));

    console.log(data);


    await browser.close();
};


// scrapeStockList();


const scrapeStockData10 = async (stock) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://investidor10.com.br/acoes/${stock}`);

    const stockData = [];

    [el] = await page.$x('//*[@id="header_action"]/div[1]/div[2]/h2');
    const nameText = await el.getProperty('textContent');
    let nameValue = await nameText.jsonValue();
    stockData.push({
        name: 'NOME',
        value: nameValue
    });

    await page.waitForSelector("section[id='cards-ticker']");

    const header = await page.$$("._card");

    for (const item of header) {
        const attb = {
            name: "",
            value: "",
        };

        attb.name = await item.$$eval("div._card-header", (el) =>
            el.map((td) => td.textContent).at(0).replaceAll('\n', '')
        );

        attb.value = await item.$$eval("div._card-body", (el) =>
            el.map((td) => td.textContent).at(0).replaceAll('\n', '')
        );

        if (attb.name !== undefined || attb.value !== undefined) {
            stockData.push(attb);
        }
    }
    stockData.pop();

    await page.waitForSelector("div[id='table-indicators']");

    const table = await page.$$(".cell");

    for (const item of table) {
        const attb = {
            name: "",
            value: "",
        };

        attb.name = await item.$$eval("span.d-flex.justify-content-between.align-items-center.name", (el) =>
            el.map((td) => td.textContent).at(0)
        );

        attb.value = await item.$$eval("div.value", (el) =>
            el.map((td) => td.textContent).at(0)
        );

        if (attb.name !== undefined && attb.value !== undefined) {
            attb.name = attb.name.replaceAll('\n', '').trim();
            attb.value = attb.value.replaceAll('\n', '').trim();
            stockData.push(attb);
        }
    }

    await browser.close();

    stockObj = {}
    stockData.forEach(item => stockObj[item.name] = item.value)

    console.log(stockObj);
};

scrapeStockData10('bbas3');