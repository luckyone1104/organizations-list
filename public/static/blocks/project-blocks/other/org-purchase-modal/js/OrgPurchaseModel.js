export default class OrganizationPaymentModel {
  constructor() {
    this.paymentData = {};
  }

  async init() {
    this.db = firebase.database();
    await this.getData();
    this.modifyData();
  }

  async getData() {
    // this.doesSessionDataExist() ? this.setDataFromSessioinStorage() : await this.setDataFromServer();
    this.paymentData = await this.queryData();
  }

  modifyData() {
    this.paymentData.countries = this.createHTMLOptions(this.paymentData.countries);

    let modifiedCardNumber = this.paymentData.creditCardDefaults.number.split(' ');
    this.paymentData.creditCardDefaults.number = modifiedCardNumber;
  }

  doesSessionDataExist() {
    return (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== 'undefined') ? true : false;
  }

  setDataFromSessioinStorage() {
    console.log('Setting data from session storage...');
    this.paymentData = JSON.parse(sessionStorage.getItem('data'));
  }

  async setDataFromServer() {
    console.log('Downloading data from server...');
    this.paymentData = await this.getServerData();
  }

  async getServerData() {
    const serverData = await this.queryData();

    this.modifyData(serverData);
    this.saveDataToSessionStorage(serverData)

    return serverData;
  }

  saveDataToSessionStorage(data) {
    sessionStorage.setItem('data', JSON.stringify(data));
  }

  queryData() {
    return this.db.ref().get().then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  saveInputsData(currentTab, values) {
    if (values && values.length > 0) {
      sessionStorage.setItem(currentTab, JSON.stringify(values));
    }
  }

  deleteInputsData() {
    for (let i = 0; i < 3; i++) {
      sessionStorage.removeItem(i);
    }
  }

  createHTMLOptions(optionsArray) {
    let result = '';
    optionsArray.forEach(option => {
      result += `<option value="${option}">${option}</option>\n`;
    });
    return result;
  }

  listenToDataUpdates() {
     setInterval(async () => {
      let serverData = await this.getServerData();
      this.compareData(serverData);
    }, this.updateInterval);
  }

  compareData(serverData) {
    if (JSON.stringify(serverData) !== JSON.stringify(this.paymentData)) {
      console.log('Updating local data...');

      sessionStorage.setItem('data', JSON.stringify(serverData));
      this.paymentData = JSON.parse(sessionStorage.getItem('data'));

      window.app.observer.callEvent('updateData');
    }
  }

  isValid(inputsForValidation) {
    let isValid = {
      status : true,
      inputs: []
    };

    for (let input of inputsForValidation) {
      if (this.isEmpty(input) || !this.isMinLegth(input)) {
        isValid.status = false;
        isValid.inputs.push(input);
      }
    }

    return isValid;
  }

  isMinLegth(input) {
    return input.getAttribute('minlength') ? input.value.length >= +input.getAttribute('minlength') : true;
  }

  isEmpty(input) {
    return input.value === '';
  }

  filterOnlyNumbers(stringToFilter) {
    return (stringToFilter.match(/\d+/g)) ? stringToFilter.match(/\d+/g).join('') : null;
  }

  putSpacesInCreditCardNumber(filteredString) {
    if (!filteredString) return null;
  
    let positionInString = 0;
    let stringWithSpaces = '';
  
    for (let i = positionInString; i < filteredString.length; i++) {
      switch(positionInString) {
        case 4:
          stringWithSpaces += ' ';
          positionInString++;
          break;
        case 9:
          stringWithSpaces += ' ';
          positionInString++;
          break;
        case 14:
          stringWithSpaces += ' ';
          positionInString++;
          break;
      }
      stringWithSpaces += filteredString[i];
      positionInString++;
    }
  
    return stringWithSpaces;
  }

  putSlashBetweenDates(filteredString) {
    if (!filteredString) return null;
  
    let positionInString = 0;
    let stringWithSlash = '';  
  
    for (let i = positionInString; i < filteredString.length; i++) {
      if (positionInString == 2) {
        stringWithSlash += '/';
        positionInString++;
      }
  
      stringWithSlash += filteredString[i];
      positionInString++;
    }
  
    return stringWithSlash;
  }

  isEmailValid(stringToFilter) {
    //const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  }

  filterLettersAndSpaces(stringToFilter) {
    // Filters Letters And Single Spaces Beween Them
    if (stringToFilter[0] == ' ') return null;
  
    let result;
  
    if (this.hasDoubleSpacesInLastTwoCharacters(stringToFilter)) {
      result = this.removeDoubleSpaces(stringToFilter)
    }
  
    if (result) {
      return result.match(/[ a-zA-Z]+/g) ? result.match(/[ a-zA-Z]+/g).join('') : null;
    }
    return stringToFilter.match(/[ a-zA-Z]+/g) ? stringToFilter.match(/[ a-zA-Z]+/g).join('') : null;
  }

  hasDoubleSpacesInLastTwoCharacters(stringToCheck) {
    if (stringToCheck.length < 2) return false;
    if (stringToCheck[stringToCheck.length - 1] == ' '
    && stringToCheck[stringToCheck.length - 1] == stringToCheck[stringToCheck.length - 2]) return true;
    return false;
  }

  removeDoubleSpaces(stringToFilter) {
    let result = stringToFilter.split('');
    result.pop();
    return result.join('');
  }
}