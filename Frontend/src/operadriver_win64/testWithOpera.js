import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'; 

async function testLogin() {
    const service = new chrome.ServiceBuilder('src/operadriver_win64/operadriver.exe').build();
    chrome.setDefaultService(service);

    const driver = new Builder()
        .forBrowser('opera')
        .build();

    try {
        await driver.get('http://localhost:5173/login'); 
        await driver.findElement(By.name('email')).sendKeys('mohammed@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN); 

        await driver.wait(until.titleIs('Titre de la page après connexion'), 5000); 
    } finally {
        await driver.quit();
    }
}

testLogin();
