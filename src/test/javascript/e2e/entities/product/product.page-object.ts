import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
  title = element.all(by.css('jhi-product div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  shortcutInput = element(by.id('field_shortcut'));
  cgstInput = element(by.id('field_cgst'));
  sgstInput = element(by.id('field_sgst'));
  hsnInput = element(by.id('field_hsn'));
  companySelect = element(by.id('field_company'));
  categorySelect = element(by.id('field_category'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setShortcutInput(shortcut) {
    await this.shortcutInput.sendKeys(shortcut);
  }

  async getShortcutInput() {
    return await this.shortcutInput.getAttribute('value');
  }

  async setCgstInput(cgst) {
    await this.cgstInput.sendKeys(cgst);
  }

  async getCgstInput() {
    return await this.cgstInput.getAttribute('value');
  }

  async setSgstInput(sgst) {
    await this.sgstInput.sendKeys(sgst);
  }

  async getSgstInput() {
    return await this.sgstInput.getAttribute('value');
  }

  async setHsnInput(hsn) {
    await this.hsnInput.sendKeys(hsn);
  }

  async getHsnInput() {
    return await this.hsnInput.getAttribute('value');
  }

  async companySelectLastOption(timeout?: number) {
    await this.companySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect(): ElementFinder {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return await this.companySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption(timeout?: number) {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categorySelectOption(option) {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect(): ElementFinder {
    return this.categorySelect;
  }

  async getCategorySelectedOption() {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
