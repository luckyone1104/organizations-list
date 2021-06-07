import CreationModeView from '../views/organization-constructor-views/CreationModeView.js'
import CreationModeController from './organization-constructor-controllers/CreationModeController.js'

import EditingModeView from '../views/organization-constructor-views/EditingModeView.js'
import EditingModeController from './organization-constructor-controllers/EditingModeController.js'

export default class OrganizationInfoController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.creationModeView = new CreationModeView();
    this.creationModeController = new CreationModeController(this.creationModeView, this.model);

    this.editingModeView = new EditingModeView();
    this.editingModeController = new EditingModeController(this.editingModeView, this.model);
  }

  init(params) {
    if (params.action === 'create') this.creationModeController.init(+params.id);;
    if (params.action === 'edit') this.editingModeController.init(+params.id);
  }
  
}