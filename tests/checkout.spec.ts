import {expect, test} from '@playwright/test';
const {LoginPage} = require('../pages/loginPage');
const {checkoutPage} = require('../pages/checkout');
const users = require('../data/users');
const constants = require('../data/constants');
const {inventoryPage} = require('../pages/inventory');
const {cartPage} = require('../pages/cart');

let loginpage;
let checkoutpage;
let inventorypage;
let cartpage;
let context;
let page;

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
