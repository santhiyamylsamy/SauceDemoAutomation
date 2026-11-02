import { expect, Locator, Page } from '@playwright/test';

export class cartPage
{
    readonly page:Page;
    readonly cartContentContainer:Locator;
    readonly cartItems:Locator;
    readonly itemsInCart:Locator;   
    readonly cartLink:Locator;
    readonly checkOut:Locator;
    readonly checkoutTitle:Locator;
    readonly continueShoppingbutton:Locator;

    constructor(page: Page)
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
    async openCart():Promise<void>
    {
        await this.cartLink.click();
    }

    async getCartItems():Promise<string[]>
    {
        return await this.itemsInCart.allTextContents();
    }

    async checkOutTheCart():Promise<void>
    {
        await this.checkOut.click();
    }

    async assertCheckoutTitle(title:string):Promise<void>
    {
        await expect(this.checkoutTitle).toHaveText(title);
    }

    async removeItemFromCart(productName:string):Promise<void>
    {
       const cartItem = this.getProductCard(productName);
       await cartItem.getByRole('button', {name: 'Remove'}).click();
    }

    getProductCard(productName:string):Locator
    {
        return this.cartItems.filter({hasText: productName});
    }

    async continueShopping():Promise<void>
    {
        await this.continueShoppingbutton.click();
    }
}