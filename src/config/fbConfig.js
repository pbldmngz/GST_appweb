import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyAh_1nahadyMVGyFn5uVk3Ibg6l1W6kP7U",
    authDomain: "gst-app-18bf6.firebaseapp.com",
    projectId: "gst-app-18bf6",
    storageBucket: "gst-app-18bf6.appspot.com",
    messagingSenderId: "313627774403",
    appId: "1:313627774403:web:b9f93efea81137b3570176"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase