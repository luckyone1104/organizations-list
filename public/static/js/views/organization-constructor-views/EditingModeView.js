import OrganizationConstructorView from '../OrganizationConstructorView.js'

export default class EditingModeView extends OrganizationConstructorView {
  constructor() {
    super();
  }

  init(organizationList, id) {
    this.organizationList = organizationList;
    this.id = id;

    this.getDOMElements();
    this.buildView();
  }

  getDOMElements() {
    this.getRouterPageTitle();
    this.getInputElements();
    this.getButtons();
  }

  buildView() {
    this.buildRouterTitle('Редактирование организации №' + this.id);
    this.buildInputs();
  }

  buildInputs() {
    this.DOMElements.inputs.organizationName.value = this.organizationList[this.id-1].name;
    this.DOMElements.inputs.cardType.value = this.organizationList[this.id-1].cardType;
    this.DOMElements.inputs.creationDate.setAttribute('value', this.formatDateForDatePicker(this.organizationList[this.id-1].creationDate.seconds));
    this.DOMElements.inputs.organizationStatus.value = this.organizationList[this.id-1].status;
  }
}