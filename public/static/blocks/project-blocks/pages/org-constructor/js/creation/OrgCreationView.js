import OrganizationConstructorView from '../OrgConstructorView.js'

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
    this.buildRouterTitle('Create new organization');
    this.buildDate();
  }

  buildDate() {
    this.DOMElements.inputs.creationDate.setAttribute('value', this.formatDateForDatePicker(Date.now()/1000))
  }
}