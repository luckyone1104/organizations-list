import OrganizationInfoView from '../OrgInfoView.js'
import pagesHtml from '../-html/html.js'

export default class LockedInfoView extends OrganizationInfoView {
  constructor() {
    super();
  }

  init(organization) {
    this.organization = organization;

    this.getDOMElements();
    this.buildView();
  }

  getDOMElements() {
    this.DOMElements = {
      pageWrapper : document.querySelector('.organization-info'),
      asideMenuButtons : document.querySelectorAll('.menu__item')
    }
  }

  buildView() {
    this.disableAsideMenu();
    this.buildHtml();
    this.getBuiltDOMElemetns();
    this.buildDataLinks();
  }

  disableAsideMenu() {
    this.DOMElements.asideMenuButtons.forEach(button => {
      button.setAttribute('disabled', 'true');
    })
  }

  buildHtml() {
    this.DOMElements.pageWrapper.innerHTML = pagesHtml.lockedView;
  }

  getBuiltDOMElemetns() {
    this.DOMElements.payButton = document.querySelector('.organization-info__button');
  }

  buildDataLinks() {
    this.DOMElements.payButton.setAttribute('data-link', `/purchase/${this.organization.id}`);
  }
}