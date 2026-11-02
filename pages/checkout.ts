import { expect, Locator, Page } from '@playwright/test';

export class checkoutPage
{
    readonly page:Page;
    readonly checkoutTitle:Locator;
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly postalCode:Locator;
    readonly continueButton:Locator;
    readonly checkoutsummarycontainer:Locator;
    readonly productincheckout:Locator;
    readonly finishButton:Locator;
    readonly completeHeader:Locator;
    readonly completetext:Locator;
    readonly checkOut:Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.checkoutTitle = page.locator('.title');
        this.firstName=page.getByPlaceholder('First Name');
        this.lastName=page.getByPlaceholder('Last Name');
        this.postalCode=page.getByPlaceholder('Zip/Postal Code');
        this.continueButton=page.locator('[data-test="continue"]');
        this.checkoutsummarycontainer=page.locator('[data-test="checkout-summary-container"]');
        this.productincheckout=this.checkoutsummarycontainer.locator('[data-test="inventory-item-name"]');
        this.finishButton=page.getByRole('button', { name: 'Finish' });
        this.completeHeader=page.locator('.complete-header');
        this.completetext=page.locator('.complete-text');
        this.checkOut=page.getByRole('button', {name:'Checkout'});
    }

    async checkOutTheCart():Promise<void>
    {
        await this.checkOut.click();
    }
    async assertCheckoutTitle(title:string):Promise<void>
    {
        await expect(this.checkoutTitle).toHaveText(title);
    }
    async fillCheckoutForm(firstname:string,lastname:string,postalcode:string):Promise<void>
    {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.postalCode.fill(postalcode);
        await this.continueButton.click();
    }
    getCheckoutOverviewTitle():Locator
    {
        return this.checkoutTitle;
    }
    async getProductsInCheckout():Promise<string[]>
    {
        return await this.productincheckout.allTextContents();
    }
    async finishCheckout():Promise<void>
    {
        await this.finishButton.click();
    }
    getCheckoutCompleteTitle()
    {
        return this.checkoutTitle;
    }
    async assertCheckoutComplete()
    {
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
        await expect(this.completetext).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }
    getErrorMessage(field:string):Locator
    {
        return this.page.locator('[data-test="error"]');
    }

    async assertErrorMessage(field:string) {
        const expectedMessages: Record<string, string> = {
            firstName: 'Error: First Name is required',
            lastName: 'Error: Last Name is required',
            postalCode: 'Error: Postal Code is required',
        };

        const expectedMessage = expectedMessages[field];

        if (!expectedMessage) {
            throw new Error(`Invalid field: ${field}`);
        }

        await expect(this.getErrorMessage(field)).toHaveText(expectedMessage);
    }
}
