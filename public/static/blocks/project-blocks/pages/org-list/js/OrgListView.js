import View from '../../../../../js/mvc/View.js'
import html from '../-html/html.js'

export default class OrganizationsView extends View {
  constructor() {
    super();
  }

  init(organizationList) {
    this.organizationList = organizationList;
    this.renderPage(html);
    this.getDOMElements();
    this.buildView();
    this.getBuiltDOMElements();
    this.buildHrefs(); 
  }

  getDOMElements() {
    this.DOMElements = {
      pageWrapper              : document.querySelector('.organizations-page'),
      tableWrapper             : document.querySelector('.organizations-page__table'),
      sortingSelect            : document.querySelector('.organizations-page__select'),
      searchInput              : document.querySelector('.organizations-page__search-input'),
      createOrganizationButton : document.querySelector('.organizations-page__button'),
      menu                     : document.querySelector('.aside-menu__menu')
    };
    this.getRouterPageTitle();
  }

  buildView() {
    this.buildMenu();
    this.buildRouterTitle('Organizations');
    (this.organizationList.length === 0) ? this.buildEmptyView() : this.buildList();
  }

  buildMenu() {
    this.DOMElements.menu.innerHTML = '';
  }

  buildEmptyView() {
    this.DOMElements.searchInput.disabled = true;
    this.DOMElements.sortingSelect.disabled = true;
    
    this.DOMElements.pageWrapper.insertAdjacentHTML('beforeend', this.getEmptyViewHtml());
  }

  getEmptyViewHtml() {
    return `<div class="organizations-page__empty-view">
              <img class="" src="/static/blocks/project-blocks/pages/org-list/images/folder.svg" alt="" height="200px" width="auto"></img>
              <p class="">На даный момент у вас нет ни одной организации</p>
            </div>`;
  }

  buildList(sortingMethod) {
    this.buildListWrapper();
    this.buildOrganizations(sortingMethod);
  }

  buildListWrapper() {
    this.DOMElements.tableWrapper.innerHTML = 
    `<div class="organizations-page__table-row _table-header">
      <div class="organizations-page__table-column">№</div>
      <div class="organizations-page__table-column">Name</div>
      <div class="organizations-page__table-column">Type</div>
      <div class="organizations-page__table-column">Quantity</div>
      <div class="organizations-page__table-column">Creation date</div>
      <div class="organizations-page__table-column">Status</div>
      <div class="organizations-page__table-column">Purchased</div>
      <div class="organizations-page__table-column"></div>
    </div>`;
  }

  buildOrganizations(sortingMethod) {
    this.organizationList.sort(sortingMethod).forEach(organization => {
      let status =  organization.status  ? 'Active' : 'Not active';
      let date = this.formatDateForTable(organization.creationDate.seconds);
      const html = 
        `<div class="organizations-page__table-row organization" id="${organization.fireId}">
          <div class="organizations-page__table-column">${organization.id}</div>
          <div class="organizations-page__table-column organization-name">${organization.name}</div>
          <div class="organizations-page__table-column">${organization.cardType}</div>
          <div class="organizations-page__table-column">${organization.cardCount}</div>
          <div class="organizations-page__table-column">${date}</div>
          <div class="organizations-page__table-column">${status}</div>
          <div class="organizations-page__table-column">${organization.isPurchased ? 'Yes' : 'No'}</div>
          <div class="organizations-page__table-column organizations-page__table-column_images-container">
            <img class="organizations-page__edit-button svg-scalable-icon" src="/static/blocks/project-blocks/pages/org-list/images/edit.svg" alt="" height="18px" data-link="/organization-constructor/edit/${organization.id}">
            <img class="organizations-page__delete-button svg-scalable-icon" src="/static/blocks/project-blocks/pages/org-list/images/delete.svg" alt="" height="18px">
          </div>
        </div>`
      this.DOMElements.tableWrapper.insertAdjacentHTML('beforeEnd', html);
    });
  }

  formatDateForTable(timestamp) {
    const date = new Date(timestamp * 1000);

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(2, 4);

    return `${day}.${month}.${year}`;
  }

  getBuiltDOMElements() {
    this.getEditButtons();
    this.getDeleteButtons();
    this.getOrganizationNames();
    // this.getOrganizationRows();
  }

  getEditButtons() {
    this.DOMElements.editButtons = document.querySelectorAll('.organizations-page__edit-button');
  }

  getDeleteButtons() {
    this.DOMElements.deleteButtons = document.querySelectorAll('.organizations-page__delete-button');
  }

  getOrganizationNames() {
    this.DOMElements.organizationNames = document.querySelectorAll('.organization-name');
  }

  // getOrganizationRows() {
  //   this.DOMElements.organizationRows = document.querySelectorAll('.organization')
  // }

  buildHrefs() {
    this.DOMElements.createOrganizationButton.setAttribute('data-link', `/organization-constructor/create/${this.organizationList.length + 1 || 1}`);
  }

  searchOrganizations(inputValue) {
    this.DOMElements.organizationNames.forEach(name => {
      if (name.innerText.toLowerCase().indexOf(inputValue.toLowerCase()) === -1 && inputValue.length >= 3) {
        name.parentNode.style.display = 'none';
      }
      else {
        name.parentNode.style.display = '';
      }
    })
  }

  replaceButtonWithSpinner(button) {
    const container = button.parentNode;
    button.remove();

    const spinner = 
      `<div class="spinner-border text-dark" style="width: 18px; height: 18px;">
       <span class="visually-hidden"></span>
      </div>`;

    container.insertAdjacentHTML('beforeend', spinner);
  }

  clickOnTable(e) {
    if (e.target.classList.contains('organizations-page__delete-button')) {
      window.app.observer.callEvent('clickOnDeleteOrganizationBtn', e.target);
    } else if (e.target.classList.contains('organization') || e.target.parentNode.classList.contains('organization')) {
      const id = +e.target.firstElementChild?.textContent || +e.target.parentNode.firstElementChild.textContent;
      window.app.observer.callEvent('navigateTo', `/organization-info/${id}`)
    }
  }

}