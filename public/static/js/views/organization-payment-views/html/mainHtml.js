export default {
  modal: `
    <div class="payment-modal__wrapper">
      <div class="payment-modal">
        <div class="payment-modal__menu-wrapper">
          <div class="payment-modal__menu">
            <button open-tab="shipping" type="button" class="payment-modal__menu-element menu-element__shipping-details">SHIPPING DETAILS</button>
            <button open-tab="payment" type="button" class="payment-modal__menu-element menu-element__payment-details">PAYMENT DETAILS</button>
            <button open-tab="confirmation" type="button" class="payment-modal__menu-element menu-element__confirmation-page">CONFIRMATION</button>
          </div>
          <div class="payment-modal__menu-selected-line-wrapper" style="display: none;">
            <div class="payment-modal__menu-selected-line"></div>
          </div>
        </div>

        <div class="payment-modal__tab-wrapper">
          <div class="payment-modal__loader-wrapper">
            <div class="spinner-border" style="width: 50px; height: 50px; color: #4f8db2;" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  shipping: `
    <div class="payment-modal__shipping-details shipping-details"">
      <div class="shipping-details__left-column">
        <img class="shipping-details__left-image" src="/static/css/blocks/payment-modal/images/truck.svg" alt="">
      </div>

      <div class="shipping-details__right-column">
        <div class="shipping-details__input-info">
          <div class="shipping-details__title-wrapper">
            <div class="shipping-details__title">
              Shipping Details
            </div>
          </div>

          <div class="shipping-details__inputs-wrapper">
            <div class="shipping-details__input-form">
              <label class="shipping-details__label" >Country *</label>
              <div class="shipping-details__select-wrapper">
                <div class="shipping-details__select-placeholder">Zimbabwe</div>
                <select class="shipping-details__select-country validationSensitive sessionInput" name="countries" id="countries" placeholder="Zimbabwe">
                  <option></option>
                </select>
              </div>
              <div class="shipping-details__bottom-line"></div>
            </div>

            <div class="autoComplete_wrapper">
              <label class="shipping-details__label shipping-details__input-form">City *</label>
              <div class="shipping-details__city-input-wrapper">
                <input class="checkout-input cityInput defaultCityInput validationSensitive sessionInput"  type="text" maxlength="19" placeholder="Harare" filter="onlyLetters">
                <div class="shipping-details__bottom-line"></div>
              </div>
            </div>

            <div class="shipping-details__input-form">
              <label class="shipping-details__label" >Street *</label>
              <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="19" placeholder="Independence Str">
              <div class="shipping-details__bottom-line"></div>
            </div>

            <div class="shipping-details__input-row">
              <div class="shipping-details__input-form shipping-details__house-number-wrapper">
                <label class="shipping-details__label" >House *</label>
                <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="8" placeholder="23">
                <div class="shipping-details__bottom-line"></div>
              </div>

              <div class="shipping-details__input-form shipping-details__apartment-number--wrapper">
                <label class="shipping-details__label">Apartment</label>
                <input class="checkout-input sessionInput" type="text"  maxlength="8" placeholder="201">
                <div class="shipping-details__bottom-line"></div>
              </div>
            </div>
          </div>

          <div class="shipping-details__buttons-wrapper">
            
            <button type="button" class="shipping-details__next-page-button next-page-button">
              <span class="next-page-button__title">NEXT STEP</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  `,

  payment: `
    <div class="payment-modal__payment-details payment-details"">
      <div class="payment-details__left-column">
        <div class="payment-details__credit-card credit-card">
          <div class="credit-card__first-row">
            <div class="credit-card__payment-system-logo">
              <img class="master-card-logo" style="display:none;"  src="/static/css/blocks/payment-modal/images/master-card-logo.svg" alt="">
              <img class="visa-logo" src="/static/css/blocks/payment-modal/images/visa-logo.svg" alt="">
            </div>
          </div>

          <div class="credit-card__second-row">
            <div class="credit-card__bank-chip-image">
              <img class="card-chip" src="/static/css/blocks/payment-modal/images/credit-card-chip.svg" alt="">
            </div>
          </div>

          <div class="credit_card__third-row">
            <div class="credit-card__card-number card-number">      
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div class="credit-card__fourth-row">
            <div class="credit-card__card-holder-name card-holder-name"></div>
            <div class="credit-card__card-expiry-date expiry-date"></div>
          </div>
        </div>
      </div>

      <div class="payment-details__right-column">
        <div class="payment-details__input-info">
          <div class="payment-details__title-wrapper">
            <div class="payment-details__title">Payment Details</div>
          </div>
  
          <div class="payment-details__inputs-wrapper">
            <div class="payment-details__input-form">
              <label class="payment-details__label" for="name-on-card">Name on card *</label>
              <input class="payment-details__name-on-card checkout-input validationSensitive sessionInput displayOnCard" id="name-on-card" type="text" maxlength="19" placeholder="Arjun Kunwar" filter="onlyLetters">
              <div class="payment-details__bottom-line"></div>
            </div>
            <div class="payment-details__input-form">
              <label class="payment-details__label" for="card-number">Card Number *</label>
              <input class="payment-details__card-number checkout-input validationSensitive sessionInput displayOnCard" id="card-number" type="text" minlength="19" maxlength="19" placeholder="5465 3232 4152 5931" filter="onlyNumbers">
              <div class="payment-details__bottom-line"></div>
            </div>
            <div class="payment-details__input-row">
              <div class="payment-details__input-form payment-details__valid-through-wrapper">
                <label class="payment-details__label" for="valid-through">Valid Through *</label>
                <input class="payment-details__valid-through checkout-input validationSensitive sessionInput displayOnCard" id="valid-through" type="text" minlength="5" maxlength="5" placeholder="09/23" filter="onlyNumbers">
                <div class="payment-details__bottom-line"></div>
              </div>
              <div class="payment-details__input-form payment-details__cvv-wrapper">
                <label class="payment-details__label" for="card-cvv">CVV *</label>
                <input class="payment-details__cvv checkout-input validationSensitive sessionInput displayOnCard" type="text" id="card-cvv" minlength="3" maxlength="3" placeholder="512" filter="onlyNumbers">
                <div class="payment-details__bottom-line"></div>
              </div>
            </div> 
          </div>
          
          <div class="payment-details__buttons-wrapper">

            <button type="button" class="payment-details__next-page-button next-page-button">
              <span class="next-page-button__title">NEXT STEP</span>
            </button>

            <button type="button" class="payment-details__previous-page-button previous-page-button">
              <span class="previous-page-button__title">← Previous Step</span>
            </button>
          </div>
        </div>
      </div>
      


    </div>
  `,

  confirmation:`
    <div class="payment-modal__confirmation-page confirmation-page">
      <div class="confirmation-page__left-column">
        <img class="confirmation-page__left-image" src="/static/css/blocks/payment-modal/images/confirmation.svg" alt="">
      </div>

      <div class="confirmation-page__right-column">
        <div class="confirmation-page__input-info">

          <div class="confirmation-page__title-wrapper">
            <div class="confirmation-page__title">
              Confirmation
            </div>
          </div>
      
          <div class="confirmation-page__inputs-wrapper">
            <div class="confirmation-page__input-row">
              <div class="confirmation-page__input-form confirmation-page__customer-name-wrapper">
                <label class="confirmation-page__label">Name *</label>
                <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="8" placeholder="Manuel" filter="onlyLetters">
                <div class="confirmation-page__bottom-line"></div>
              </div>
      
              <div class="confirmation-page__input-form confirmation-page__customer-surname-wrapper">
                <label class="confirmation-page__label">Surname *</label>
                <input class="checkout-input validationSensitive sessionInput" type="text"  maxlength="10" placeholder="Cornelien" filter="onlyLetters">
                <div class="confirmation-page__bottom-line"></div>
              </div>
            </div>
            <div class="confirmation-page__input-form">
              <label class="confirmation-page__label" >E-Mail *</label>
              <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="24" placeholder="manuel-corniel@mail.com">
              <div class="confirmation-page__bottom-line"></div>
            </div>
      
            <div class="confirmation-page__input-form">
              <label class="confirmation-page__label">Phone Number *</label>
              <input class="checkout-input validationSensitive sessionInput" type="text" maxlength="15" placeholder="312-412-34-76" filter="onlyNumbers">
              <div class="confirmation-page__bottom-line"></div>
            </div>
          </div>

          <div class="confirmation-page__buttons-wrapper">
            <button type="button" class="confirmation-page__pay-button pay-button next-page-button">
              <span>PAY</span>
              <span class="pay-button__total-sum">$450.00</span>
            </button>

            <button type="button" class="shipping-details__previous-page-button previous-page-button">
              <span class="previous-page-button__title">← Previous Step</span>
            </button>
          </div>

        </div>
      </div>        
    </div>
  `,
  loadingSpinner: `
    <div class="spinner-border text-light" style="width: 1em; height: 1em; border-width: .18em;" role="status">
      <span class="visually-hidden"></span>
    </div>
  `,
}