import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQndbdls88GCqdNM977sv4IjQwgXPtWaY",
  authDomain: "social-media-project-92d0c.firebaseapp.com",
  projectId: "social-media-project-92d0c",
  storageBucket: "social-media-project-92d0c.appspot.com",
  messagingSenderId: "681523067373",
  appId: "1:681523067373:web:1f99b2a9e30dbfa3fc8fe4",
  measurementId: "G-XD7X9H4FJ9",
};

export const auth = firebase.initializeApp(firebaseConfig).auth();

export const projectStorage = firebase.storage();
export const projectFireStore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
