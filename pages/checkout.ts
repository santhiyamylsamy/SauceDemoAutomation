const { expect } = require('@playwright/test');

class checkoutPage
{
    constructor(page)
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
    }

    async checkOutTheCart()
    {
        await this.checkOut.click();
    }
    async assertCheckoutTitle(title)
    {
        await expect(this.checkoutTitle).toHaveText(title);
    }
    async fillCheckoutForm(firstname,lastname,postalcode)
    {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.postalCode.fill(postalcode);
        await this.continueButton.click();
    }
    getCheckoutOverviewTitle()
    {
        return this.checkoutTitle;
    }
    async getProductsInCheckout()
    {
        return await this.productincheckout.allTextContents();
    }
    async finishCheckout()
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
    getErrorMessage(field)
    {
        return this.page.locator('[data-test="error"]');
    }

    async assertErrorMessage(field) {
        const expectedMessages = {
            firstName: 'Error: First Name is required',
            lastName: 'Error: Last Name is required',
            postalCode: 'Error: Postal Code is required',
        };

        const expectedMessage = expectedMessages[field];

        if (!expectedMessage) {
            throw new Error(`Invalid field: ${field}`);
        }

        await expect(this.getErrorMessage()).toHaveText(expectedMessage);
    }
}
module.exports = {checkoutPage:checkoutPage};