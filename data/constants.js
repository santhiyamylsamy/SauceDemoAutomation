const { faker } = require('@faker-js/faker');
module.exports = {
    url:
    {
        inventoryPage:'https://www.saucedemo.com/inventory.html',
        checkoutPage:'https://www.saucedemo.com/checkout-step-one.html',
        checkoutOverviewPage:'https://www.saucedemo.com/checkout-step-two.html',
        checkoutCompletePage:'https://www.saucedemo.com/checkout-complete.html'
    },

    texts:
    {
        productTitle: 'Products',
        sauceLabsBackpack: 'Sauce Labs Backpack',
        sauceLabsBikeLight: 'Sauce Labs Bike Light',
        checkouttitle: 'Checkout: Your Information',
        checkoutOverviewTitle: 'Checkout: Overview',
        checkoutCompleteTitle: 'Checkout: Complete!',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        zipCode: faker.location.zipCode()
    },
    sortOptions:
    {
    nameAsc:'az',
    nameDesc:'za',
    priceAsc:'lohi',
    priceDesc:'hilo'
    }
};