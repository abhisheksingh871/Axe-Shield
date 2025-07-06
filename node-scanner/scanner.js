const puppeteer = require('puppeteer');
const fs = require('fs');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

(async () => {
    try {
        const url = process.argv[2];
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

        // Directly evaluate the axe-core source inside the page
        await page.evaluate(new Function(axeSource));

        const results = await page.evaluate(async () => {
            return await axe.run();
        });

        console.log(JSON.stringify(results));
        await browser.close();
    } catch (err) {
        console.error(JSON.stringify({ error: err.message }));
        process.exit(1);
    }
})();
