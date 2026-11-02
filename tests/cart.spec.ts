import {expect, test} from '@playwright/test';
const {LoginPage} = require('../pages/loginPage');
const users = require('../data/users');
const {inventoryPage} = require('../pages/inventory');
const constants = require('../data/constants');
const {cartPage}=require('../pages/cart');

let loginpage;
let inventorypage;
let cartpage;

test.beforeEach(async ({ page }) => {
    loginpage =new LoginPage(page);
    await loginpage.OpenLoginPage();
    await loginpage.Login(users.standardUser.username,users.standardUser.password);
    inventorypage = new inventoryPage(page);
    cartpage = new cartPage(page);
    await inventorypage.addProductoCart(constants.texts.sauceLabsBackpack);
    await inventorypage.addProductoCart(constants.texts.sauceLabsBikeLight);
});

test('Verify if the added items are present in the cart', async ({ page }) => {
    await cartpage.openCart();
    const cartItems = await cartpage.getCartItems();
    expect(cartItems).toContain(constants.texts.sauceLabsBackpack);
    expect(cartItems).toContain(constants.texts.sauceLabsBikeLight);
});

test('Verify if the remove button removes the item from the cart successfully', async ({ page }) => {
    await cartpage.openCart();
    await cartpage.removeItemFromCart(constants.texts.sauceLabsBackpack);
    const cartItems = await cartpage.getCartItems();
    expect(cartItems).not.toContain(constants.texts.sauceLabsBackpack);
    const cartCount=await inventorypage.getCartCount();
    expect(cartCount).toBe(1);
});

test('Verify if the checkout button navigates to the checkout page', async ({ page }) => {
    await cartpage.openCart();
    await cartpage.checkOutTheCart();
    await cartpage.assertCheckoutTitle(constants.texts.checkouttitle);
    await expect(page).toHaveURL(constants.url.checkoutPage);
});

test('verify if clicking continue shopping button navigates back to the inventory page', async ({ page }) => {
    await cartpage.openCart();
    await cartpage.continueShopping();
    await inventorypage.assertInventoryPage();
});