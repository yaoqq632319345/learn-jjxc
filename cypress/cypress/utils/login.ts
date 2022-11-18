export async function login() {
  cy.get('input[name=mobile]').type('15888888888');
  cy.get('input[name=password]').type('280113');
  cy.get('input[placeholder=请输入手机验证码]').type('1111');
  cy.get('.login-btn').contains('登录').click();
}
