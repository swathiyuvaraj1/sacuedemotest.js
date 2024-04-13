const config = require('../configurations/config.js');

class SauceDemo {
    get usernameInput() {
        return $("//input[@id='user-name']");
    }
  
    get passwordInput() {
        return $("//input[@id='password']");
    }
  
    get loginButton() {
        return $("//input[@id='login-button' and contains(text(),Login)]");
    }
  
    get swaglabsText() {
        return $("//div[@class='login_logo' and contains(text(),'Swag Labs')]");
    }
  
    async verifySwagLabsText() {
        await this.swaglabsText.waitForExist({ timeout: 10000 });
        return await this.swaglabsText.isDisplayed();
    }
      
    async login(username, password) {
        // If username and password are not provided, use the default credentials from the configuration
        if (!username && !password) {
            username = config.getCredentials().username;
            password = config.getCredentials().password;
        }
        
        // If both username and password are provided, set them and click login
       else if (username && password) {
            await this.usernameInput.setValue(username);
            await this.passwordInput.setValue(password);
            await this.loginButton.click();
        }
        // If only username is provided, set it and click login
        else if (username && !password) {
            await this.usernameInput.setValue(username);
            await this.loginButton.click();
        }
        // If only password is provided, set it and click login
        else if (!username && password) {
            await this.passwordInput.setValue(password);
            await this.loginButton.click();
        }
        // If neither username nor password is provided, click login directly
        else {
            await this.loginButton.click();
        }
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
  module.exports = new SauceDemo();
  
  
  