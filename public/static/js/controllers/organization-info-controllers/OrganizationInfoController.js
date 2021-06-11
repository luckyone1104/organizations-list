import UnlockedInfoView from '../../views/organization-info-views/UnlockedInfoView.js'
import UnlockedInfoController from './UnlockedInfoController.js'

import LockedInfoView from '../../views/organization-info-views/LockedInfoView.js'
import LockedInfoController from './LockedInfoController.js'

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
    this.view.init(params.id)
    this.organization = this.model.organizationList.find(organization => organization.id === +params.id);
    this.organization.isPurchased ? this.unlockedInfoController.init(this.organization) : this.lockedInfoController.init(this.organization);
  }
}