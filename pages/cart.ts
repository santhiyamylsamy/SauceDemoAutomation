const { expect } = require('@playwright/test');

class cartPage
{
    constructor(page)
    {
        this.page =page;
        this.cartContentContainer=page.locator('[data-test="cart-contents-container"]');
        this.cartItems=this.cartContentContainer.locator('[data-test="inventory-item"]');
        this.itemsInCart=this.cartItems.locator('[data-test="inventory-item-name"]');
        this.cartLink=page.locator('[data-test="shopping-cart-link"]');
        this.checkOut=page.getByRole('button', {name:'Checkout'});
        this.checkoutTitle=page.locator('.title');
        this.continueShoppingbutton=page.getByRole('button', {name:'Continue Shopping'});
    }
    async openCart()
    {
        await this.cartLink.click();
    }

    async getCartItems()
    {
        return await this.itemsInCart.allTextContents();
    }

    async checkOutTheCart()
    {
        await this.checkOut.click();
    }

    async assertCheckoutTitle(title)
    {
        await expect(this.checkoutTitle).toHaveText(title);
    }

    async removeItemFromCart(productName)
    {
       const cartItem = this.getProductCard(productName);
       await cartItem.getByRole('button', {name: 'Remove'}).click();
    }

    getProductCard(productName)
    {
        return this.cartItems.filter({hasText: productName});
    }

    async continueShopping()
    {
        await this.continueShoppingbutton.click();
    }
}


module.exports = {cartPage:cartPage};