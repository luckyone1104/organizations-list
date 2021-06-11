import ShippingView from '../../views/organization-payment-views/tabs/ShippingView.js'
import ShippingController from './tabs/ShippingController.js'

import PaymentView from '../../views/organization-payment-views/tabs/PaymentView.js'
import PaymentController from './tabs/PaymentController.js'

import ConfirmationView from '../../views/organization-payment-views/tabs/ConfirmationView.js'
import ConfirmationController from './tabs/ConfirmationController.js'

export default class OrganizationPaymentController {

  constructor(view, model) {
    this.model = model;
    this.view = view;

    this.shippingView = new ShippingView();
    this.shippingController = new ShippingController(this.shippingView, this.model);

    this.paymentView = new PaymentView();
    this.paymentController = new PaymentController(this.paymentView, this.model);

    this.confirmationView = new ConfirmationView();
    this.confirmationController = new ConfirmationController(this.confirmationView, this.model);
  }

  async init(params) {
    this.organizationId = params.id;

    this.view.init();

    this.bindSubscribers();
    this.bindEvents();

    await this.model.init();
    this.openTab();
  }

  bindEvents() {
    this.view.DOMElements.menu.addEventListener('click', e => {
      if(e.target.hasAttribute('open-tab')) this.openTab(e.target.getAttribute('open-tab'))
    })
  }

  openTab(tabName = 'shipping') {
    window.app.observer.callEvent('openTab', tabName);
  }

  initTabController(tabName) {
    if (!tabName) return null;

    switch(tabName) {
      case 'shipping':
        this.shippingController.init(this.model);
        break;
      case 'payment':
        this.paymentController.init(this.model);
        break;
      case 'confirmation':
        this.confirmationController.init(this.model);
        break;
    }
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('openTab', tabName => {
      this.model.saveInputsData(this.view.getCurrentTabIndex(), this.view.getInputsValues());
      this.view.renderTab(tabName);
      window.app.paymentModal.currentTab = tabName;
      this.initTabController(tabName);
      this.view.unlockedPages.add(this.view.getTabIndex(tabName));
      this.view.buildMenu(tabName);
    });

    window.app.observer.subscribeEvent('failValidation', input => {
      this.view.colorInvalidBottomLine(input);
    });

    window.app.observer.subscribeEvent('focusOnInput', input => {
      this.view.changeInputBottomLineStyleOnFocus(input);
    });

    window.app.observer.subscribeEvent('blurOfInput', input => {
      this.view.changeInputBottomLineStyleOnBlur(input);
    });

    window.app.observer.subscribeEvent('hideModal', () => {
      this.view.hideModal();
    })
  }
}