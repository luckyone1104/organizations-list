import View from '../../../../../../../js/mvc/View.js'
import html from '../../../-html/html.js'

export default class SomeView extends View {
  init(orgId) {
    this.renderPage( {asideMenu : 'same'} );
    this.getDOMElements();
    this.buildRouterTitle('Some page of organization #' + orgId);
  }

  getDOMElements() {
    this.DOMElements.routerPageTitle = document.querySelector('.router__current-page');
  }
}