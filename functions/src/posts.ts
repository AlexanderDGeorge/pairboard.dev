import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
// const messaging = admin.messaging();
const fieldValue = admin.firestore.FieldValue;

exports.subscribeToPost = functions.https.onCall((data, context) => {
    if (!context.auth) {
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
    db.collection('posts')
        .doc(data.postId)
        .update({
            subscribers: fieldValue.arrayUnion(context.auth.uid),
        });
});

exports.unsubscribeToPost = functions.https.onCall((data, context) => {
    if (!context.auth) {
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
    db.collection('posts')
        .doc(data.postId)
        .update({
            subscribers: fieldValue.arrayRemove(context.auth.uid),
        });
    // messaging.unsubscribeFromTopic();
});
