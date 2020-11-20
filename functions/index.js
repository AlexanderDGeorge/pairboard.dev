const functions = require('firebase-functions');
const algolia = require('algoliasearch');

const APP_ID = functions.config().algolia.appid;
const ADMIN_KEY = functions.config().algolia.apikey;

const algoliaClient = algolia(APP_ID, ADMIN_KEY);
const index = algoliaClient.initIndex('users');

exports.addUserIndex = functions.firestore.document('users/{uid}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        const { username, blurb, photoURL } = data;
        return index.saveObject({
            username, blurb, photoURL, objectID: snapshot.id
        })
    });

exports.updateUserIndex = functions.firestore.document('users/{uid}')
    .onUpdate(snapshot => {
        console.log(snapshot);
        const data = snapshot.after.data();
        const { username, blurb, photoURL } = data;
        return index.saveObject({
            username, blurb, photoURL, objectID: snapshot.id
        })
    });

exports.deleteUserIndex = functions.firestore.document('users/{uid}')
    .onDelete(snapshot => index.deleteObject(snapshot.id));