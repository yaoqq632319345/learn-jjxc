import { v4 as uuid } from 'uuid';
import { domain } from '../../utils/const';
import { cypressInit } from '../../utils/cy-init';
import { setCasc, setDate, setSelect } from '../../utils/form';
import { login } from '../../utils/login';

cypressInit();
describe('cloud', () => {
  it('Visits the Kitchen Sink', async () => {
    cy.visit(domain);
    login();
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
