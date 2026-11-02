const { expect } = require('@playwright/test');

class sortingPage
{
    constructor(page)
    {
        this.page = page;
        this.sortDropDown=page.locator('[data-test="product-sort-container"]');
        this.itemPrice = page.locator('[data-test = "inventory-item-price"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
    }

    async sortby(optionvalue)
    {
        await this.sortDropDown.selectOption(optionvalue);
    }
    async getAllProductPrices(){
        const priceTexts=await this.itemPrice.allTextContents();
        return priceTexts.map(priceText => parseFloat(priceText.replace('$', '')));
    }
    async getAllProductNAmes()
    {
        const itemNames= await this.itemNames.allTextContents();
        return itemNames;
    }
}

module.exports = {sortingPage:sortingPage};