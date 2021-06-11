import View from '../View.js' 

export default class OrganizationInfoView extends View {
  constructor() {
    super();
  }

  init(id) {
    this.getRouterPageTitle();
    this.buildRouterTitle('Информация про организацию №' + id);
  }
}