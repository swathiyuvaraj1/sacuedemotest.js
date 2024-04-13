const config = require('../configurations/config.js');

class SauceDemo {
    get usernameInput() {
        return $("//input[@id='user-name']");
    }
  
    get passwordInput() {
        return $("//input[@id='password']");
    }
  
    get loginButton() {
        return $("//input[@id='login-button']");
    }
  
    get swaglabsText() {
        return $("//div[text()='Swag Labs']");
    }
  
    async verifySwagLabsText() {
        await this.swaglabsText.waitForExist({ timeout: 10000 });
        return await this.swaglabsText.isDisplayed();
    }
  
    async login(username = config.getCredentials().username, password = config.getCredentials().password) {
        if (!username && !password) {
          // Click the login button directly if both username and password are empty
          await this.loginButton.click();
          return;
      }
      if (username) {
          await this.usernameInput.setValue(username);
      }
      if (password) {
          await this.passwordInput.setValue(password);
      }
      await this.loginButton.click();
  }
  
    async findErrorMessage(errorMessage) {
      const xpath = `//h3[@data-test ='error' and contains(text(), '${errorMessage}')]`;
      return await $(xpath);
  }
  
  async logout() {
    // Click on the burger menu button
    await $('button#react-burger-menu-btn').click();
  
    // Click on the logout link in the menu
    await $('a=Logout').click();
  }
  
    async navigateToInventoryPage() {
        await browser.waitUntil(async () => {
            return (await browser.getUrl()) === 'https://www.saucedemo.com/inventory.html';
        }, { timeout: 10000, timeoutMsg: 'Failed to navigate to inventory page' });
    }
  }
  export default new SauceDemo();
  
  
  