import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './AuthContext';

export default function Login() {
  const { inscription, connexion } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [nom, setNom] = useState('');
  const [loading, setLoading] = useState(false);

  const continuer = async () => {
    if (!email || !motDePasse) {
      Alert.alert('Champs manquants', 'Remplis tous les champs.');
      return;
    }
    if (mode === 'register' && !nom) {
      Alert.alert('Champs manquants', 'Entre ton nom.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await connexion(email, motDePasse);
      } else {
        await inscription(email, motDePasse, nom);
      }
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.brand}>NLT</Text>
        <Text style={styles.titre}>
          {mode === 'login' ? 'Connexion' : 'Inscription'}
        </Text>
        <Text style={styles.sous}>
          {mode === 'login' ? 'Content de te revoir' : 'Rejoins la communaute NLT'}
        </Text>

        {mode === 'register' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Ton nom"
              placeholderTextColor="#444"
              value={nom}
              onChangeText={setNom}
              autoCapitalize="words"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="ton@email.com"
            placeholderTextColor="#444"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#444"
            value={motDePasse}
            onChangeText={setMotDePasse}
            secureTextEntry
          />
        </View>

        {mode === 'login' && (
          <TouchableOpacity style={styles.oublie}>
            <Text style={styles.oublieText}>Mot de passe oublie ?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={continuer}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>
              {mode === 'login' ? 'Se connecter' : "S'inscrire"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.separateur}>
          <View style={styles.ligne} />
          <Text style={styles.ou}>ou</Text>
          <View style={styles.ligne} />
        </View>

        <TouchableOpacity
          style={styles.btnSecondaire}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.btnSecondaireText}>Continuer sans compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switch}
          onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          <Text style={styles.switchText}>
            {mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Deja un compte ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', letterSpacing: 4, marginBottom: 32 },
  titre: { color: '#fff', fontSize: 30, fontWeight: 'bold', marginBottom: 8 },
  sous: { color: '#666', fontSize: 15, marginBottom: 40 },
  inputContainer: { marginBottom: 20 },
  label: { color: '#aaa', fontSize: 13, marginBottom: 8, fontWeight: '600' },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  oublie: { alignSelf: 'flex-end', marginBottom: 28 },
  oublieText: { color: '#E63946', fontSize: 13 },
  btn: {
    backgroundColor: '#E63946',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  separateur: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  ligne: { flex: 1, height: 1, backgroundColor: '#222' },
  ou: { color: '#444', fontSize: 13 },
  btnSecondaire: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  btnSecondaireText: { color: '#aaa', fontSize: 15 },
  switch: { alignItems: 'center' },
  switchText: { color: '#E63946', fontSize: 14 },
});