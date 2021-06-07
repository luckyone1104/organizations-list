export default class OrganizationsController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.init(this.model.organizationList);
    this.bindEvents();
  }

  bindEvents() {
    this.view.DOMElements.sortingSelect.addEventListener('change', this.sortOrganizations.bind(this));

    this.view.DOMElements.searchInput.addEventListener('input', this.searchOrganizations.bind(this));

    this.view.DOMElements.deleteButtons.forEach(button => {
      button.addEventListener('click', this.deleteOrganization.bind(this))
    });
  }

  sortOrganizations(e) {
    e.currentTarget.firstElementChild.disabled = 'true';

    switch(e.currentTarget.value) {
      case "ascendingId"    : this.view.buildList(this.model.sortByAscendingId); break;
      case "descendingId"   : this.view.buildList(this.model.sortByDescendingId); break;
      case "ascendingName"  : this.view.buildList(this.model.sortByAscendingName); break;
      case "descendingName" : this.view.buildList(this.model.sortByDescendingName); break;
      case "ascendingDate"  : this.view.buildList(this.model.sortByAscendingDate); break;
      case "descendingDate" : this.view.buildList(this.model.sortByDescendingDate); break;
    }

    this.view.getBuiltDOMElements();
    this.bindEvents();
  }

  searchOrganizations(e) {
    this.view.searchOrganizations(e.currentTarget.value);
  }

  async deleteOrganization(e) {
    this.view.buildModal( { title : 'Вы уверены, что хотите удалить организацию?' } );

    this.view.DOMElements.modalFirstButton.addEventListener('click', this.clickOnFirstButton.bind(this));
    await this.view.DOMElements.modalSecondButton.addEventListener('click', this.clickOnSecondButton.bind(this, e.currentTarget));
  }

  clickOnFirstButton() {
    this.view.removeModal();
    window.app.observer.callEvent('navigateTo', '/');
  }

  async clickOnSecondButton(...args) {
    const deleteButton = args[0];
    const id = deleteButton.parentNode.parentNode.id;

    deleteButton.previousElementSibling.removeAttribute('data-link');
    this.view.replaceButtonWithSpinner(deleteButton);
    this.view.removeModal();

    await this.model.deleteOrganization(id);
    await this.model.getData();

    window.app.observer.callEvent('navigateTo', '/');
  }
}