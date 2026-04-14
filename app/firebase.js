import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDNtTJj641pv6gaoy896kXTR-FdomrtkUo',
  authDomain: 'nolimitstrainings.firebaseapp.com',
  projectId: 'nolimitstrainings',
  storageBucket: 'nolimitstrainings.firebasestorage.app',
  messagingSenderId: '1029941951455',
  appId: '1:1029941951455:web:63d1310443c40203d6626a',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;