import CreationModeView from '../../views/organization-constructor-views/CreationModeView.js'
import CreationModeController from './CreationModeController.js'

import EditingModeView from '../../views/organization-constructor-views/EditingModeView.js'
import EditingModeController from './EditingModeController.js'

export default class OrganizationConstructorController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.creationModeView = new CreationModeView();
    this.creationModeController = new CreationModeController(this.creationModeView, this.model);

    this.editingModeView = new EditingModeView();
    this.editingModeController = new EditingModeController(this.editingModeView, this.model);
  }

  init(params) {
    this.view.init();
    
    if (params.action === 'create') this.creationModeController.init(+params.id);;
    if (params.action === 'edit') this.editingModeController.init(+params.id);
  }
  
}