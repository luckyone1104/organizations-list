export default class Model {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyBEyr9GBrH9cKj0qYu-2v55DLzkIyDNZu4",
      authDomain: "checkout-modal-4a540.firebaseapp.com",
      databaseURL: "https://checkout-modal-4a540-default-rtdb.firebaseio.com",
      projectId: "checkout-modal-4a540",
      storageBucket: "checkout-modal-4a540.appspot.com",
      messagingSenderId: "499882402690",
      appId: "1:499882402690:web:1c2e1715d7fbbc66f8e59b"
    };

   this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  async init() {
    this.initFirebase();
    this.db = firebase.firestore();

    await this.getData();
    
    this.ready = true;
  }

  initFirebase() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(this.firebaseConfig);
    }
  }

  async getData() {
    this.organizationList = await this.getOrganizationList();
    this.modifyData();
  }

  async getOrganizationList() {
    const snapshot = await this.db.collection('organizations').get();
    return snapshot.docs.map(doc => {
      let modifiedDoc = doc.data();
      modifiedDoc.fireId = doc.id;
      return modifiedDoc;
    });
  }

  modifyData() {
    this.organizationList.sort(this.sortByAscendingId);
    if (!this.areIdsOrdered(this.organizationList)) this.orderIds(this.organizationList);
  }

  async getOrganization(name) {
    const snapshot = await this.db.collection('organizations').where('name', '==', name).get();
    const organizations = snapshot.docs.map(doc => doc.data());
    return organizations[0];
  }

  async updateOrganization(id, data) {
    await this.db.collection('organizations').doc(id).update(data);
  }

  async createOrganization(organization) {
    await this.db.collection('organizations').add(organization);
  }

  async deleteOrganization(id) {
    await this.db.collection('organizations').doc(id).delete();
  }

  deleteOrganizations(name) {
    var db = this.db;

    this.db.collection('organizations').where('name','==', name).get()
      .then(function(querySnapshot) {
            var batch = db.batch();

            querySnapshot.forEach(function(doc) {
                batch.delete(doc.ref);
            });

            return batch.commit();
      }).then(function() {
    }); 
  }

  areIdsOrdered(organizations) {  
    return organizations.every( (organization, index) => {
      return (organization.id === index + 1) ? true : false;
    });
  }

  orderIds(organizations) {
    organizations.forEach((organization, index) => {
      organization.id = index + 1;
      this.updateOrganization(organization.fireId, { id : organization.id });
    });
  }

  sortByAscendingId(a, b) {
    return a.id > b.id ? 1 : -1;
  }

  sortByDescendingId(a, b) {
    return a.id > b.id ? -1 : 1;
  }

  sortByAscendingName(a, b) {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  }

  sortByDescendingName(a, b) {
    return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
  }

  sortByAscendingDate(a, b) {
    return a.creationDate.seconds > b.creationDate.seconds ? 1 : -1;
  }

  sortByDescendingDate(a, b) {
    return a.creationDate.seconds > b.creationDate.seconds ? -1 : 1;
  }

  isValid(inputs) { //WORKING WITH DOM!
    const result = {
      status : true,
      inputs: []
    }

    Object.entries(inputs).forEach( ([key, input]) => {
      if (input.value === '' || input.value.match(/^ +$/))  {
        result.inputs.push(input);
        result.status = false;
      }
    });

    return result;
  }
}