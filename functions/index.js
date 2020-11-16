const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('users');

exports.addToIndex = functions.firestore.document('users/{uid}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        const { username, blurb, connections, photoURL, uid } = data;
        return index.addObject({
            username, blurb, connections, photoURL, uid
        })
    });

exports.updateIndex = functions.firestore.document('users/{uid}')
    .onUpdate(snapshot => {
        const newData = snapshot.after.data();
        const { username, blurb, connections, photoURL, uid } = newData;
        return index.saveObject({
            username, blurb, connections, photoURL, uid
        })
    });

exports.deleteFromIndex = functions.firestore.document('users/{uid}')
    .onDelete(snapshot => index.deleteObject(snapshot.id));