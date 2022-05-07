import { initializeApp,  } from "firebase/app";
import "firebase/auth"
import { GoogleAuthProvider,  getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAxT6Nc4hQVUjt7Af3gkWhVJfEZaE9WFv0",
    authDomain: "fir-webapp-84101.firebaseapp.com",
    projectId: "fir-webapp-84101",
    storageBucket: "fir-webapp-84101.appspot.com",
    messagingSenderId: "842898172429",
    appId: "1:842898172429:web:d2b2e1cfdf701bf8700344",
    measurementId: "G-GCZESSSL1V"
};

console.log(initializeApp)

export const app = initializeApp(firebaseConfig)

 
export const auth = getAuth(app);
 

export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore()
 

