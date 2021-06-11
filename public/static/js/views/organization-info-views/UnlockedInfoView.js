import OrganizationInfoView from './OrganizationInfoView.js'
import mainHtml from './html/mainHtml.js'
import menuHtml from './html/menuHtml.js'

export default class UnlockedInfoView extends OrganizationInfoView {
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
      menu        : document.querySelector('.aside-menu__menu')
    }
  }

  buildView() {
    this.buildHtml();
    // this.getBuiltDOMElemetns();
    // this.buildDataLinks();
  }

  buildHtml() {
    this.DOMElements.pageWrapper.innerHTML = mainHtml.unlockedView;
    this.DOMElements.menu.innerHTML = menuHtml;
  }
}