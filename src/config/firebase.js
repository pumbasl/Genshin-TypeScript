import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAlkNOY85PQ9d-A5VZbmUIlEh-Yzczx5Ik",
  authDomain: "genshin-promo.firebaseapp.com",
  projectId: "genshin-promo",
  storageBucket: "genshin-promo.appspot.com",
  messagingSenderId: "441152080604",
  appId: "1:441152080604:web:d394d990ab490f7a098219",
  measurementId: "G-HYNJLJ8Z56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lf6hMQcAAAAAHcejRuraQ6P8bvbWEppbVa_0Pj_'),
  isTokenAutoRefreshEnabled: true
});

//storage
export const storage = getStorage(app);
//

//push alerts
const messaging = getMessaging(app);

export const getTokenCheck = async () => {
  return await getToken(messaging, { vapidKey: "BMD_9O2xKKIJXYiA4LNUdKeVEjydSrAATwwqb3hk5TwENSS4BoaAshtITxaEuLkhCkCAsW7TArerJIsMywyoyuE" })
  .then((currentToken) => {
    if(currentToken){
      return;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
//