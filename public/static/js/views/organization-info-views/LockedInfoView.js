import OrganizationInfoView from './OrganizationInfoView.js'
import mainHtml from './html/mainHtml.js'

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
    }
  }

  buildView() {
    this.buildHtml();
    this.getBuiltDOMElemetns();
    this.buildDataLinks();
  }

  buildHtml() {
    this.DOMElements.pageWrapper.innerHTML = mainHtml.lockedView;
  }

  getBuiltDOMElemetns() {
    this.DOMElements.payButton = document.querySelector('.organization-info__button');
  }

  buildDataLinks() {
    this.DOMElements.payButton.setAttribute('data-link', `/purchase/${this.organization.id}`);
  }
}