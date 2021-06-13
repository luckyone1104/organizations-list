export default {
  content: `
    <div class="main-content__create-organization-page create-organization-page">
      <form class="create-organization-page__form" action="">
        <label for="organization-name">Name</label>
        <input class="create-organization-page__input form-control" type="text" placeholder="Enter the name..." id="name">

        <label for="card-type">Type</label>
        <select class="create-organization-page__select form-select" aria-label="Default select example" id="cardType">
          <option value="Discount" selected>Discount</option>
          <option value="Cashback">Cashback</option>
        </select>

        <label for="date-of-creation">Creation Date</label>
        <div class="create-organization-page__date-input-wrapper form-group row">
          <div class="col-10">
            <input class="create-organization-page__date-input form-control" type="date" value="2021-06-01" id="creationDate">
          </div>
        </div>

        <label for="organization-status">Status</label>
        <select class="create-organization-page__select form-select" aria-label="Default select example" id="status">
          <option selected value="true">Active</option>
          <option value="false">Not active</option>
        </select>
      </form>

      <div class="create-organization-page__buttons-container">
        <button type="button" class="create-organization-page__cancel-button btn btn-primary">Cancel</button>
        <button type="button" class="create-organization-page__save-button btn btn-success"><span>Save</span></button>
      </div>
    </div>
  `,
}