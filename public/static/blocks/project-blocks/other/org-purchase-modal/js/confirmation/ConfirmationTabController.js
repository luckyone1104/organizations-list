export default class ConfirmationController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.init();
    this.bindEvents();
  }

  async makePurchase() {
    this.view.buildLoadingButton();
      this.model.saveInputsData(this.view.getCurrentTabIndex(), this.view.getInputsValues());
      
      const organizationId = location.pathname.match(/[0-9]+$/)[0];
      await window.app.asyncObserver.callEvent('purchaseOrganization', organizationId);
      window.app.observer.callEvent('navigateTo', `/organization-info/${organizationId}`);
      window.app.observer.callEvent('hideModal', null);
      this.model.deleteInputsData();
      setTimeout(() => {
        this.view.clearModalWrapper();
      }, 1000)
  }

  bindEvents() {
    const nextButton = this.view.DOMElements.nextPageButton;

    nextButton.addEventListener('click', () => {
      let inputs = this.view.getInputsForValidation();
      let isValid = this.model.isValid(inputs);

      if (isValid.status) {
        this.makePurchase();
      } 
      else {
        for (let input of isValid.inputs) {
          window.app.observer.callEvent('failValidation', input);
        }
      }        
    })

    const previousButton = this.view.DOMElements.previousPageButton

    previousButton.addEventListener('click', () => {
      this.model.saveInputsData(this.view.getCurrentTabIndex(), this.view.getInputsValues());
      window.app.observer.callEvent('openTab', 'payment');
    })

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    const inputsForFilter = this.view.getInputsForFilter();

    inputsForFilter.onlyNumbers.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterOnlyNumbers(input.value);

        this.view.setInputValue(input, filteredInput);
      })
    });

    inputsForFilter.onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        let filteredInput = this.model.filterLettersAndSpaces(input.value);

        this.view.setInputValue(input, filteredInput);
      })
    });
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      window.app.observer.callEvent('focusOnInput', input);
    });

    input.addEventListener('blur', () => {
      window.app.observer.callEvent('blurOfInput', input);
    })
  }
}