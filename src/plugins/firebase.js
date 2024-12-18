import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: `${process.env.VUE_APP_API_KEY}`,
    authDomain: `${process.env.VUE_APP_AUTH_DOMAIN}`,
    databaseURL: `${process.env.VUE_APP_DATABASE_URL}`,
    projectId: `${process.env.VUE_APP_PROJECT_ID}`,
    storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.VUE_APP_MESSAGING_SENDER_ID}`,
    appId:`${process.env.VUE_APP_APP_ID}` 
  };
//console.log({firebaseConfig});

  const app = initializeApp(firebaseConfig);
  //console.log(app);
  const auth = getAuth(app);
  export {  app, auth, signInWithEmailAndPassword  };