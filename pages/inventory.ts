import { expect, Locator, Page}  from '@playwright/test';
import constants from '../data/constants';

export class inventoryPage
{
    readonly page:Page;
    readonly cartBadge:Locator;
    readonly inventoryItems:Locator;

    constructor(page: Page)
    {
        this.page =page;
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.inventoryItems=page.locator('.inventory_item');
    }

    getProductCard(productName:string)
    {
        return this.inventoryItems.filter({hasText: productName});
    }


    async addProductoCart(productName:string)
    {
        const product = this.getProductCard(productName);
        await product.getByRole('button', {name: 'Add to cart'}).click();
    }

    async getCartCount():Promise<number>
    {
        const hasBadge = await this.cartBadge.count();
        if (hasBadge === 0) return 0;
        return parseInt(await this.cartBadge.innerText(), 10);
    }

    async assertInventoryPage():Promise<void>
    {
        await expect(this.page.locator('.title')).toHaveText(constants.texts.productTitle);
        await expect(this.page).toHaveURL(constants.url.inventoryPage);
    }
}
