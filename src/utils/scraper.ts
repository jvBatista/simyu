const puppeteer = require("puppeteer");

export const scrapeCDI = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.b3.com.br/pt_br/');

    const [el] = await page.$x('//*[@id="taxaPct"]');
    const text = await el.getProperty('textContent');
    const taxValue = await text.jsonValue();

    await browser.close();

    return taxValue;
};