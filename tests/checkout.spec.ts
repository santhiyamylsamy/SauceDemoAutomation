import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {checkoutPage} from '../pages/checkout';
import * as users from '../data/users';
import *as constants from '../data/constants';
import {inventoryPage} from '../pages/inventory';
import {cartPage} from '../pages/cart';

let loginpage:any;
let checkoutpage:any;
let inventorypage:any;
let cartpage:any;
let context:any;
let page:any;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginpage = new LoginPage(page);
    checkoutpage = new checkoutPage(page);
    inventorypage = new inventoryPage(page);
    cartpage = new cartPage(page);
    await loginpage.OpenLoginPage();
    await loginpage.Login(users.standardUser.username, users.standardUser.password);
    await inventorypage.addProductoCart(constants.texts.sauceLabsBackpack);
    await inventorypage.addProductoCart(constants.texts.sauceLabsBikeLight);
    await cartpage.openCart();
    await cartpage.checkOutTheCart();
});

test.afterAll(async () => {
    await context.close();
});

test('Verify the error message is displayed when the checkout form is submitted with all empty fields', async() => {
    await checkoutpage.fillCheckoutForm('', constants.texts.lastName, constants.texts.zipCode);
    await checkoutpage.assertErrorMessage('firstName');

});

test('Verify the error message is displayed when the checkout form is submitted with empty last name field', async() => {
    await checkoutpage.fillCheckoutForm(constants.texts.firstName, '', constants.texts.zipCode);
    await checkoutpage.assertErrorMessage('lastName');
});

test('Verify the error message is displayed when the checkout form is submitted with empty postal code field', async() => {
    await checkoutpage.fillCheckoutForm(constants.texts.firstName, constants.texts.lastName, '');
    await checkoutpage.assertErrorMessage('postalCode');
});

test('Checkout process', async() => {
    await checkoutpage.fillCheckoutForm(constants.texts.firstName, constants.texts.lastName, constants.texts.zipCode);
    await expect(checkoutpage.getCheckoutOverviewTitle()).toHaveText(constants.texts.checkoutOverviewTitle);
    await expect(page).toHaveURL(constants.url.checkoutOverviewPage);

});

test('Verify the checkout complete page is displayed after finishing the checkout process', async() => {
    await checkoutpage.finishCheckout();
    await expect(page).toHaveURL(constants.url.checkoutCompletePage);
    await expect(checkoutpage.getCheckoutCompleteTitle()).toHaveText(constants.texts.checkoutCompleteTitle);
    await checkoutpage.assertCheckoutComplete();
});
