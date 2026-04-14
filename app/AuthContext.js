import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const inscription = async (email, motDePasse, nom) => {
    const result = await createUserWithEmailAndPassword(auth, email, motDePasse);
    await updateProfile(result.user, { displayName: nom });
    await setDoc(doc(db, 'users', result.user.uid), {
      nom,
      email,
      objectif: 'prise_masse',
      niveau: 'intermediaire',
      poids: '',
      taille: '',
      age: '',
      createdAt: new Date().toISOString(),
    });
    return result;
  };

  const connexion = async (email, motDePasse) => {
    return await signInWithEmailAndPassword(auth, email, motDePasse);
  };

  const deconnexion = async () => {
    await signOut(auth);
  };

  const mettreAJourProfil = async (donnees) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), donnees, { merge: true });
    setUserData(prev => ({ ...prev, ...donnees }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      inscription,
      connexion,
      deconnexion,
      mettreAJourProfil,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}