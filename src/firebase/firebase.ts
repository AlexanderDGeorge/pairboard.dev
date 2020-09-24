import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCeGM0QHwCzs4IXcr4aBhRzwdmqlQJXX2Y",
    authDomain: "pairboardio.firebaseapp.com",
    databaseURL: "https://pairboardio.firebaseio.com",
    projectId: "pairboardio",
    storageBucket: "pairboardio.appspot.com",
    messagingSenderId: "908809037876",
    appId: "1:908809037876:web:03af37b54aa5399dc74261",
    measurementId: "G-8WXW8ZD9J7",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore;
export const database = firebase.database;
export const fieldValue = firebase.firestore.FieldValue;
export const githubProvider = new firebase.auth.GithubAuthProvider();
