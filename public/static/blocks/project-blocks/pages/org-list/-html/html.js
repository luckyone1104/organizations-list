export default {
  content: `
    <div class="main-content__organizations-page organizations-page">
      <div class="organizations-page__form-wrapper">
        <div class="organizations-page__inputs-wrapper">
          <div class="organizations-page__search form-outline">
            <input type="search" id="form1" class="organizations-page__search-input form-control" placeholder="Search for an organization"
            aria-label="Search" />
          </div>

          <select class="organizations-page__select form-select" aria-label="Default select example">
            <option selected>Sort</option>
            <option value="ascendingId">By number ↓ (asc.)</option>
            <option value="descendingId">By number ↑ (desc.)</option>
            <option value="ascendingName">By name ↓ (asc.)</option>
            <option value="descendingName">By name ↑ (desc.)</option>
            <option value="ascendingDate">By date ↓ (asc.)</option>
            <option value="descendingDate">By date ↑ (desc.)</option>
          </select>
        </div>

        <button class="organizations-page__button btn btn-success" data-link>
            Create new organization
        </button>
      </div>

      <div class="organizations-page__table"></div>
    </div>
    `,
}