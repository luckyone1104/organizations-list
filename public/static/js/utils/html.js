export default {
  '/': 
    `<div class="main-content__organizations-page organizations-page">
      <div class="organizations-page__form-wrapper">
        <div class="organizations-page__inputs-wrapper">
          <div class="organizations-page__search form-outline">
            <input type="search" id="form1" class="organizations-page__search-input form-control" placeholder="Поиск организации"
            aria-label="Search" />
          </div>

          <select class="organizations-page__select form-select" aria-label="Default select example">
            <option selected>Сортировать</option>
            <option value="ascendingId">По номеру ↓</option>
            <option value="descendingId">По номеру ↑</option>
            <option value="ascendingName">По имени ↓</option>
            <option value="descendingName">По имени ↑</option>
            <option value="ascendingDate">По дате ↓</option>
            <option value="descendingDate">По дате ↑</option>
          </select>
        </div>

        <button class="organizations-page__button btn btn-success" data-link>
            Создать новую организацию
        </button>
      </div>

      <div class="organizations-page__table"></div>
    </div>`,

  '/organization-constructor/:action/:id': 
    `<div class="main-content__create-organization-page create-organization-page">
      <form class="create-organization-page__form" action="">
        <label for="organization-name">Название</label>
        <input class="create-organization-page__input form-control" type="text" placeholder="Введите название..." id="name">

        <label for="card-type">Тип карты</label>
        <select class="create-organization-page__select form-select" aria-label="Default select example" id="cardType">
          <option value="Discount" selected>Discount</option>
          <option value="Cashback">Cashback</option>
        </select>

        <label for="date-of-creation">Дата создания</label>
        <div class="create-organization-page__date-input-wrapper form-group row">
          <div class="col-10">
            <input class="create-organization-page__date-input form-control" type="date" value="2021-06-01" id="creationDate">
          </div>
        </div>

        <label for="organization-status">Статус</label>
        <select class="create-organization-page__select form-select" aria-label="Default select example" id="status">
          <option selected value="true">Активно</option>
          <option value="false">Не активно</option>
        </select>
      </form>

      <div class="create-organization-page__buttons-container">
        <button type="button" class="create-organization-page__cancel-button btn btn-primary">Отмена</button>
        <button type="button" class="create-organization-page__save-button btn btn-success"><span>Сохранить</span></button>
      </div>
    </div>`,

    '/organization-info/:id': 
      `<div class="main-content__organization-info organization-info">
      </div>`,

    '/purchase/:id': `
      <div class="main-content__purchase-modal-wrapper">
      </div>`
}