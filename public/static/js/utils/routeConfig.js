import OrganizationPaymentModel from '../models/organization-payment-models/OrganizationPaymentModel.js'

import OrganizationsView from '../views/organizations-views/OrganizationsView.js'
import OrganizationConstructorView from '../views/organization-constructor-views/OrganizationConstructorView.js'
import OrganizationInfoView from '../views/organization-info-views/OrganizationInfoView.js'
import OrganizationPaymentView from '../views/organization-payment-views/OrganizationPaymentView.js'

import OrganizationsController from '../controllers/organizations-controllers/OrganizationsController.js'
import OrganizationConstructorController from '../controllers/organization-constructor-controllers/OrganizationConstructorController.js'
import OrganizationInfoController from '../controllers/organization-info-controllers/OrganizationInfoController.js'
import OrganizationPaymentController from '../controllers/organization-payment-controllers/OrganizationPaymentController.js'

export default class RouteConfig {
  constructor(model) {
    this.model = model;
    this.routes = [
      { 
        path: '/',
        title: 'Organizations',
        init: () => {
          const view = new OrganizationsView();
          const controller = new OrganizationsController(view, this.model);
    
          controller.init();
        }
      },
      { 
        path: '/organization-constructor/:action/:id',
        title: 'Organization Constructor',
        init: (params) => {
          const view = new OrganizationConstructorView();
          const controller = new OrganizationConstructorController(view, this.model);
    
          controller.init(params);
        }
      },
      { 
        path: '/organization-info/:id',
        title: 'Organization Info',
        init: (params) => {
          const view = new OrganizationInfoView();
          const controller = new OrganizationInfoController(view, this.model);
    
          controller.init(params);
        }
      },
      { 
        path: '/purchase/:id',
        title: 'Purchase the organization',
        init: (params) => {
          const model = new OrganizationPaymentModel();
          const view = new OrganizationPaymentView();
          const controller = new OrganizationPaymentController(view, model);
    
          controller.init(params);
        }
      },
    ]
  }
}