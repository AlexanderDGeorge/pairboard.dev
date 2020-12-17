const functions = require('firebase-functions');

exports.updateDevProfile = functions.firestore.document('devs/{uid}');
