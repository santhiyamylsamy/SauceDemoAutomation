import { Locator, Page}  from '@playwright/test';

export class sortingPage
{
    readonly page:Page;
    readonly sortDropDown:Locator;
    readonly itemPrice:Locator;
    readonly itemNames:Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.sortDropDown=page.locator('[data-test="product-sort-container"]');
        this.itemPrice = page.locator('[data-test = "inventory-item-price"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
    }

    async sortby(optionvalue:string):Promise<void>
    {
        await this.sortDropDown.selectOption(optionvalue);
    }
    async getAllProductPrices():Promise<number[]>{
        const priceTexts=await this.itemPrice.allTextContents();
        return priceTexts.map(priceText => parseFloat(priceText.replace('$', '')));
    }
    async getAllProductNAmes():Promise<string[]>
    {
        const itemNames= await this.itemNames.allTextContents();
        return itemNames;
    }
}

