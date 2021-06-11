export default class PaymentController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.init(this.model.paymentData);
    this.bindSubscribers();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.view.resizeCreditCard();
    });

    this.view.DOMElements.nextPageButton.addEventListener('click', e => {
      this.checkForValidation(e);
    })

    this.view.DOMElements.previousPageButton.addEventListener('click', () => {
      this.model.saveInputsData(this.view.getCurrentTabIndex(), this.view.getInputsValues());
      window.app.observer.callEvent('openTab', 'shipping');
    })

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

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);

      input.addEventListener('input', () => {
        window.app.observer.callEvent('inputCardInfo', input);
      })
    });
  }

  displayCardInfo(input) {
    if (input === this.view.DOMElements.nameOnCardInput) {
      this.displayNameOnCard(input);
    } else if (input === this.view.DOMElements.cardNumberInput) {
      this.displayCardNumber(input);
    } else if (input === this.view.DOMElements.validThroughInput) {
      this.displayExpiryDate(input);
    }
  }

  displayNameOnCard(input) {
    this.view.writeCardHolderName(input.value.toUpperCase());

    if (input.value === "") {
      this.view.buildCardHolderName(this.view.cardDefaultValues.name);
    }
  }

  displayCardNumber(input) {
    this.view.chooseVisaOrMasterCardLogo(input.value);
      
    this.view.setInputValue(input, this.model.putSpacesInCreditCardNumber(input.value))

    this.view.writeCreditCardNumber(input.value);

    if (input.value === "") {
      this.view.buildCardNumber(this.view.cardDefaultValues.number);
    }
  }

  displayExpiryDate(input) {
    this.view.setInputValue(input, this.model.putSlashBetweenDates(input.value));

    this.view.writeExpiryDate(input.value);

    if (input.value === "") {
      this.view.buildExpiryDate(this.view.cardDefaultValues.expiry);
    }
  }

  checkForValidation(event) {
    let inputs = this.view.getInputsForValidation();
    let isValid = this.model.isValid(inputs);

    if (isValid.status) {
      this.model.saveInputsData(this.view.getCurrentTabIndex(), this.view.getInputsValues());
      window.app.observer.callEvent('openTab', 'confirmation');
    } 
    else {
      for (let input of isValid.inputs) {
        window.app.observer.callEvent('failValidation', input);
      }
    }
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      window.app.observer.callEvent('focusOnInput', input);
    });

    input.addEventListener('blur', () => {
      window.app.observer.callEvent('blurOfInput', input);
    })
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('inputCardInfo', input => {
      this.displayCardInfo(input);
    })
  }
}