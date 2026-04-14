import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chargerUtilisateur();
  }, []);

  const chargerUtilisateur = async () => {
    try {
      const data = await AsyncStorage.getItem('nlt_user');
      if (data) setUser(JSON.parse(data));
    } catch (e) {
      console.log('Erreur chargement user:', e);
    }
    setLoading(false);
  };

  const inscription = async (email, motDePasse, nom) => {
    const nouvelUser = {
      id: Date.now().toString(),
      nom,
      email,
      objectif: 'prise_masse',
      niveau: 'intermediaire',
      poids: '',
      taille: '',
      age: '',
      createdAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem('nlt_user', JSON.stringify(nouvelUser));
    setUser(nouvelUser);
    return nouvelUser;
  };

  const connexion = async (email, motDePasse) => {
    const data = await AsyncStorage.getItem('nlt_user');
    if (!data) throw new Error('Aucun compte trouve');
    const savedUser = JSON.parse(data);
    if (savedUser.email !== email) throw new Error('Email incorrect');
    setUser(savedUser);
    return savedUser;
  };

  const deconnexion = async () => {
    await AsyncStorage.removeItem('nlt_user');
    setUser(null);
  };

  const mettreAJourProfil = async (donnees) => {
    const updated = { ...user, ...donnees };
    await AsyncStorage.setItem('nlt_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
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