import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB-l0isNiBd4Usy5_5d_u3xEycrlAZ5ExY",
    authDomain: "pairboarding.firebaseapp.com",
    databaseURL: "https://pairboarding.firebaseio.com",
    projectId: "pairboarding",
    storageBucket: "pairboarding.appspot.com",
    messagingSenderId: "729145675308",
    appId: "1:729145675308:web:49bb6fac1f02549c5b8b89",
    measurementId: "G-5PVRW8F963",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore;
export const storageRef = firebase.storage().ref;
export const fieldValue = firebase.firestore.FieldValue;
export const githubProvider = new firebase.auth.GithubAuthProvider();
