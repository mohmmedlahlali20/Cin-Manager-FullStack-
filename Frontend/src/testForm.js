import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

(async function testForm() {
    let options = new chrome.Options();
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('http://localhost:5173/login');
        await driver.sleep(5000)

        let pageSource = await driver.getPageSource();


        await driver.wait(until.elementLocated(By.id('email')), 10000);
        let emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('mohmmedlaeh81@gmail.com');

        await driver.wait(until.elementLocated(By.id('password')), 10000);
        let passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('password123');

        await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
        let submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();


        console.log('Test réussi!');
    } catch (error) {
        console.error('Erreur lors du test:', error);
    } finally {
        await driver.quit();
    }
})();
