const { expect } = require('@playwright/test');
const constants = require('../data/constants');

class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.Username=page.getByPlaceholder('Username');
        this.Password=page.getByPlaceholder('Password');
        this.LoginButton=page.getByRole('button', { name: 'Login' });
        this.baseurl = process.env.BASE_URL;
    }

    async OpenLoginPage()
    {
        console.log('Opening the baseurl');
        await this.page.goto(this.baseurl);
        console.log('Baseurl opened successfully');
    }

    async Login(username,password)
    {
        await this.Username.fill(username);
        await this.Password.fill(password);
        await this.LoginButton.click();
    }

    async assertLoginSuccess()
    {
        await expect(this.page).toHaveURL(constants.url.inventoryPage);
        await expect(this.page.locator('.title')).toHaveText(constants.texts.productTitle);
    }
}


module.exports = {LoginPage:LoginPage};