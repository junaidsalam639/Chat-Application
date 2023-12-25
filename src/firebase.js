import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm2vzf2hg7ZeVJhl4nBsJf08eF0OZfeDs",
  authDomain: "saylani-project-ca2b9.firebaseapp.com",
  projectId: "saylani-project-ca2b9",
  storageBucket: "saylani-project-ca2b9.appspot.com",
  messagingSenderId: "564765300631",
  appId: "1:564765300631:web:21476b0b94066fe870d6d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
