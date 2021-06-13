export default class LockedInfoController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init(organization) {
    this.view.init(organization);
  }
}