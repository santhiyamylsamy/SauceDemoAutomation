const { expect } = require('@playwright/test');
const constants = require('../data/constants');
class inventoryPage
{
    constructor(page)
    {
        this.page =page;
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.inventoryItems=page.locator('.inventory_item');
    }

    getProductCard(productName)
    {
        return this.inventoryItems.filter({hasText: productName});
    }


    async addProductoCart(productName)
    {
        const product = this.getProductCard(productName);
        await product.getByRole('button', {name: 'Add to cart'}).click();
    }

    async getCartCount()
    {
        const hasBadge = await this.cartBadge.count();
        if (hasBadge === 0) return 0;
        return parseInt(await this.cartBadge.innerText(), 10);
    }

    async assertInventoryPage()
    {
        await expect(this.page.locator('.title')).toHaveText(constants.texts.productTitle);
        await expect(this.page).toHaveURL(constants.url.inventoryPage);
    }
}

module.exports = {inventoryPage:inventoryPage};