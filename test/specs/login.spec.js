const { isExpression } = require("typescript")
const homePage = require("../pageobjects/home.page")
const loginPage = require("../pageobjects/login.page")
const mystorePage = require("../pageobjects/mystore.page")

let urlLoja = 'http://lojaebac.ebaconline.art.br/'
let usuario = 'gerente'
let senha = 'GD*peToHNJ1#c$sgk08EaYJQ'

describe('Acess Admin Panel', () => {
    it('should login with valid credentials', async () => {
        await homePage.goToLogin()
        await loginPage.setStoreAddress(urlLoja)
        await loginPage.continue()
        await loginPage.continueWithStoreCredentials()
        await loginPage.login(usuario,senha)
        await loginPage.goToTwoFactorAuth()
        await loginPage.twoFactorAuth(senha)
        
        expect(await mystorePage.myStoreLogoIsDisplayed()).toBeTruthy()
        expect(await mystorePage.getStoreName()).toEqual('EBAC - Shop')
    })
})