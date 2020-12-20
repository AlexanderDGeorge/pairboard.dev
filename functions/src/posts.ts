import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const messaging = admin.messaging();
const fieldValue = admin.firestore.FieldValue;

export const subscribeToPost = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'must be authenticated',
        );
    }
    if (!data.postId || !data.token) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'postId and token required',
        );
    }
    try {
        db.collection('posts')
            .doc(data.postId)
            .update({
                subscribers: fieldValue.arrayUnion(context.auth.uid),
            });
        messaging.subscribeToTopic([data.token], data.postId).then();
    } catch (err) {
        console.error(err.message);
        return err.message;
    }
    return 'successfully subscribed';
});

export const unsubscribeFromPost = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'must be authenticated',
        );
    }
    if (!data.postId || !data.token) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'postId and token required',
        );
    }
    try {
        db.collection('posts')
            .doc(data.postId)
            .update({
                subscribers: fieldValue.arrayRemove(context.auth.uid),
            });
        messaging.unsubscribeFromTopic([data.token], data.postId);
    } catch (err) {
        console.error(err.message);
        return err.message;
    }
    return 'successfully unsubscribed';
});

export const joinPostRoom = functions.https.onCall(async (data, context) => {
    const uid = context.auth?.uid;
    if (!context.auth || !uid) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'must be authenticated',
        );
    }
    if (!data.postId) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'postId required',
        );
    }
    if (!data.profile) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'profile required',
        );
    }
    try {
        await db
            .collection('posts')
            .doc(data.postId)
            .update({
                occupants: fieldValue.arrayUnion(data.profile),
            });
        await db.collection('devs').doc(uid).update({
            roomId: data.postId,
        });
        return 'joined room';
    } catch (err) {
        console.error(err.message);
        return err.message;
    }
});

export const leavePostRoom = functions.https.onCall((data, context) => {
    const uid = context.auth?.uid;
    if (!context.auth || !uid) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'must be authenticated',
        );
    }
    if (!data.postId) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'postId required',
        );
    }
    if (!data.profile) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'profile required',
        );
    }
    try {
        db.collection('posts')
            .doc(data.postId)
            .update({
                occupants: fieldValue.arrayRemove(data.profile),
            });
        db.collection('devs').doc(uid).update({
            roomId: fieldValue.delete(),
        });
    } catch (err) {
        console.error(err.message);
    }
});
