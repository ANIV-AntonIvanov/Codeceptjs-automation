exports.CodeceptObjectModel = class CodeceptObjectModel {

  constructor(I) {
    this.I = I
  }

  async functionTest() {
    this.I.amOnPage('https://www.ardes.bg/')
    this.I.wait(5)
    this.I.click('#cookies-accept')
    this.I.moveCursorTo('body > header > div.menu-banners-container > div > div > div > nav > ul > li:nth-child(4) > span')
    this.I.click('body > header > div.menu-banners-container > div > div > div > nav > ul > li:nth-child(4) > ul > li > div.secondary-list-items > a:nth-child(9)')
    let url = await this.I.grabCurrentUrl();
    this.I.click('#ajax_content > div:nth-child(1) > div.products-holder > div > div:nth-child(1) > div > div.product-head > a')
    let priceOne = parseInt(String(await this.I.grabTextFrom('#price-tag')))
    this.I.amOnPage(url)
    this.I.click('#ajax_content > div:nth-child(1) > div.products-holder > div > div:nth-child(2) > div > div.product-head > a')
    let priceTwo = parseInt(String(await this.I.grabTextFrom('#price-tag'))) 
    this.I.amOnPage(url)
    this.I.click('#ajax_content > div:nth-child(1) > div.products-holder > div > div:nth-child(3) > div > div.product-head > a')
    let priceThree = parseInt(String(await this.I.grabTextFrom('#price-tag')))
    let priceComparison = [priceOne, priceTwo, priceThree]

    for (let i = 0; i < priceComparison.length; i++) {
      let lowest = i
      for (let j = i + 1; j < priceComparison.length; j++) {
        if (priceComparison[j] < priceComparison[lowest]) {
          lowest = j
        }
      }
      if (lowest !== i) {
        // Swap
        ;[priceComparison[i], priceComparison[lowest]] = [priceComparison[lowest], priceComparison[i]]
      }
    }

    var fs = require('fs');
    var file = fs.createWriteStream('prices.txt');
    file.on('error', function (err) { Console.log(err) });
    priceComparison.forEach(value => file.write(`${value}\r\n`));
    file.end();
    pause()
  }
}
