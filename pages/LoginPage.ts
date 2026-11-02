import { expect, Locator, Page }  from '@playwright/test';
import constants from '../data/constants';

export class LoginPage
{
    readonly page:Page;
    readonly Username:Locator;
    readonly Password:Locator;
    readonly LoginButton:Locator;
    readonly baseurl:string;

    constructor(page: Page)
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

    async Login(username:string,password:string):Promise<void>
    {
        await this.Username.fill(username);
        await this.Password.fill(password);
        await this.LoginButton.click();
    }

    async assertLoginSuccess():Promise<void>
    {
        await expect(this.page).toHaveURL(constants.url.inventoryPage);
        await expect(this.page.locator('.title')).toHaveText(constants.texts.productTitle);
    }
}
