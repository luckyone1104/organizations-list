export default class CreationModeController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init(id) {
    this.organizationId = id;
    this.view.init();
    this.bindEvents();
  }

  bindEvents() {
    this.view.DOMElements.cancelButton.addEventListener('click', this.cancelCreation);

    this.view.DOMElements.saveButton.addEventListener('click', this.createOrganization.bind(this));
    
    Object.entries(this.view.DOMElements.inputs).forEach( ([key, input]) => {
      input.addEventListener('change', this.removeInvalidStyle);
    })
  }

  cancelCreation() {
    window.app.observer.callEvent('navigateTo', '/');
  }

  async createOrganization (e) {
    const isValid = this.model.isValid(this.view.DOMElements.inputs);
    if (!isValid.status) {
      this.view.addInvalidStyles(isValid.inputs);
      return null;
    }
    
    this.view.freezePage();
    this.view.buildLoadingSpinner(e.currentTarget);
    
    const newOrganization = this.getNewOrganization();
    
    await this.model.createOrganization(newOrganization);
    await this.model.getData();

    window.app.observer.callEvent('navigateTo', '/');
  };

  getNewOrganization() {
    const inputs = this.view.DOMElements.inputs;

    return {
      id           : this.organizationId,
      name         : inputs.organizationName.value,
      cardType     : inputs.cardType.value,
      creationDate : firebase.firestore.Timestamp.fromDate(new Date(inputs.creationDate.value)),
      status       : inputs.organizationStatus.value === 'true' ? true : false,
      cardCount    : (Math.random() * (100 - 10) + 10).toFixed(0),
      isPurchased  : false
    };
  }

  removeInvalidStyle(e) {
    e.currentTarget.classList.contains('is-invalid') && e.currentTarget.classList.remove('is-invalid');
  }
}