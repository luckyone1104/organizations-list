import View from '../View.js'

export default class OrganizationConstructorView extends View {
  constructor() {
    super();
  }

  init() {
    this.buildMenu();
  }

  buildMenu() {
    document.querySelector('.aside-menu__menu').innerHTML = '';
  }

  getInputElements() {
    this.DOMElements.inputs = {
      organizationName   : document.querySelector('#name'),
      cardType           : document.querySelector('#cardType'),
      creationDate       : document.querySelector('#creationDate'),
      organizationStatus : document.querySelector('#status'),
    }
  }

  getButtons() {
    this.DOMElements.cancelButton = document.querySelector('.create-organization-page__cancel-button');
    this.DOMElements.saveButton = document.querySelector('.create-organization-page__save-button');
  }

  buildLoadingSpinner(wrapper) {
    wrapper.firstElementChild.style = 'margin-right: 10px';
    wrapper.insertAdjacentHTML('beforeend', 
      `<div class="spinner-border text-light" role="status" style="width: 18px; height: 18px;">
        <span class="sr-only"></span>
      </div>`
    );
  }

  freezePage() {
    this.disableInputs();

    this.DOMElements.cancelButton.disabled = true
    this.DOMElements.saveButton.disabled = true
  }

  disableInputs() {
    Object.entries(this.DOMElements.inputs).forEach(([key, input]) => {
      input.disabled = true;
    })
  }

  formatDateForDatePicker(timestamp) {
    const date = new Date(timestamp * 1000);

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  addInvalidStyles(inputs) {
    inputs.forEach(input => {
      input.classList.add('is-invalid');
    });
  }
}