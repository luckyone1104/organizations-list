export default class View {
  constructor() {
    this.DOMElements = {};
  }

  renderPage(html) {
    this.renderAsideMenu(html?.asideMenu);
    this.renderContent(html?.content);
  }

  renderAsideMenu(html = '') {
    if (html === 'same') return null;
    document.querySelector('.aside-menu__menu').innerHTML = html;
  }

  renderContent(html = '') {
    if (html === 'same') return null;
    document.querySelector('.main-content__wrapper').innerHTML = html;
  }

  getRouterPageTitle() {
    this.DOMElements.routerPageTitle = document.querySelector('.router__current-page');
  }

  buildRouterTitle(title) {
    this.DOMElements.routerPageTitle.textContent = title;
  }

  buildModal(message) {
    document.querySelector('#modal-wrapper').innerHTML = this.getModalHtml(message);
    this.getModalElements();
    this.animateModal(this.DOMElements.modal);
  }

  getModalElements() {
    this.DOMElements.modal = document.querySelector('.modal__window');
    this.DOMElements.modalFirstButton = document.querySelector('.modal__first-btn');
    this.DOMElements.modalSecondButton = document.querySelector('.modal__second-btn');
  }

  animateModal(modal) {
    setTimeout(() => {
      modal.parentNode.classList.add('modal_opened')
      modal.classList.add('modal__window_opened');
    }, 0);
  }

  getModalHtml(message) {
    return `<div class="modal">
              <div class="modal__bg"></div>
              <div class="modal__window">
                <p class="modal__title">${message.title}</p>
                <div class="modal__btns-container">
                  <button type="button" class="modal__first-btn">${message.firstButton || 'Нет'}</button>
                  <button type="button" class="modal__second-btn"><span>${message.firstButton || 'Да'}</span></button>
              </div>
            </div>`
  }

  removeModal() {
    this.DOMElements.modal.classList.remove('modal__window_opened');
    setTimeout(() => {
      this.DOMElements.modal.parentNode.classList.remove('modal_opened');
      setTimeout(() => {
        this.DOMElements.modal.parentNode.remove();
      }, 140);
    }, 200);
  }

  clearModalWrapper() {
    const modalWrapper = document.querySelector('#modal-wrapper');
    if (modalWrapper.firstChild) modalWrapper.innerHTML = '';
  }
}