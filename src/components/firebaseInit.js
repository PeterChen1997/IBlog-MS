import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAs6CY9n878or18ojeER8HmdbxfvX1fVzM",
  authDomain: "blog-e0899.firebaseapp.com",
  databaseURL: "https://blog-e0899.firebaseio.com",
  projectId: "blog-e0899",
  storageBucket: "blog-e0899.appspot.com",
  messagingSenderId: "690213345287"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()