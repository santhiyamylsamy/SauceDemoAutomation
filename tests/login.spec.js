// @ts-check
import { test, expect } from '@playwright/test';
const {LoginPage}= require('../pages/loginPage');
const users = require('../data/users');

/** @type {LoginPage} */
let loginpage;
test.beforeEach(async ({page})=>
{
loginpage = new LoginPage(page);
await loginpage.OpenLoginPage();
});

test('Verify the login is successful', async({ page }) => {
  await loginpage.Login(users.standardUser.username,users.standardUser.password);
  await loginpage.assertLoginSuccess();
});