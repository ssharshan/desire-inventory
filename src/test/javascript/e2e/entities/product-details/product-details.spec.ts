// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductDetailsComponentsPage, ProductDetailsDeleteDialog, ProductDetailsUpdatePage } from './product-details.page-object';

const expect = chai.expect;

describe('ProductDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productDetailsUpdatePage: ProductDetailsUpdatePage;
  let productDetailsComponentsPage: ProductDetailsComponentsPage;
  let productDetailsDeleteDialog: ProductDetailsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductDetails', async () => {
    await navBarPage.goToEntity('product-details');
    productDetailsComponentsPage = new ProductDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(productDetailsComponentsPage.title), 5000);
    expect(await productDetailsComponentsPage.getTitle()).to.eq('diInventoryApp.productDetails.home.title');
  });

  it('should load create ProductDetails page', async () => {
    await productDetailsComponentsPage.clickOnCreateButton();
    productDetailsUpdatePage = new ProductDetailsUpdatePage();
    expect(await productDetailsUpdatePage.getPageTitle()).to.eq('diInventoryApp.productDetails.home.createOrEditLabel');
    await productDetailsUpdatePage.cancel();
  });

  it('should create and save ProductDetails', async () => {
    const nbButtonsBeforeCreate = await productDetailsComponentsPage.countDeleteButtons();

    await productDetailsComponentsPage.clickOnCreateButton();
    await promise.all([
      productDetailsUpdatePage.setWeightInput('5'),
      productDetailsUpdatePage.setMrpInput('5'),
      productDetailsUpdatePage.setDistributorPriceInput('5'),
      productDetailsUpdatePage.setDistributorMarginInput('5'),
      productDetailsUpdatePage.setLotCountInput('5'),
      productDetailsUpdatePage.setAvailableInput('5'),
      productDetailsUpdatePage.setShortcutInput('shortcut'),
      productDetailsUpdatePage.productSelectLastOption()
    ]);
    expect(await productDetailsUpdatePage.getWeightInput()).to.eq('5', 'Expected weight value to be equals to 5');
    expect(await productDetailsUpdatePage.getMrpInput()).to.eq('5', 'Expected mrp value to be equals to 5');
    expect(await productDetailsUpdatePage.getDistributorPriceInput()).to.eq('5', 'Expected distributorPrice value to be equals to 5');
    expect(await productDetailsUpdatePage.getDistributorMarginInput()).to.eq('5', 'Expected distributorMargin value to be equals to 5');
    expect(await productDetailsUpdatePage.getLotCountInput()).to.eq('5', 'Expected lotCount value to be equals to 5');
    expect(await productDetailsUpdatePage.getAvailableInput()).to.eq('5', 'Expected available value to be equals to 5');
    expect(await productDetailsUpdatePage.getShortcutInput()).to.eq('shortcut', 'Expected Shortcut value to be equals to shortcut');
    await productDetailsUpdatePage.save();
    expect(await productDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productDetailsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProductDetails', async () => {
    const nbButtonsBeforeDelete = await productDetailsComponentsPage.countDeleteButtons();
    await productDetailsComponentsPage.clickOnLastDeleteButton();

    productDetailsDeleteDialog = new ProductDetailsDeleteDialog();
    expect(await productDetailsDeleteDialog.getDialogTitle()).to.eq('diInventoryApp.productDetails.delete.question');
    await productDetailsDeleteDialog.clickOnConfirmButton();

    expect(await productDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
