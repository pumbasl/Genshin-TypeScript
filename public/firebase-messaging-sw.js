// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
let firebaseConfig = {
    apiKey: "AIzaSyAlkNOY85PQ9d-A5VZbmUIlEh-Yzczx5Ik",
    authDomain: "genshin-promo.firebaseapp.com",
    projectId: "genshin-promo",
    storageBucket: "genshin-promo.appspot.com",
    messagingSenderId: "441152080604",
    appId: "1:441152080604:web:d394d990ab490f7a098219",
    measurementId: "G-HYNJLJ8Z56"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});