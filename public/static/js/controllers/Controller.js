export default class Controller {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  async init() {
    await this.model.init();
    this.router.init(this.model);

    this.bindSubscribers();
    this.bindEvents();
  }

  bindEvents() {
    document.body.addEventListener('click', this.navigateTo);
    
    window.addEventListener('popstate', this.router.route.bind(this.router));
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('navigateTo', href => { this.router.navigateTo(href) })

    window.app.observer.subscribeEvent('purchaseOrganization', async organizationId => {
      const organization = this.model.organizationList.find(organization => organization.id === +organizationId);
      const fireId = organization.fireId;
      await this.model.updateOrganization(fireId, { isPurchased : true });
      await this.model.getData();
    })
  }

  navigateTo(e) {
    if (e.target.matches('[data-link]')) {
      window.app.observer.callEvent('navigateTo', e.target.getAttribute('data-link'))
    }
  }
}