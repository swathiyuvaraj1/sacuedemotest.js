const Utils = require("../Utilities/Utils.js");
//const config = require('.configurations/config.js');
const SauceDemo = require("../pages/saucedemo.page.js");

suite("Login test validations", () => {
  before(async () => {
    await Utils.launchSite("https://www.saucedemo.com/");
    //await Utils.launchSite(config.baseUrl);
    const swagLabsTextPresent = await SauceDemo.verifySwagLabsText();
    expect(swagLabsTextPresent).to.be.true;
  });
  test("should login with valid username and password", async () => {
    await Utils.testDetailsForReport(
      "Positive",
      "Verify user can login with valid username and password",
      "Verify successful login"
    );
    await SauceDemo.login('standard_user', 'secret_sauce');
    await SauceDemo.navigateToInventoryPage();
    // Add assertions here to verify the successful login and navigation
  });

  test("should logout successfully", async () => {
    await Utils.testDetailsForReport(
      "Positive",
      "Verify user can logout successfully",
      "Verify successful logout"
    );
    // Perform login action before logging out
    await SauceDemo.login('standard_user', 'secret_sauce');
    await SauceDemo.navigateToInventoryPage();

    // Perform logout action using the logout function
    await SauceDemo.logout();

    // Verify logout success by checking the URL or elements on the login page
    await browser.waitUntil(async () => {
      return (await browser.getUrl()) === 'https://www.saucedemo.com/';
    }, { timeout: 10000, timeoutMsg: 'Failed to logout successfully' });

    // Add assertions here to verify logout success
    // For example:
    // assert that login button is displayed on the login page
    await expect(SauceDemo.loginButton).to.exist;
  });

  test("should not login with invalid username and password", async () => {
    await Utils.testDetailsForReport(
      "Negative",
      "Verify user can login with invalid username and password",
      "Verify unsuccessful login"
    );

    await SauceDemo.login('swathi', '12345678');

    // Find the error message element using the custom function and pass the error comment
    const errorMessageElement = await Utils.findErrorMessage('Epic sadface: Username and password do not match any user in this service');

    // Wait for the error message element to be displayed
    await errorMessageElement.waitForExist({ timeout: 10000 });

    // Get the text of the error message
    const errorMessageText = await errorMessageElement.getText();

    // Add assertions to verify the error message
    expect(errorMessageText).to.include('Epic sadface: Username and password do not match any user in this service');
  });

  test("should show error message for empty username", async () => {
    // Perform login action with empty username
    await SauceDemo.login('', 'secret_sauce');

    // Find the error message element for empty username
    const errorMessageElement = await SauceDemo.findErrorMessage('Epic sadface: Username is required');

    // Wait for the error message element to be displayed
    await errorMessageElement.waitForExist({ timeout: 10000 });

    // Get the text of the error message
    const errorMessageText = await errorMessageElement.getText();

    // Add assertions to verify the error message for empty username
    expect(errorMessageText).to.include('Epic sadface: Username is required');
  });

  test("should show error message for empty password", async () => {
    // Perform login action with empty username
    await SauceDemo.login('standard_user', '');

    // Find the error message element for empty username
    const errorMessageElement = await SauceDemo.findErrorMessage('Epic sadface: Password is required');

    // Wait for the error message element to be displayed
    await errorMessageElement.waitForExist({ timeout: 10000 });

    // Get the text of the error message
    const errorMessageText = await errorMessageElement.getText();

    // Add assertions to verify the error message for empty username
    expect(errorMessageText).to.include('Epic sadface: Password is required');
  });
});

