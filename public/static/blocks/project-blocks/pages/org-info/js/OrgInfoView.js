import View from '../../../../../js/mvc/View.js'
import html from '../-html/html.js'

export default class OrganizationInfoView extends View {
  constructor() {
    super();
  }

  init(id, organizations) {
    this.saveData(id, organizations);
    this.renderPage(html);
    this.getDOMElements();
    this.buildView();
  }
  
  saveData(id, organizations) {
    this.currentOrganizationId = id;
    this.organizations = organizations;
  }

  getDOMElements() {
    this.DOMElements = {
      organizationSelect : document.querySelector('.menu__organization-select'),
      asideMenuButtons   : document.querySelectorAll('.menu__item')
    }
    this.getRouterPageTitle();
  }

  buildView() {
    this.buildOrganizationsSelect();
    this.buildRouterTitle('About organization #' + this.currentOrganizationId);
  }

  buildOrganizationsSelect() {
    this.buildSelectOptions();
    this.getSelectOptions();
    this.selectOption();
  }

  buildSelectOptions() {
    this.organizations.forEach(organization => {
      this.DOMElements.organizationSelect.insertAdjacentHTML('beforeend', `<option value="${organization.id}" ${organization.isPurchased ? '' : 'disabled'}>${organization.name}</option>`)
    })
  }

  getSelectOptions() {
    this.DOMElements.selectOptions = this.DOMElements.organizationSelect.querySelectorAll('option');
  }

  selectOption() {
    this.DOMElements.selectOptions.forEach(option => {
      if (option.value === this.currentOrganizationId) {
        option.setAttribute('selected', true);
        return null;
      }
    })
  }
}