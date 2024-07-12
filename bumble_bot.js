const puppeteer = require('puppeteer');

(async () => {
    // Launch a new browser instance
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    // Open a new page
    const page = await browser.newPage();

    // Close the default about:blank tab
    const pages = await browser.pages();
    if (pages.length > 0) {
        await pages[0].close();
    }

    // Navigate to the Bumble connections page
    await page.goto('https://bumble.com/app/connections', { timeout: 60000, waitUntil: 'networkidle0' });
    
    // Wait for the button to appear and then click it
    try {
        await page.waitForSelector('button[aria-label="Accept All"]', { timeout: 10000 });
        await page.click('button[aria-label="Accept All"]');
        console.log('Clicked the "Accept All" button');
    } catch (error) {
        console.error('Could not find or click the "Accept All" button within the timeout.');
    }
})();
