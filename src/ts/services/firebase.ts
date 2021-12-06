import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// These keys are safe to expose
const firebaseConfig = {
  apiKey: "AIzaSyBUdg6_AFyWGIBCu4AMpDW5o61RyQlYfwA",
  authDomain: "recipe-book-2a0f2.firebaseapp.com",
  projectId: "recipe-book-2a0f2",
  storageBucket: "recipe-book-2a0f2.appspot.com",
  messagingSenderId: "661086211967",
  appId: "1:661086211967:web:c191f0ae86418ac1b9d44a"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const database = getFirestore()
