class LoginPage {
    get #storeAddress() {
        return $('id:input')
    }

    get #continue() {
        return $('id:bottom_button')
    }

    get #continueWithStoreCredentials() {
        return $('id:login_site_creds')
    }

    get #username() {
        return $('android=new UiSelector().text("Username")')
    }

    get #password() {
        return $('android=new UiSelector().text("Password")')
    }

    get #orTypeYourPassword() {
        return $('id:login_enter_password')
    }

    async setStoreAddress (url) {
        this.#storeAddress.setValue(url)
    }

    async continue() {
        await this.#continue.isEnabled()
        await this.#continue.click()
    }

    async continueWithStoreCredentials() {
        await this.#continueWithStoreCredentials.click()
    }

    async login(username, password) {
        await this.#username.setValue(username)
        await this.#password.setValue(password)
        await this.#continue.click()
    }

    async goToTwoFactorAuth() {
        await this.#orTypeYourPassword.click()
    }

    async twoFactorAuth(password) {
        await this.#password.setValue(password)
        await this.#continue.click()
    }
}

module.exports = new LoginPage()