import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
// import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCbdNrcuBGDVF8-iL9UxCgsCFCbTGhoJS8",
    authDomain: "pairboarddev.firebaseapp.com",
    databaseURL: "https://pairboarddev.firebaseio.com",
    projectId: "pairboarddev",
    storageBucket: "pairboarddev.appspot.com",
    messagingSenderId: "384687900425",
    appId: "1:384687900425:web:7d09aa9aab471725f975d8",
    measurementId: "G-D1V3YVRD2Q",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export const firestore = firebase.firestore;
export const database = firebase.database;
// export const messaging = firebase.messaging();
export const fieldValue = firebase.firestore.FieldValue;
export const githubProvider = new firebase.auth.GithubAuthProvider();

// messaging
//     // @ts-ignore
//     .getToken({
//         vapidKey:
//             "BLKvDddpquwQV6R2QYTrKJAN7zUx0e36PhvyMkW-mI_MhtCkKVtJzk01wn1Gxn7nNxJNQzHjZl7z4DIJZdS82r4",
//     })
//     .then((currentToken) => {
//         console.log(currentToken);
//         if (currentToken) {
//         }
//     });

// messaging.onMessage((payload) => {
//     console.log("message", payload);
// });
