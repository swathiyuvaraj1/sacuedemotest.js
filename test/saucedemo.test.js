const Utils = require("../Utilities/Utils.js");
const SauceDemo = require("../pages/saucedemo.page.js");

suite("Login test validations", () => {
  
  test("should login with valid username and password", async () => {
    await Utils.testDetailsForReport(
      "Positive",
      "Verify user can login with valid username and password",
      "Verify successful login"
    );
    const swagLabsTextPresent = await SauceDemo.verifySwagLabsText();
    expect(swagLabsTextPresent).toBeDisplayed();
    await SauceDemo.login('standard_user', 'secret_sauce');
    await SauceDemo.navigateToInventoryPage();
  });

  test("should logout successfully", async () => {
    await Utils.testDetailsForReport(
      "Positive",
      "Verify user can logout successfully",
      "Verify successful logout"
    );

    // Perform logout action using the logout function
    await SauceDemo.logout();

    // Verify logout success by checking the URL or elements on the login page
    await browser.waitUntil(async () => {
      return (await browser.getUrl()) === 'https://www.saucedemo.com/';
    }, { timeout: 10000, timeoutMsg: 'Failed to logout successfully' });
  });

  test("should not login with invalid username and password", async () => {
    await Utils.testDetailsForReport(
      "Negative",
      "Verify user can login with invalid username and password",
      "Verify unsuccessful login"
    );

    await SauceDemo.login('swathi', '12345678');

    // Find the error message element using the custom function and pass the error comment
    const errorMessageElement = await SauceDemo.findErrorMessage('Epic sadface: Username and password do not match any user in this service');

    // Wait for the error message element to be displayed
    await errorMessageElement.waitForExist({ timeout: 10000 });

    // Get the text of the error message
    const errorMessageText = await errorMessageElement.getText();

    // Add assertions to verify the error message
    expect(errorMessageText).toEqual('Epic sadface: Username and password do not match any user in this service');
    await browser.pause(5000);
  });

  test("should show error message for empty username", async () => {

    await browser.url('https://www.saucedemo.com');
    // Perform login action with empty username
    await SauceDemo.login('', 'secret_sauce');

    // Find the error message element for empty username
    const errorMessageElement = await SauceDemo.findErrorMessage('Epic sadface: Username is required');

    // Wait for the error message element to be displayed
    await errorMessageElement.waitForExist({ timeout: 10000 });

    // Get the text of the error message
    const errorMessageText = await errorMessageElement.getText();

    // Add assertions to verify the error message for empty username
    expect(errorMessageText).toEqual('Epic sadface: Username is required');
    await browser.pause(5000);
    
  });

  test("should show error message for empty password", async () => {

    await browser.url('https://www.saucedemo.com');
    // Perform login action with empty username
    await SauceDemo.login('standard_user', '');

    // Find the error message element for empty username
    const errorMessageElement = await SauceDemo.findErrorMessage('Epic sadface: Password is required');

    // Wait for the error message element to be displayed
    await errorMessageElement.waitForExist({ timeout: 10000 });

    // Get the text of the error message
    const errorMessageText = await errorMessageElement.getText();

    // Add assertions to verify the error message for empty username
    expect(errorMessageText).toEqual('Epic sadface: Password is required');
    await browser.pause(5000);
  });
});

