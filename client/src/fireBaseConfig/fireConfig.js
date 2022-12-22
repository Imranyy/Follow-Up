
import { initializeApp } from "firebase/app";
import{getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyC6sY3wkAevEA-oE2omgYmHKsewuDj2I-k",
  authDomain: "follow-up-com.firebaseapp.com",
  projectId: "follow-up-com",
  storageBucket: "follow-up-com.appspot.com",
  messagingSenderId: "917377564049",
  appId: "1:917377564049:web:e4cc37a76938e4d6eeee30",
  measurementId: "G-R5JVNDZ3GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage=getStorage(app);


export{ projectStorage,ref,getDownloadURL,uploadBytesResumable};