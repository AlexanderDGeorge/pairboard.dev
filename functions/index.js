const functions = require('firebase-functions');
const algolia = require('algoliasearch');

const APP_ID = functions.config().algolia.appid;
const ADMIN_KEY = functions.config().algolia.apikey;

const algoliaClient = algolia(APP_ID, ADMIN_KEY);
const userIndex = algoliaClient.initIndex('users');
const postIndex = algoliaClient.initIndex('posts');

exports.addUserIndex = functions.firestore.document('users/{uid}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        const { username, email, name, blurb, photoURL } = data;
        return userIndex.saveObject({
            username, email, name, blurb, photoURL, objectID: snapshot.id
        })
    });

exports.updateUserIndex = functions.firestore.document('users/{uid}')
    .onUpdate(snapshot => {
        const data = snapshot.after.data();
        const { username, email, name, blurb, photoURL } = data;
        return userIndex.saveObject({
            username, email, name, blurb, photoURL, objectID: snapshot.after.id
        })
    });

exports.deleteUserIndex = functions.firestore.document('users/{uid}')
    .onDelete(snapshot => userIndex.deleteObject(snapshot.id));

exports.addPostIndex = functions.firestore.document('posts/{postId}')
    .onCreate(snapshot => {
        const data = snapshot.data();
        return postIndex.saveObject({
            ...data, objectID: snapshot.id
        })
    })

exports.updatePostIndex = functions.firestore.document('posts/{postId}')
    .onUpdate(snapshot => {
        const data = snapshot.after.data();
        return postIndex.saveObject({
            ...data, objectID: snapshot.after.id
        })
    })

exports.deletePostIndex = functions.firestore.document('posts/{postId}')
    .onDelete(snapshot => postIndex.deleteObject(snapshot.id))