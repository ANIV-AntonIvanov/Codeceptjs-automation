const { CodeceptObjectModel } = require("./codeceptObjectModel");

Feature('login');

Scenario.only('test something', async ({ I }) => {

    const testObj = new CodeceptObjectModel(I)
    await testObj.functionTest()
});

Scenario.skip('login', ({ I }) => {
    I.amOnPage('https://saucedemo.com/')
    I.fillField('#user-name', 'standard_user')
    I.fillField('#password', 'secret_sauce')
    I.pressKey('Enter')
    I.seeElement('#header_container > div.header_secondary_container > div > span > select')
    I.selectOption({ css: '#header_container > div.header_secondary_container > div > span > select' }, 'Price (low to high)')
    pause()
})


//#part-selection-12 > ul > li:nth-child(48) > a > span > span.part-select-option-title