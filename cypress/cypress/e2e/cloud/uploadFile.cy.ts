import { v4 as uuid } from 'uuid';
import { domain } from '../../utils/const';
import { cypressInit } from '../../utils/cy-init';
import { setCasc, setDate, setSelect } from '../../utils/form';
import { login } from '../../utils/login';
cypressInit();
describe('cloud', () => {
  it('file upload', async () => {
    cy.visit(domain);
    login();
    cy.visit(`${domain}/#/policy/policyPremiumBatchChange`);
    cy.wait(1000);
    cy.contains('取消').click();

    /**
     * 文件需要在fixtures目录下
     */
    const yourFixturePath = 'example.json';
    cy.get(':nth-child(2) > :nth-child(2) > .fileUpload').next().attachFile(yourFixturePath);
    setCasc('选择机构', '壹心中融');
    cy.contains('上传到服务器').click();
  });
});
