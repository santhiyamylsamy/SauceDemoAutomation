import {expect, test} from '@playwright/test';
const {LoginPage} = require('../pages/loginPage');
const users = require('../data/users');
const {inventoryPage} = require('../pages/inventory');
const constants = require('../data/constants');
const {sortingPage} = require('../pages/sorting');

let loginpage;
let inventorypage;
let sortingpage;

test.beforeEach(async ({ page }) => {
    loginpage =new LoginPage(page);
    await loginpage.OpenLoginPage();
    await loginpage.Login(users.standardUser.username,users.standardUser.password);
    inventorypage = new inventoryPage(page);
    sortingpage = new sortingPage(page);
});


test('Verify the cart counts updateds when we add the items to the cart', async ({ page }) => {
    await inventorypage.addProductoCart(constants.texts.sauceLabsBackpack);
    await inventorypage.addProductoCart(constants.texts.sauceLabsBikeLight);
    const initialCartCount = await inventorypage.getCartCount();
    expect(initialCartCount).toBe(2);

});

test('verify the sorting of items based on price in ascending order is successful', async ( {page} ) =>
{

    await sortingpage.sortby(constants.sortOptions.priceAsc);
    const pricesAsc = await sortingpage.getAllProductPrices();
    const sortedprice = [...pricesAsc].sort((a, b) => a - b);
    expect(pricesAsc).toEqual(sortedprice);

});

test('Verify the sorting of items based on price in descending order is successful', async ( {page} ) =>
{
    await sortingpage.sortby(constants.sortOptions.priceDesc);
    const pricedsc= await sortingpage.getAllProductPrices();
    const sortedprice =[...pricedsc].sort((a,b)=>b-a);
    expect(pricedsc).toEqual(sortedprice);

});

test('verify the sorting of items based on name in ascending order is successful', async ( {page} ) =>
{
    await sortingpage.sortby(constants.sortOptions.nameAsc);
    const namesAsc = await sortingpage.getAllProductNAmes();
    const sortedNames = [...namesAsc].sort();
    expect(namesAsc).toEqual(sortedNames);
});

test('verify the sorting of items based on name in descending order is successful', async ( {page} ) =>
{
    await sortingpage.sortby(constants.sortOptions.nameDesc);
    const desc= await sortingpage.getAllProductNAmes();
    const sortedNames = [...desc].sort().reverse();
    expect(desc).toEqual(sortedNames);
});