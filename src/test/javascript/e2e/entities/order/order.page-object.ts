import { element, by, ElementFinder } from 'protractor';

export class OrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-order div table .btn-danger'));
  title = element.all(by.css('jhi-order div h2#page-heading span')).first();

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

export class OrderUpdatePage {
  pageTitle = element(by.id('jhi-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  amountInput = element(by.id('field_amount'));
  qtyInput = element(by.id('field_qty'));
  discountInput = element(by.id('field_discount'));
  productSelect = element(by.id('field_product'));
  invoiceSelect = element(by.id('field_invoice'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
  }

  async setQtyInput(qty) {
    await this.qtyInput.sendKeys(qty);
  }

  async getQtyInput() {
    return await this.qtyInput.getAttribute('value');
  }

  async setDiscountInput(discount) {
    await this.discountInput.sendKeys(discount);
  }

  async getDiscountInput() {
    return await this.discountInput.getAttribute('value');
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

  async invoiceSelectLastOption(timeout?: number) {
    await this.invoiceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async invoiceSelectOption(option) {
    await this.invoiceSelect.sendKeys(option);
  }

  getInvoiceSelect(): ElementFinder {
    return this.invoiceSelect;
  }

  async getInvoiceSelectedOption() {
    return await this.invoiceSelect.element(by.css('option:checked')).getText();
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

export class OrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-order-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-order'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
