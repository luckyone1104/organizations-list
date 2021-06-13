import UnlockedInfoView from './unlocked/UnlockedInfoView.js'
import UnlockedInfoController from './unlocked/UnlockedInfoController.js'

import LockedInfoView from './locked/LockedInfoView.js'
import LockedInfoController from './locked/LockedInfoController.js'

export default class OrganizationInfoController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.unlockedInfoView = new UnlockedInfoView;
    this.unlockedInfoController = new UnlockedInfoController(this.unlockedInfoView, this.model);

    this.lockedInfoView = new LockedInfoView;
    this.lockedInfoController = new LockedInfoController(this.lockedInfoView, this.model);
  }

  init(params) {
    this.view.init(params.id, this.model.organizationList);

    this.organization = this.model.organizationList.find(organization => organization.id === +params.id);
    this.organization.isPurchased ? this.unlockedInfoController.init(this.organization) : this.lockedInfoController.init(this.organization);

    this.bindEvents();
  }

  bindEvents() {
    this.view.DOMElements.organizationSelect.addEventListener('change', e => {
      window.app.observer.callEvent('navigateTo', `/organization-info/${e.target.value}`)
    })
  }
}