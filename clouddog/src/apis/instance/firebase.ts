import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCjRHU9saXEX7V6FGUCyKNPTJhbZeVLax4',
  authDomain: 'goorm-project-6f5f2.firebaseapp.com',
  projectId: 'goorm-project-6f5f2',
  storageBucket: 'goorm-project-6f5f2.appspot.com',
  messagingSenderId: '757523042285',
  appId: '1:757523042285:web:d2ca1e87088e9e458761e4',
  measurementId: 'G-NRS972KF06',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
