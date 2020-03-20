import firebase from 'firebase/app'

import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import "firebase/auth"
import "firebase/functions"

var config = {
    apiKey: "AIzaSyDULgg9oarIWldmJPw0wio8wQlWWvvJZEo",
    authDomain: "pthg-6750e.firebaseapp.com",
    databaseURL: "https://pthg-6750e.firebaseio.com",
    projectId: "pthg-6750e",
    storageBucket: "pthg-6750e.appspot.com",
    messagingSenderId: "961587834250"
};

const firebaseApp = firebase.initializeApp(config)

// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export default firebaseApp

export const dbAuth = firebaseApp.auth()   // - 身份验证
export const dbDatabase = firebaseApp.database()  // - 实时数据库
export const dbFirestore = firebaseApp.firestore()  // - Cloud Firestore
export const dbStorage = firebaseApp.storage()  // - Cloud Storage
// export const dbMessaging = firebaseApp.messaging // - 云消息传递
export const dbFunctions = firebaseApp.functions() // - Cloud Functions

export const databaseName = "TLFM"
export const databaseName2 = "TLFMCDV3" //MYAPP
// export const databaseName = "TLFMCDV3"




