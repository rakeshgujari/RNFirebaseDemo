/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaM1fccKKsZwPUbJ7wGKTv_KXW_2xVpHU",
    authDomain: "reactnativedemo-e4884.firebaseapp.com",
    databaseURL: "https://reactnativedemo-e4884.firebaseio.com",
    projectId: "reactnativedemo-e4884",
    storageBucket: "reactnativedemo-e4884.appspot.com",
    messagingSenderId: "432048374345"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;