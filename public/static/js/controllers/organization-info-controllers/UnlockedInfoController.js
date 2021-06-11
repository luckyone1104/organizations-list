export default class UnlockedInfoController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init(organization) {
    this.view.init(organization);
  }
}