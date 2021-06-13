export default class ShippingController {
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
    this.view.DOMElements.selectBox.addEventListener('change', () => {
      window.app.observer.callEvent('changeOfSelectBox');
    });

    this.view.DOMElements.nextPageButton.addEventListener('click', e => {
      this.checkForValidation(e);
    })

    this.view.DOMElements.inputs.forEach(input => {
      this.createInputEvent(input);
    });

    this.view.getInputsForFilter().onlyLetters.forEach(input => {
      input.addEventListener('input', () => {
        this.view.setInputValue(input, this.model.filterLettersAndSpaces(input.value));
      })
    });
  }

  checkForValidation(event) {
    let inputs = this.view.getInputsForValidation();
    let isValid = this.model.isValid(inputs);

    if (isValid.status) {
      this.model.saveInputsData(this.view.getCurrentTabIndex(), this.view.getInputsValues());     
      window.app.observer.callEvent('openTab', 'payment');
    } 
    else {
      for (let input of isValid.inputs) {
        window.app.observer.callEvent('failValidation', input);
      }
    }
  }

  createInputFilterEvent(input) {
    input.addEventListener('input', () => {
      this.view.setInputValue(input, this.model.filterLettersAndSpaces(input.value));
    })
  }

  createInputEvent(input) {
    input.addEventListener('focus', () => {
      window.app.observer.callEvent('focusOnInput', input);
    })

    input.addEventListener('blur', () => {
      window.app.observer.callEvent('blurOfInput', input);
    })
  }

  resetCitiesInputEventListener() {
    let input = this.view.getNewCitiesInput();
    this.createInputEvent(input);
    this.createInputFilterEvent(input);
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('changeOfSelectBox', () => {
      this.view.disableFirstOption();
      this.view.hideSelectBoxPlaceHolder();
      this.view.showSelectBoxPlaceHolder();
      this.view.changeSelectBoxBottomLine();
      this.view.changeCitiesInput();
      this.resetCitiesInputEventListener();
    });
  }
}