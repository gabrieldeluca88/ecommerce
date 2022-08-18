import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBJDmAOhWHBEf8zt8Tn91bIsW9A-q9n6vo",
  authDomain: "ecommerceback-e6507.firebaseapp.com",
  projectId: "ecommerceback-e6507",
  storageBucket: "ecommerceback-e6507.appspot.com",
  messagingSenderId: "204345074785",
  appId: "1:204345074785:web:66adb519e7cf9b1c333620"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)