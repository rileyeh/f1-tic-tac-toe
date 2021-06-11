import { Builder, Capabilities, By } from "selenium-webdriver"
const chromedriver = require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

import {startGame} from './startGame'

beforeEach(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {
    await startGame(driver)    
});

test('Clicking top left square adds an X to that square', async () => {
    await startGame(driver)    
    let topLeftBox = await (await driver).findElement(By.id('cell-0'))
    await topLeftBox.click()
    let topLeftText = await topLeftBox.getText()
    await (await driver).sleep(2000)
    expect(topLeftText).toBe('X')
})

test('Cell 3 should not have a lowercase o', async () => {
    await startGame(driver)    
    let topLeftBox = await (await driver).findElement(By.id('cell-0'))
    await topLeftBox.click()
    let topRightBox = await (await driver).findElement(By.id('cell-2'))
    await topRightBox.click()
     
    let middleLeftText = await (await (await driver).findElement(By.id('cell-3'))).getText()

    expect(middleLeftText).toBe('O')
})

test('Computer places exactly 1 "O" after user move', async () => {
    await startGame(driver)

    await (await (await driver).findElement(By.id('cell-6'))).click()

    let oPlayed = 0

    for (let i = 0; i < 9; i++) {
        let currBoxText = await (await (await driver).findElement(By.id(`cell-${i}`))).getText()
        if (currBoxText.toUpperCase() === 'O') {
            oPlayed++
        }
    }

    expect(oPlayed).toBe(1)
})