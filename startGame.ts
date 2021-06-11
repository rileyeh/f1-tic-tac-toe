import { WebDriver, By } from "selenium-webdriver";

export const startGame = async (driver: WebDriver) => {
    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
}