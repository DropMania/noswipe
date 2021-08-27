import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBHZi0iLH9GWt5pcGS7n7imCTylvT5jxC0",
  authDomain: "noswipe.firebaseapp.com",
  projectId: "noswipe",
  storageBucket: "noswipe.appspot.com",
  messagingSenderId: "79092480203",
  appId: "1:79092480203:web:7ec3145129695463ed834e",
  measurementId: "G-HMWJDH1C5F"
};

const app = initializeApp(firebaseConfig)

export default app