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

export const getUserById = async (id) => {
  try {
    console.log('meep')
    const user = []
    console.log('user', user)

    let q = query(collection(db, "users"), where("uid", "==", id))
    console.log('user', q)
    
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

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});