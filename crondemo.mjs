import { CronJob } from 'cron';
import puppeteer from 'puppeteer';

const job = new CronJob(
	'*/10 * * * * *', // cronTime
	async function () {
		const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);
	}, // onTick
	null, // onComplete
	true, // start
	'Asia/Ho_Chi_Minh' // timeZone
);


