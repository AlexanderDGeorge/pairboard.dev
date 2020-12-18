import * as functions from 'firebase-functions';
import algolia from 'algoliasearch';

const APP_ID = functions.config().algolia.appid;
const ADMIN_KEY = functions.config().algolia.apikey;

const algoliaClient = algolia(APP_ID, ADMIN_KEY);
const devIndex = algoliaClient.initIndex('devs');
// const postIndex = algoliaClient.initIndex('posts');

export const addDevIndex = functions.firestore
    .document('devs/{devId}/profile/{profileId}')
    .onCreate(async (snapshot) => {
        const data = snapshot.data();
        await devIndex.saveObject({ ...data, objectID: snapshot.id });
    });
export const updateDevIndex = functions.firestore
    .document('devs/{devId}/profile/{profileId}')
    .onUpdate(async (snapshot) => {
        const data = snapshot.after.data();
        await devIndex.saveObject({ ...data, objectID: snapshot.after.id });
    });
