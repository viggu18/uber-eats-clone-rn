import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAlrH-3V0gMMLhvNbwdSdXOy482qexX2Gs",
  authDomain: "uber-clone-b39f1.firebaseapp.com",
  projectId: "uber-clone-b39f1",
  storageBucket: "uber-clone-b39f1.appspot.com",
  messagingSenderId: "508623467060",
  appId: "1:508623467060:web:fe94077d4e3252e0be9061"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;