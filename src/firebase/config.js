import firebase from 'firebase';
import 'firebase/auth' 
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAdk3TSu0Q_wO8lL8_C_5juotbcO2gauxc",
    authDomain: "fir-58ddb.firebaseapp.com",
    projectId: "fir-58ddb",
    storageBucket: "fir-58ddb.appspot.com",
    messagingSenderId: "50987767697",
    appId: "1:50987767697:web:40460f79935d137587ec30",
    measurementId: "G-GNL6K25538"
  };

  export default firebase.initializeApp(firebaseConfig)