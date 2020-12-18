import firebase from 'firebase/app';

// importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyCbdNrcuBGDVF8-iL9UxCgsCFCbTGhoJS8',
    authDomain: 'pairboarddev.firebaseapp.com',
    databaseURL: 'https://pairboarddev.firebaseio.com',
    projectId: 'pairboarddev',
    storageBucket: 'pairboarddev.appspot.com',
    messagingSenderId: '384687900425',
    appId: '1:384687900425:web:7d09aa9aab471725f975d8',
    measurementId: 'G-D1V3YVRD2Q',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload,
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
    };

    // self.registration.showNotification(notificationTitle, notificationOptions);
});
