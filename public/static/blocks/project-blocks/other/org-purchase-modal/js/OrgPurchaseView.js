import mainHtml from './-html/html.js'

export default class OrganizationPaymentView {
  constructor() {
    this.DOMElements = {};
  }

  init() {
    this.setCurrentTab();
    this.setUnlockedPages();
    this.renderView();
    this.getDOMElements();
    this.disableMenuButtons();
    this.buildView();
  }

  setCurrentTab() {
    window.app.paymentModal = window.app.paymentModal || {};
    window.app.paymentModal.currentTab = 'shipping';
  }

  setUnlockedPages() {
    this.unlockedPages = new Set;
    
    let howManyPagesAreUnlocked = 1;

    for (let i = 0; i < howManyPagesAreUnlocked; i++) {
      this.unlockedPages.add(i);
    }
  }

  renderView() {
    document.querySelector('#modal-wrapper').innerHTML = mainHtml.modal;
  }

  getDOMElements() {
    this.DOMElements.modalWrapper = document.querySelector('.payment-modal__wrapper');
    this.DOMElements.modal = document.querySelector('.payment-modal');
    this.DOMElements.menu = document.querySelector('.payment-modal__menu');
    this.DOMElements.menuButtons = this.getMenuButtons();
    this.DOMElements.menuLine = document.querySelector('.payment-modal__menu-selected-line-wrapper');
    this.DOMElements.tabWrapper = document.querySelector('.payment-modal__tab-wrapper');
  }

  getMenuButtons() {
    return [
      document.querySelector('.menu-element__shipping-details'),
      document.querySelector('.menu-element__payment-details'),
      document.querySelector('.menu-element__confirmation-page')
    ]
  }

  buildView() {
    this.showModalWrapper();
    this.showModal();
    this.buildMenu();
  }

  showModalWrapper() {
    setTimeout(() => {
      this.DOMElements.modalWrapper.style.opacity = 1;
    }, 10)
  }

  showModal() {
    setTimeout(() => {
      this.DOMElements.modal.style.opacity = 1;
      this.DOMElements.modal.style.transform = 'scale(1)';
    }, 40)
  }

  hideModal() {
    this.DOMElements.modal.style.opacity = 0;
    this.DOMElements.modal.style.transform = 'scale(0.2)';
  }

  hideModalWrapper() {
    this.DOMElements.modalWrapper.style.opacity = 0;
  }

  buildMenu(tabName = 'shipping') {
    const tabIndex = this.getTabIndex(tabName);

    this.removeMenuElementSelectedStyle();
    this.addMenuElementSelectedStyle(tabIndex);
    this.buildMenuLine(tabIndex);
    this.unlockDisabledButton();
  }

  removeMenuElementSelectedStyle() {
    this.DOMElements.menuButtons.forEach(button => {
      button.classList.remove('payment-modal__menu-element_selected');
    })
  }

  addMenuElementSelectedStyle(nextPageIndex = 0) {
    let menuButton = this.DOMElements.menuButtons[nextPageIndex];

    if (menuButton) {
      menuButton.classList.add('payment-modal__menu-element_selected');
    }
  }

  buildMenuLine(currentTabIndex) {
    this.showMenuLine();
    this.moveMenuSelectedLine(currentTabIndex);
  }

  showMenuLine() {
    this.DOMElements.menuLine.removeAttribute('style');
  }

  moveMenuSelectedLine(nextPageIndex) {
    switch(nextPageIndex) {
      case 0:
        this.DOMElements.menuLine.style.left='0%';
        break;
      case 1:
        this.DOMElements.menuLine.style.left='33.333%';
        break;
      case 2:
        this.DOMElements.menuLine.style.left='66.666%';
        break;
    }
  }

  renderTab(tabName = 'shipping') {
    this.DOMElements.tabWrapper.innerHTML = mainHtml[tabName];
  }

  getCurrentTabIndex() {
    return this.getTabIndex(window.app.paymentModal.currentTab)
  }

  getTabIndex(tabName) {
    switch(tabName) {
      case 'payment': return 1;
      case 'confirmation': return 2;
      default: return 0;
    }
  }

  disableMenuButtons() {
    this.DOMElements.menuButtons.forEach(button => {
      button.setAttribute('disabled', true);
    });
  }

  unlockDisabledButton() {
    let menuButtons = this.DOMElements.menuButtons;

    this.unlockedPages.forEach(index => {
      if (index < 3 && menuButtons[index].hasAttribute('disabled')) {
        menuButtons[index].removeAttribute('disabled');
      }
    });
  }

  //HELPERS

  getInputsForValidation() {
    return document.querySelectorAll('.validationSensitive');
  }

  getInputsForFilter() {
    const inputs = {
      onlyNumbers : [],
      onlyLetters : []
    };

    document.querySelectorAll('input').forEach(input => {
      if (input.hasAttribute('filter')) {
        if (input.getAttribute('filter') === 'onlyNumbers') {
          inputs.onlyNumbers.push(input);
        }

        if (input.getAttribute('filter') === 'onlyLetters') {
          inputs.onlyLetters.push(input);
        }
      }
    });

    return inputs;
  }

  getInputsValues() {
    const inputs = document.querySelectorAll('.sessionInput');

    const values = [];

    inputs.forEach(input => {
      values.push(input.value);
    })

    return values;
  }

  buildInputValues() {
    let inputs = this.getInputsForSessionStorage();
    let values = JSON.parse(sessionStorage.getItem(this.getCurrentTabIndex()));

    if (!values) return null;

    inputs.forEach((input, index) => {
      if (values[index] !== 'undefined') {
        input.value = values[index];
      }
    })

    if (inputs[0].tagName === 'SELECT' && inputs[0].value !== '') {
      this.hideSelectBoxPlaceHolder();
    }
  }

  getInputsForSessionStorage() {
    return document.querySelectorAll('.sessionInput');
  }

  isDisabled(element) {
    if (element.hasAttribute('disabled')) {
      return true;
    }
    return false;
  }

  setInputValue(input, value) {
    input.value = value;
  }

  colorInvalidBottomLine(input) {
    let inputBottomLine = input?.nextElementSibling || input.parentNode.nextElementSibling;
    inputBottomLine.style.borderBottomColor = '#ff6666';
  }

  changeInputBottomLineStyleOnFocus(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.style.borderBottomColor = "#71b1ce";
  }

  changeInputBottomLineStyleOnBlur(input) {
    let inputBottomLine = input.nextElementSibling;
    inputBottomLine.removeAttribute('style');
  }

  clearModalWrapper() {
    const modalWrapper = document.querySelector('#modal-wrapper');
    if (modalWrapper.firstChild) modalWrapper.innerHTML = '';
  }
}