import { v4 as uuid } from 'uuid';
function setSelect(labelName: string, valueName?: string, className?: string) {
  if (className) {
    cy.get(className).contains(labelName).next().click();
  } else {
    cy.contains(labelName).next().click();
  }
  cy.wait(500);
  if (valueName) {
    cy.get('li:visible').contains(valueName).click();
  } else {
    cy.get('.el-select-dropdown__list li:visible').first().click();
  }
}
function setCasc(labelName: string, valueName: string) {
  cy.contains(labelName).next().click();
  cy.wait(500);
  cy.get('.el-cascader-menu__list:visible').contains(valueName).prev().click();
}

function setDate(labelName: string, valueName = 16) {
  cy.contains(labelName).next().click();
  cy.wait(800);
  cy.get('.el-picker-panel:visible').contains(valueName).click();
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

async function getCookie() {
  return new Promise((resolve) => {
    cy.getCookie('d2admin-1.20.1-ticket').then((cookies) => {
      if (cookies?.value) {
        resolve(cookies.value);
      } else {
        resolve(null);
      }
    });
  });
}

const domain = 'http://localhost:8080';
describe('cloud', () => {
  it('Visits the Kitchen Sink', async () => {
    cy.visit(domain);
    const res = await getCookie();
    if (!res) {
      await login();
    }
    cy.visit(`${domain}/#/policy/policyEntry`);
    cy.wait(1000);
    cy.contains('取消').click();
    setSelect('供应商名称', '信泰人寿保险');
    setSelect('保险公司名称', '信泰人寿保险');
    setSelect('保单类型', '个险');
    setSelect('业务类型', '网销件');

    cy.contains('投保单号').next().find('input').type(uuid());
    cy.get('label[for="policyCode"').next().find('input').type(uuid());

    setDate('承保日期');
    setDate('生效日期');

    setCasc('管理机构', '壹心中融');

    // 投保人资料
    setSelect('投保人类型', '自然人');
    cy.contains('投保人姓名').next().find('input').type('投保人姓名');
    cy.contains('手机号码').next().find('input').type('15888888888');
    setDate('出生日期');
    setSelect('性别', '男', '.is-required');
    setSelect('证件类型', '身份证', '.is-required');
    cy.get('.is-required').contains('证件号码').next().find('input').type('证件号码');
    setSelect('与主被保险人关系', '本人');
    cy.contains('联系地址').next().find('textarea').type('联系地址');

    cy.contains('同投保人').click();
    const Insurance = cy.contains('险种资料').parent().parent().parent().parent();
    Insurance.contains('添加').click();
    setSelect('产品名称');
    setSelect('险种名称', '赛博朋克2019');
    cy.get('label[for="insuredUuid"]').next().click();
    cy.wait(800);
    cy.get('.el-select-dropdown__list li:visible').first().click();
    setSelect('保障期限类型');
    setSelect('缴费期限类型');
    cy.get('label[for="premium"]').next().find('input').type('100');
    cy.get('label[for="amount"]').next().find('input').type('100');
    cy.get('label[for="payPeriod"]').next().find('input').type('100');
    setSelect('缴费方式');

    // 缴费信息
    setSelect('首期付款方式');
    setSelect('续期付款方式');
    setSelect('开户行');
    cy.contains('银行账号').next().find('input').type('10000000000000000000000');
    cy.contains('开户人').next().find('input').type('开户人');
  });
});
async function login() {
  return new Promise((res) => {
    cy.get('input[name=mobile]').type('15888888888');
    cy.get('input[name=password]').type('280113');
    cy.get('input[placeholder=请输入手机验证码]').type('1111');
    cy.get('.login-btn').contains('登录').click();

    res(null);
  });
}
