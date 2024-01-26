import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
export const firebaseConfig = {
  apiKey: 'AIzaSyAU_zcxzBSoX_TMthtVtRJ6RF6ozWrn-Wo',
  authDomain: 'graphiql-app-24102.firebaseapp.com',
  projectId: 'graphiql-app-24102',
  storageBucket: 'graphiql-app-24102.appspot.com',
  messagingSenderId: '907793083036',
  appId: '1:907793083036:web:16705fbdbf9b52ad789b59',
  measurementId: 'G-KJQS4PQ683',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);