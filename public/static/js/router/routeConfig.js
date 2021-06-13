import OrganizationsView from '../../blocks/project-blocks/pages/org-list/js/OrgListView.js'
import OrganizationsController from '../../blocks/project-blocks/pages/org-list/js/OrgListController.js'

import OrganizationConstructorView from '../../blocks/project-blocks/pages/org-constructor/js/OrgConstructorView.js'
import OrganizationConstructorController from '../../blocks/project-blocks/pages/org-constructor/js/OrgConstructorController.js'

import OrganizationInfoView from '../../blocks/project-blocks/pages/org-info/js/OrgInfoView.js'
import OrganizationInfoController from '../../blocks/project-blocks/pages/org-info/js/OrgInfoController.js'

import SomeView from '../../blocks/project-blocks/pages/org-info/js/unlocked/something/SomeView.js'
import SomeController from '../../blocks/project-blocks/pages/org-info/js/unlocked/something/SomeController.js'

import OrganizationPaymentModel from '../../blocks/project-blocks/other/org-purchase-modal/js/OrgPurchaseModel.js'
import OrganizationPaymentView from '../../blocks/project-blocks/other/org-purchase-modal/js/OrgPurchaseView.js'
import OrganizationPaymentController from '../../blocks/project-blocks/other/org-purchase-modal/js/OrgPurchaseController.js'

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
        path: '/organization-info/:id/:something',
        title: 'Organization Info',
        init: (params) => {
          const view = new SomeView();
          const controller = new SomeController(view, this.model);
    
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