import OrganizationInfoView from '../OrgInfoView.js'
import pagesHtml from '../-html/html.js'

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
      pageWrapper      : document.querySelector('.organization-info'),
      menu             : document.querySelector('.aside-menu__menu'),
      asideMenuButtons : document.querySelectorAll('.menu__item')
    }
  }
  

  buildView() {
    this.buildDataLinks();
    this.enableAsideMenu();
    this.buildHtml();
  }

  buildDataLinks() {
    this.DOMElements.asideMenuButtons.forEach((button, index) => {
      const link = index === 0 ? `/organization-info/${this.organization.id}` : `/organization-info/${this.organization.id}/something`;
      
      button.setAttribute('data-link', link);
      for (let btnChild of button.children) {
        btnChild.setAttribute('data-link', link);
      }
    })
  }

  enableAsideMenu() {
    this.DOMElements.asideMenuButtons.forEach(button => {
      button.removeAttribute('disabled');
    })
  }

  buildHtml() {
    this.DOMElements.pageWrapper.innerHTML = pagesHtml.unlockedView;
  }
}