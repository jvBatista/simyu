const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');
const fs = require("fs");

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
}

const scrapeStockList = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.fundamentus.com.br/detalhes.php?papel=`);

    const results = await page.$$eval('table tr td', tds => tds
        .filter(td => { if (!td.cellIndex) return td })
        .map(td => { return td.innerText }));

    await browser.close();

    return results;
};

const url = 'https://investidor10.com.br/acoes/';

const getCompanyInfo = async (page) => {
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

const scrapeStocks = async () => {
    const stocks = [];
    const tickers = await scrapeStockList();
    console.log(tickers);

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 15,
    });

    await cluster.task(async ({ page, data }) => {
        console.log('Procurando ação: ' + data)
        const urls = [];

        const responseHandler = async (response) => {
            const url = response.url();

            if (url.includes('https://investidor10.com.br/api') && !url.includes('component')) {
                urls.push(url);
                // console.log(url);
            }
        };

        page.on('response', responseHandler);

        await page.goto(`${url}${data}`, {
            waitUntil: "load",
            timeout: 0,
        });

        const company_data = {
            ... await getCompanyInfo(page),
            ... await getCompanyIndicators(page)
        };

        await new Promise(resolve => setTimeout(resolve, 3000));

        page.off('response', responseHandler);

        const stockUrl = urls.find(url => url.includes('cotacao/ticker/'));
        const stock_id = typeof stockUrl != 'undefined' ? stockUrl.split('cotacao/ticker/')[1] : "";

        const companyUrl = urls.find(url => url.includes('receitaliquida/chart/'));
        const company_id = typeof companyUrl != 'undefined' ? companyUrl.split('receitaliquida/chart/')[1].split('/')[0] : "";

        // console.log(urls);
        if (stock_id || company_id) {
            stocks.push({
                ticker: data,
                stock_id,
                company_id,
                company_data
            });
            console.log('Dados de ' + data + ' adicionados')
        }
        else console.log('Não foram encontrados dados de ' + data)
    });

    for (const ticker of tickers) {
        cluster.queue(ticker);
        console.log('Enfileirou: ' + ticker)
    }

    await cluster.idle();
    await cluster.close();

    const data = JSON.stringify(stocks);

    fs.writeFile("stocks.json", data, (error) => {
        if (error) {
            console.error(error);
            throw error;
        }

        console.log("stocks.json written correctly");
    });

    /*
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
    */
}

// scrapeStocks();

const file = fs.readFileSync("stocks1.json");
const data = JSON.parse(file)
console.log(data.length)

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
*/