import firebase from 'firebase'
import firebaseConfig from './firebaseEnv.json'

// firebase init
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const recordsCollection = db.collection('records')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
  db,
  auth,
  usersCollection,
  recordsCollection,
  commentsCollection,
  likesCollection
}