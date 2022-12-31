// import puppeteer from 'puppeteer-core';

// export const scrapeCDI = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.b3.com.br/pt_br/');

//     const [el] = await page.$x('//*[@id="taxaPct"]');
//     const text = await el.getProperty('textContent');
//     const taxValue = await text.jsonValue();

//     await browser.close();

//     return taxValue;
// };

const scrapeCDI = async () => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('https://www.b3.com.br/pt_br/');

    // const [el] = await page.$x('//*[@id="taxaPct"]');
    // const text = await el.getProperty('textContent');
    // const taxValue = await text.jsonValue();

    // await browser.close();

    // console.log(taxValue);

    const searchUrl = 'https://www.bcb.gov.br/';
    const response = await fetch(searchUrl);   // fetch page
    // const adress = await data.json();

    const htmlString = await response.text();
    console.log(htmlString);
};

scrapeCDI();

// 	//Taxa DI
// 	if('pt-br' === 'en-us') {
// 		$urlTaxaDI = "https://sistemaswebb3-balcao.b3.com.br/featuresDIProxy/DICall/GetRateDI/eyJsYW5ndWFnZSI6ImVuLXVzIn0=";
// 	} else {
// 		$urlTaxaDI = "https://sistemaswebb3-balcao.b3.com.br/featuresDIProxy/DICall/GetRateDI/eyJsYW5ndWFnZSI6InB0LWJyIn0=";
// 	}

// 	$.ajax({
// 		url: $urlTaxaDI
//     }).then(function(response) {
// 		var data =  JSON.parse(response);
// 		if('pt-br' === 'en-us') {
// 			var taxaData = new Date(Date.parse(data.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1/$2/$3")));
// 		} else {
// 			var taxaData = new Date(Date.parse(data.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")));
// 		}
// 		$('#taxaPct').text(data.rate+'%');
// 		$('#taxaData').text(taxaData.toLocaleString('pt-br',{ day: "2-digit", month: "2-digit"}))
//     });
