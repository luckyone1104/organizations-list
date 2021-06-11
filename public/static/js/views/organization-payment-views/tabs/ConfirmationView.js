import OrganizationPaymentView from '../OrganizationPaymentView.js'
import mainHtml from '../html/mainHtml.js'

export default class ConfirmationView extends OrganizationPaymentView {
  constructor() {
    super();
  }

  init() {
    this.getDOMElements();
    this.buildView();
  }

  getDOMElements() {
    this.DOMElements.inputs = document.querySelectorAll('.checkout-input');
    this.DOMElements.nextPageButton = document.querySelector('.next-page-button');
    this.DOMElements.previousPageButton = document.querySelector('.previous-page-button');
  }

  buildView() {
    this.buildInputValues();
  }

  buildLoadingButton() {
    this.DOMElements.nextPageButton.insertAdjacentHTML('beforeend', mainHtml.loadingSpinner)
  }
}