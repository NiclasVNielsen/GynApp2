import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);