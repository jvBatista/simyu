const puppeteer = require('puppeteer');

const scrapeSubjects = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://sigaa.unb.br/sigaa/public/turmas/listar.jsf`);

    await page.select('select[name="formTurma:inputNivel"]', 'G');
    await page.select('select[name="formTurma:inputDepto"]', '673');

    await page.$eval('#formTurma > table > tfoot > tr > td > input[type=submit]:nth-child(1)', form => form.click());

    // await page.waitForSelector('#turmasAbertas');

    // const subjects = await page.evaluate(() => {
    //     const subjects = [];

    //     const rows = Array.from(document.querySelectorAll('#turmasAbertas > table > tbody > tr'));
    //     rows.map(row => {
    //         const subjNames = Array.from(row.querySelectorAll('span.tituloDisciplina'));

    //         if (subjNames.length) {
    //             [id, title] = subjNames.map(column => column.innerText)[0].split(' - ');
    //             subjects.push({ id, title });
    //         }
    //         else {
    //             const lastIndex = subjects.length - 1;

    //             subjects[lastIndex].class = row.querySelector("td.turma").innerText;
    //             subjects[lastIndex].schedule = row.querySelector("div.popUp").innerText.trim();

    //             [ professor, hourLoad ] = row.querySelector("td.nome").innerText.split(' (');
    //             subjects[lastIndex].professor = professor;
    //             subjects[lastIndex].hourLoad = hourLoad.replace(')', '');

    //             subjects[lastIndex].vacancies = {};
    //             subjects[lastIndex].vacancies.total = row.querySelector("td:nth-child(6)").innerText;
    //             subjects[lastIndex].vacancies.occupied = row.querySelector("td:nth-child(7)").innerText;
    //         }
    //     });

    //     return subjects;
    // });

    await page.waitForSelector("div[id='rodape']");

    const table = await page.$$(".listagem > tbody > tr");

    const subjects = [];

    for (const row of table) {
        // const subject = {
        //     name: "unavailable",
        //     code: "unavailable",
        //     semester: "unavailable",
        //     classes: [
        //         {
        //             class: "unavailable",
        //             professor: "unavailable",
        //             location: "unavailable",
        //             schedule: ["unavailable"],
        //             simplifiedSchedule: ["unavailable"],
        //             vacancies: {
        //                 total: "unavailable",
        //                 occupied: "unavailable"
        //             }
        //         }
        //     ]
        // };

        const title = await row.$$eval("span.tituloDisciplina", (el) =>
            el.map((td) => td.textContent)
        );

        if (title.length) subjects.push({ name: title, classes: [] });
        else {
            const classe = {
                vacancies: {}
            };

            classe.number = await row.$$eval("td.turma", (el) =>
                el.map((td) => td.textContent)
            );

            classe.semester = await row.$$eval("td.anoPeriodo", (el) =>
                el.map((td) => td.textContent)
            );

            classe.vacancies.total = await row.$$eval("td:nth-child(6)", (el) =>
                el.map((td) => td.textContent)
            );

            classe.vacancies.occupied = await row.$$eval("td:nth-child(7)", (el) =>
                el.map((td) => td.textContent)
            );

            classe.professor = await row.$$eval("td.nome", (el) =>
                el.map((td) => td.textContent)
            );

            classe.location = await row.$$eval("td[nowrap=nowrap]", (el) =>
                el.map((td) => td.textContent)
            );

            classe.schedule = await row.$$eval("div.popUp", (el) =>
                el.map((td) => td.textContent)
            );

            const lastIndex = subjects.length - 1;
            subjects[lastIndex].classes.push(classe);
        }


        // subjects.push(subject);
    }

    // subjects.forEach((subject, index) => {
    //     if (subject.name.length === 0) {
    //         subject.name = subjects[index - 1].name;
    //     }
    // });

    const filteredsubjects = subjects
        .map((subject) => {
            if (subject.classes.length) {
                [code, title] = subject.name.toString().split(" - ");

                subject.name = title;
                subject.code = code;

                const hourLoad = subject.classes[0].professor.toString().split(" (")[1];
                subject.hourLoad = parseInt(hourLoad.replace("h)", "").toString());

                subject.classes.forEach(classe => {
                    if (classe.schedule.length > 0) {
                        classe.schedule = classe.schedule[0]
                            .replace(/(\t\n|\n|\t)/gm, "")
                            .trim()
                            .split(/(?=[A-Z])/);

                        const simplifiedSchedule = [];

                        if (classe.schedule[0].length > 0) {
                            classe.schedule.forEach(schedule => {
                                const day = schedule.split(' ')[0];
                                let start = schedule.split(' ')[1];
                                let end = schedule.split(' ')[3];

                                start = `${start.split(':')[0]}:00`;
                                end = `${end.split(':')[0]}:00`;

                                const hoursBetween = [];

                                for (let i = parseInt(start.split(':')[0]); i <= parseInt(end.split(':')[0]); i++) {
                                    hoursBetween.push(`${i}:00`);
                                }

                                hoursBetween.forEach(hour => {
                                    simplifiedSchedule.push(`${day} ${hour}`);
                                });
                            })

                            classe.simplifiedSchedule = simplifiedSchedule;
                        }
                    }

                    classe.professor = classe.professor
                        .toString()
                        .split(" (")[0]
                        .trim();
                    classe.number = classe.number.toString().trim();
                    classe.semester = classe.semester.toString().trim();
                    classe.location = classe.location.toString().trim();
                    classe.vacancies.total = parseInt(classe.vacancies.total[0].toString().trim());
                    classe.vacancies.occupied = parseInt(classe.vacancies.occupied[0].toString().trim());
                })

                return subject;
            }
        })
        .filter(subject => subject !== undefined);

    await browser.close();

    // console.log(subjects[0]);
    console.log(filteredsubjects[0].classes[0]);
};

scrapeSubjects();