// 调用Cypress.commands.add('xxx') 需要ts声明扩展cy
declare namespace Cypress {
  interface cy {
    login: (...any) => void;
  }
}
