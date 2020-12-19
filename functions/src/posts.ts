import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const messaging = admin.messaging();
const fieldValue = admin.firestore.FieldValue;

exports.subscribeToPost = functions.https.onCall((data, context) => {
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

exports.unsubscribeToPost = functions.https.onCall((data, context) => {
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
        console.error(err.log);
        return err.message;
    }
    return 'successfully subscribed';
});
