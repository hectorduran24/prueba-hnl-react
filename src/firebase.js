import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAXQ2R80046HqurPXGCbt_pzfjJ3nMu4do",
    authDomain: "identidad-e4adb.firebaseapp.com",
    databaseURL: "https://identidad-e4adb-default-rtdb.firebaseio.com",
    projectId: "identidad-e4adb",
    storageBucket: "identidad-e4adb.appspot.com",
    messagingSenderId: "770638432896",
    appId: "1:770638432896:web:6051665b048f4a60bfb465"
  };
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();