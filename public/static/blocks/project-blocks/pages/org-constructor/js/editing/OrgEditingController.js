export default class EditingModeController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init(id) {
    this.view.init(this.model.organizationList, id);
    this.bindEvents();
  }

  bindEvents() {
    this.view.DOMElements.cancelButton.addEventListener('click', this.cancelCreation);

    this.view.DOMElements.saveButton.addEventListener('click', this.updateOrganization.bind(this));

    Object.entries(this.view.DOMElements.inputs).forEach( ([key, input]) => {
      input.addEventListener('change', this.removeInvalidStyle);
    })
  }

  cancelCreation() {
    window.app.observer.callEvent('navigateTo', '/');
  }

  async updateOrganization(e) {
    const isValid = this.model.isValid(this.view.DOMElements.inputs);
    if (!isValid.status) {
      this.view.addInvalidStyles(isValid.inputs);
      return null;
    }

    this.view.freezePage();
    this.view.buildLoadingSpinner(e.currentTarget);

    await this.updateChangedFields();
    await this.model.getData();

    window.app.observer.callEvent('navigateTo', '/');
  }

  async updateChangedFields() {
    const inputs = this.view.DOMElements.inputs;
    const organization = this.view.organizationList[this.view.id - 1];

    for (let key in inputs) {
      let input = inputs[key];
      let organizationValue = (input.id === 'creationDate') ? this.view.formatDateForDatePicker(organization[input.id].seconds) : organization[input.id].toString();

      
      if (input.value !== organizationValue) {
        let newValue;
        if (input.id === 'creationDate') newValue = firebase.firestore.Timestamp.fromDate(new Date(input.value));
        if (input.id === 'status') newValue = (input.value ==='true') ? true : false;
        if (input.id === 'name' || input.id === 'cardType') newValue = input.value;

        let newData = {};
        newData[input.id] = newValue;

        await this.model.updateOrganization(organization.fireId, newData);
      }
    }
  }

  removeInvalidStyle(e) {
    e.currentTarget.classList.contains('is-invalid') && e.currentTarget.classList.remove('is-invalid');
  }

}