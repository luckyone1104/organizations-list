import OrganizationConstructorView from '../organization-constructor-views/OrganizationConstructorView.js'

export default class CreationModeView extends OrganizationConstructorView {
  constructor() {
    super();
  }

  init() {
    this.getDOMElements();
    this.buildView();
  }
  getDOMElements() {
    this.getRouterPageTitle();
    this.getInputElements();
    this.getButtons();
  }

  buildView() {
    this.buildRouterTitle('Создание новой организации');
    this.buildDate();
  }

  buildDate() {
    this.DOMElements.inputs.creationDate.setAttribute('value', this.formatDateForDatePicker(Date.now()/1000))
  }
}