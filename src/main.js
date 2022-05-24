import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { collection, query, where, getDocs } from "firebase/firestore"

//import { getAnalytics } from "firebase/analytics";

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const firebaseConfig = {
  apiKey: "AIzaSyB6_-2J3s4ENxBluh6WJRWYgjNj-ul94wI",
  authDomain: "gynapp-be059.firebaseapp.com",
  projectId: "gynapp-be059",
  storageBucket: "gynapp-be059.appspot.com",
  messagingSenderId: "44835909881",
  appId: "1:44835909881:web:56dd40c2cf17d246237228",
  measurementId: "G-LX7KXE880B"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();

const usersCollection = db.collection('users')

export const createUser = async (uid) => {
  return usersCollection.add({
      uid: uid
  })
}

export const getUserById = async (id) => {
  try {
    const user = []

    let q = query(collection(db, "users"), where("uid", "==", id))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.data())
    })
    return user
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const getCategoriesById = async (id) => {
  try {
    const categories = []

    let q = query(collection(db, "users"), where("uid", "==", id))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      categories.push(doc.data().SymptomTypes)
    })
    return categories
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const getSymptomsByCategory = async (id, category) => {
  try {
    const allSymptoms = []
    const filteredSymptoms = []

    let q = query(collection(db, "users"), where("uid", "==", id))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      allSymptoms.push(doc.data().Symptoms)
    })

    for(let i = 0; i < allSymptoms[0].length; i++){
      if(allSymptoms[0][i].type == category.name){
        filteredSymptoms.push(allSymptoms[0][i])
      }
    }
    console.log(filteredSymptoms)

    return filteredSymptoms
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const createSymptom = async (id, name, type, icon) => {
  try {
    const user = []
    const symptoms = []

    let q = query(collection(db, "users"), where("uid", "==", id))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      symptoms.push(doc.data().Symptoms)
    })

    symptoms[0].push({
      name: name,
      reports: [{
        'intensity': 0,
        'time': '2022-05-18T13:01'
      }],
      type: type,
      icon: icon
    })

    usersCollection.doc(user[0]).update({
      Symptoms: symptoms[0]
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const createReport = async (id, trackerName, time, intensity, journal) => {
  try {
    const user = []
    const symptoms = []
    const symptom = []

    let q = query(collection(db, "users"), where("uid", "==", id))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      symptoms.push(doc.data().Symptoms)
    })

    for(let i = 0; i < symptoms[0].length; i++){
      if(symptoms[0][i].name == trackerName){
        symptom.push(symptoms[0][i])
        symptoms[0].splice(i, 1)
      }
    }

    if(journal){
      symptom[0].reports.push({
        'intensity': intensity,
        'time': time,
        'journal': journal
      })
    }else{
      symptom[0].reports.push({
        'intensity': intensity,
        'time': time  
      })
    }


    symptoms[0].push(symptom[0])

    usersCollection.doc(user[0]).update({
      Symptoms: symptoms[0]
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}
export const updateDrug = async (uid, trackerName) => {
  try {
    const user = []
    const symptoms = []
    const symptom = []

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      symptoms.push(doc.data().Symptoms)
    })

    for(let i = 0; i < symptoms[0].length; i++){
      if(symptoms[0][i].name == trackerName){
        symptom.push(symptoms[0][i])
        symptoms[0].splice(i, 1)
      }
    }

    let newTaken = symptom[0].taken + 1
    if(newTaken > symptom[0].amount){
      newTaken = 0
    }

    const newSymptom = {
      'amount': symptom[0].amount,
      'taken': newTaken,
      'dose': symptom[0].dose,
      'name': symptom[0].name,
      'type': symptom[0].type
    }


    symptoms[0].push(newSymptom)

    usersCollection.doc(user[0]).update({
      Symptoms: symptoms[0]
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}


export const reTypeSymptoms = async (uid, categoryName, newName) => {
  try {
    const user = []
    const symptoms = []
    const symptom = [] /* This can be more then one in this case */
    const unchangedSymptom = [] /* loops got messed up so this is the easiest fix */

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      symptoms.push(doc.data().Symptoms)
    })

    for(let i = 0; i < symptoms[0].length; i++){
      if(symptoms[0][i].type == categoryName){
        symptom.push(symptoms[0][i])
      }else{
        unchangedSymptom.push(symptoms[0][i])
      }
    }

    /* Ehmm we have to get the type aswell */
    for(let i = 0; i < symptom.length; i++){
      const newSymptom = {
        'icon': symptom[i].icon,
        'name': symptom[i].name,
        'reports': symptom[i].reports,
        'type': newName
      }
      console.log(newSymptom)
      unchangedSymptom.push(newSymptom)
    }

    console.log(unchangedSymptom)

    usersCollection.doc(user[0]).update({
      Symptoms: unchangedSymptom
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const deleteSymptomsByType = async (uid, type) => {
  try {
    const user = []
    const symptoms = []
    const symptom = [] /* This can be more then one in this case */
    const filteredSymptom = [] /* loops got messed up so this is the easiest fix */

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      symptoms.push(doc.data().Symptoms)
    })

    for(let i = 0; i < symptoms[0].length; i++){
      if(symptoms[0][i].type == type){
        symptom.push(symptoms[0][i])
      }else{
        filteredSymptom.push(symptoms[0][i])
      }
    }

    console.log('deleteSymptomsByType')
    console.log(filteredSymptom)

    usersCollection.doc(user[0]).update({
      Symptoms: filteredSymptom
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const editSymptomCategory = async (uid, categoryName, newName) => {
  try {
    const user = []
    const types = []
    const type = []

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      types.push(doc.data().SymptomTypes)
    })

    for(let i = 0; i < types[0].length; i++){
      if(types[0][i].name == categoryName){
        type.push(types[0][i])
        types[0].splice(i, 1)
      }
    }

    const newType = {
      'color': type[0].color,
      'name': newName,
      'order': type[0].order,
      'type': type[0].type
    }


    types[0].push(newType)

    reTypeSymptoms(uid, categoryName, newName)

    usersCollection.doc(user[0]).update({
      SymptomTypes: types[0]
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const editSymptom = async (uid, symptomName, newName) => {
  try {
    const user = []
    const symptoms = []
    const symptom = []

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      symptoms.push(doc.data().Symptoms)
    })

    for(let i = 0; i < symptoms[0].length; i++){
      if(symptoms[0][i].name == symptomName){
        symptom.push(symptoms[0][i])
        symptoms[0].splice(i, 1)
      }
    }

    const newSymptom = {
      'icon': symptom[0].icon,
      'name': newName,
      'reports': symptom[0].reports,
      'type': symptom[0].type
    }


    symptoms[0].push(newSymptom)

    usersCollection.doc(user[0]).update({
      Symptoms: symptoms[0]
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const deleteSymptomCategory = async (uid, categoryName) => {
  try {
    console.log('meeeeeeeeeeep! 0')
    console.log(uid)
    console.log(categoryName)
    const user = []
    const types = []
    const type = []

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      types.push(doc.data().SymptomTypes)
    })
    console.log('meeeeeeeeeeep! 1')

    for(let i = 0; i < types[0].length; i++){
      if(types[0][i].name == categoryName){
        type.push(types[0][i])
        types[0].splice(i, 1)
      }
    }
    console.log('meeeeeeeeeeep! 2')

    deleteSymptomsByType(uid, categoryName)

    console.log('deleteSymptomCategory')
    console.log(types[0])

    usersCollection.doc(user[0]).update({
      SymptomTypes: types[0]
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}

export const drugAutoReportAndDailyReset = async (uid) => {
  try {
    let types;
    let symptoms;
    
    const user = []
    const drugTypes = []
    const drugSymptoms = []
    const drugSymptomsIndexes = []

    let q = query(collection(db, "users"), where("uid", "==", uid))
    
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      user.push(doc.id)
      types = (doc.data().SymptomTypes)
      symptoms = (doc.data().Symptoms)
    })

    for(let i = 0; i < types.length; i++){
      if(types[i].type == "drug"){
        drugTypes.push(types[i])
      }
    }

    /* Drug symptoms are in drugSymptoms */
    for(let a = 0; a < drugTypes.length; a++){
      for(let i = 0; i < symptoms.length; i++){
        if(symptoms[i].type == drugTypes[a].name){
          drugSymptoms.push(symptoms[i])
          drugSymptomsIndexes.push(i)
        }
      }
    }

    /* order drugSymptomsIndexes 2 -> 1 */
    drugSymptomsIndexes.sort().reverse();

    /* None drug symptoms are in symptoms */
    for(let i = 0; i < drugSymptomsIndexes.length; i++){
      symptoms.splice(drugSymptomsIndexes[i], 1)
    }
    

    /* 
      Psuedo Code
      - if current day < lastUpdated
      - reports.push ( { lastUpdated, taken }  )
      - taken = 0
      - last lastUpdated = current day

      - if lastUpdated == 0{
          lastUpdated = currendt date
        }
    */
    const time = `${new Date().getFullYear()}${new Date().getMonth() < 10 ? "0" : ""}${new Date().getMonth()}${new Date().getDate() < 10 ? "0" : ""}${new Date().getDate()}`
    for(let i = 0; i < drugSymptoms.length; i++){
      /* Set default if none of the conditions are true */
      let newSymptom = {
        'amount': drugSymptoms[i].amount,
        'dose': drugSymptoms[i].dose,
        'lastUpdated': drugSymptoms[i].lastUpdated,
        'name': drugSymptoms[i].name,
        'reports': drugSymptoms[i].reports,
        'taken': drugSymptoms[i].taken,
        'type': drugSymptoms[i].type,
      }
      if(drugSymptoms[i].lastUpdated < time && drugSymptoms[i].lastUpdated != 0){
        /* Create a report and update lastUpdated */
        drugSymptoms[i].reports.push({
          'date': drugSymptoms[i].lastUpdated,
          'amount': drugSymptoms[i].amount,
          'taken': drugSymptoms[i].taken
        })
        newSymptom = {
          'amount': drugSymptoms[i].amount,
          'dose': drugSymptoms[i].dose,
          'lastUpdated': time,
          'name': drugSymptoms[i].name,
          'reports': drugSymptoms[i].reports,
          'taken': 0,
          'type': drugSymptoms[i].type,
        }
      }
      if(drugSymptoms[i].lastUpdated == 0){
        /* In case lastUpdated is null we initiate it */
        newSymptom = {
          'amount': drugSymptoms[i].amount,
          'dose': drugSymptoms[i].dose,
          'lastUpdated': time,
          'name': drugSymptoms[i].name,
          'reports': drugSymptoms[i].reports,
          'taken': drugSymptoms[i].taken,
          'type': drugSymptoms[i].type,
        }
      }

      symptoms.push(newSymptom)
    }

    usersCollection.doc(user[0]).update({
      Symptoms: symptoms
    });
  } 

  catch {
    err => console.error('This is burning🔥 ', err)
  }
}



const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});