module.exports = {
  dockerService: process.env.DOCKER_SERVICE,
  buildId: process.env.BUILD,

  siteURL: process.env.SITE_URL,
  loginEmailId: process.env.USER_EMAIL_ID,
  loginPassword: process.env.PASSWORD,
  invalidEmailId: "notanuser@test.com",
  invalidPassword: "invaliduser",
  emailPrefix: "wdio",
  pwdMismatch: "mismatch",
  invalidEmail: "test.user.com",
  validEmail: "test@user.com",

  getCredentials() {
    return {
      username: this.loginEmailId,
      password: this.loginPassword
    };
  }
};
