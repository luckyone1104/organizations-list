export default {
  unlockedView: `
    <div class="organization-info_unlocked">
      <div class="organization-info__card-section card-section">
        <div class="card-section__title">
          <span>Notifications</span>
        </div>

        <div class="card-section__text">
          <span>Notify clients</span>
        </div>
      </div>

      <div class="organization-info__card-section card-section">
        <div class="card-section__title">
          <span>Check card</span>
        </div>

        <div class="card-section__text">
          <span>Check card by number or name</span>
        </div>
      </div>

      <div class="organization-info__card-section card-section">
        <div class="card-section__title">
          <span>Templates</span>
          <span>6</span>
        </div>

        <div class="card-section__text">
          <span>See card templates</span>
        </div>
      </div>

      <div class="organization-info__card-section card-section">
        <div class="card-section__title">
          <span>Clients</span>
          <span>340</span>
        </div>

        <div class="card-section__text">
          <span>See clients' information</span>
        </div>
      </div>
    </div>
  `,
  lockedView: `
  <div class="organization-info_locked">
    <svg style="margin-bottom: 24px;" version="1.1" height="170px" width="170px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <path style="fill:#455A64;" d="M256,0c-82.436,0.094-149.239,66.898-149.333,149.333v96c0,5.891,4.776,10.667,10.667,10.667H160
      c5.891,0,10.667-4.776,10.667-10.667v-96C170.667,102.205,208.872,64,256,64s85.333,38.205,85.333,85.333v96
      c0,5.891,4.776,10.667,10.667,10.667h42.667c5.891,0,10.667-4.776,10.667-10.667v-96C405.239,66.898,338.436,0.094,256,0z"/>
      <path style="fill:#86abbf;" d="M394.667,234.667H117.333c-17.673,0-32,14.327-32,32v192c0,29.455,23.878,53.333,53.333,53.333
      h234.667c29.455,0,53.333-23.878,53.333-53.333v-192C426.667,248.994,412.34,234.667,394.667,234.667z"/>
      <path style="fill:#455A64;" d="M284.821,372.693c8.858-8.014,13.892-19.415,13.845-31.36c0-23.564-19.103-42.667-42.667-42.667
      s-42.667,19.103-42.667,42.667c-0.046,11.945,4.987,23.346,13.845,31.36l-13.312,39.936c-1.862,5.589,1.16,11.629,6.749,13.491
      c1.091,0.363,2.234,0.548,3.384,0.547h64c5.891,0.007,10.673-4.762,10.68-10.653c0.001-1.15-0.183-2.293-0.547-3.384
      L284.821,372.693z"/>
    </svg>

    <p>Organization is not purchased yet. To proceed the payment, please, press the button below.</p>

    <button class="organization-info__button green-button btn btn-success">
      Purchase organization
    </button>
  </div>
  `,
}