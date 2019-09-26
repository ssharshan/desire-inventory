import { element, by, ElementFinder } from 'protractor';

export class ProductDetailsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product-details div table .btn-danger'));
  title = element.all(by.css('jhi-product-details div h2#page-heading span')).first();

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

export class ProductDetailsUpdatePage {
  pageTitle = element(by.id('jhi-product-details-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  weightInput = element(by.id('field_weight'));
  mrpInput = element(by.id('field_mrp'));
  distributorPriceInput = element(by.id('field_distributorPrice'));
  distributorMarginInput = element(by.id('field_distributorMargin'));
  lotCountInput = element(by.id('field_lotCount'));
  availableInput = element(by.id('field_available'));
  shortcutInput = element(by.id('field_shortcut'));
  productSelect = element(by.id('field_product'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setWeightInput(weight) {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput() {
    return await this.weightInput.getAttribute('value');
  }

  async setMrpInput(mrp) {
    await this.mrpInput.sendKeys(mrp);
  }

  async getMrpInput() {
    return await this.mrpInput.getAttribute('value');
  }

  async setDistributorPriceInput(distributorPrice) {
    await this.distributorPriceInput.sendKeys(distributorPrice);
  }

  async getDistributorPriceInput() {
    return await this.distributorPriceInput.getAttribute('value');
  }

  async setDistributorMarginInput(distributorMargin) {
    await this.distributorMarginInput.sendKeys(distributorMargin);
  }

  async getDistributorMarginInput() {
    return await this.distributorMarginInput.getAttribute('value');
  }

  async setLotCountInput(lotCount) {
    await this.lotCountInput.sendKeys(lotCount);
  }

  async getLotCountInput() {
    return await this.lotCountInput.getAttribute('value');
  }

  async setAvailableInput(available) {
    await this.availableInput.sendKeys(available);
  }

  async getAvailableInput() {
    return await this.availableInput.getAttribute('value');
  }

  async setShortcutInput(shortcut) {
    await this.shortcutInput.sendKeys(shortcut);
  }

  async getShortcutInput() {
    return await this.shortcutInput.getAttribute('value');
  }

  async productSelectLastOption(timeout?: number) {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option) {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption() {
    return await this.productSelect.element(by.css('option:checked')).getText();
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

export class ProductDetailsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-productDetails-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-productDetails'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
