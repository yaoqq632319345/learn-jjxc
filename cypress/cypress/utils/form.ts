export function setSelect(labelName: string, valueName?: string, className?: string) {
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
export function setCasc(labelName: string, valueName: string) {
  cy.contains(labelName).next().click();
  cy.wait(500);
  cy.get('.el-cascader-menu__list:visible').contains(valueName).prev().click();
}

export function setDate(labelName: string, valueName = 16) {
  cy.contains(labelName).next().click();
  cy.wait(800);
  cy.get('.el-picker-panel:visible').contains(valueName).click();
}
