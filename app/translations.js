import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { useLangue } from './LangueContext';
import { TRADUCTIONS } from './translations';

const LANGUES = [
  { id: 'fr' },
  { id: 'en' },
  { id: 'es' },
  { id: 'pt' },
  { id: 'de' },
  { id: 'nl' },
  { id: 'ar' },
  { id: 'ja' },
  { id: 'zh' },
  { id: 'ko' },
  { id: 'hi' },
];

const THEMES = ['sombre', 'clair', 'automatique'];

export default function Parametres() {
  const { langue, setLangue, t } = useLangue();
  const [theme, setTheme] = useState('dark');
  const [notifSeance, setNotifSeance] = useState(true);
  const [notifNutrition, setNotifNutrition] = useState(false);
  const [notifCoach, setNotifCoach] = useState(true);
  const [biometrie, setBiometrie] = useState(false);
  const [donneesPartagees, setDonneesPartagees] = useState(false);

  const confirmerSuppression = () => {
    Alert.alert(
      t.supprimerCompte,
      'Cette action est irreversible.',
      [
        { text: t.annuler, style: 'cancel' },
        { text: t.supprimerCompte, style: 'destructive', onPress: () => router.replace('/login') },
      ]
    );
  };

  const confirmerDeconnexion = () => {
    Alert.alert(
      t.deconnexion,
      '',
      [
        { text: t.annuler, style: 'cancel' },
        { text: t.seDeconnecter, onPress: () => router.replace('/login') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>{t.retour}</Text>
      </TouchableOpacity>

      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>{t.parametres}</Text>

      {/* Langue */}
      <Text style={styles.sectionTitle}>{t.langue}</Text>
      <View style={styles.card}>
        {LANGUES.map((l, i) => {
          const trad = TRADUCTIONS[l.id];
          return (
            <TouchableOpacity
              key={l.id}
              style={[styles.optionRow, i < LANGUES.length - 1 && styles.optionRowBorder]}
              onPress={() => setLangue(l.id)}
            >
              <View style={styles.langueRow}>
                <Text style={styles.drapeau}>{trad.drapeau}</Text>
                <Text style={styles.optionLabel}>{trad.nom}</Text>
              </View>
              <View style={[styles.radio, langue === l.id && styles.radioActif]}>
                {langue === l.id && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Theme */}
      <Text style={styles.sectionTitle}>{t.theme}</Text>
      <View style={styles.card}>
        {THEMES.map((th, i) => (
          <TouchableOpacity
            key={th}
            style={[styles.optionRow, i < THEMES.length - 1 && styles.optionRowBorder]}
            onPress={() => setTheme(th)}
          >
            <Text style={styles.optionLabel}>{t[th]}</Text>
            <View style={[styles.radio, theme === th && styles.radioActif]}>
              {theme === th && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications */}
      <Text style={styles.sectionTitle}>{t.notifications}</Text>
      <View style={styles.card}>
        <View style={[styles.switchRow, styles.optionRowBorder]}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Rappels de seances</Text>
          </View>
          <Switch
            value={notifSeance}
            onValueChange={setNotifSeance}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={notifSeance ? '#fff' : '#666'}
          />
        </View>
        <View style={[styles.switchRow, styles.optionRowBorder]}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Rappels nutrition</Text>
          </View>
          <Switch
            value={notifNutrition}
            onValueChange={setNotifNutrition}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={notifNutrition ? '#fff' : '#666'}
          />
        </View>
        <View style={styles.switchRow}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Messages coach</Text>
          </View>
          <Switch
            value={notifCoach}
            onValueChange={setNotifCoach}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={notifCoach ? '#fff' : '#666'}
          />
        </View>
      </View>

      {/* Securite */}
      <Text style={styles.sectionTitle}>{t.securite}</Text>
      <View style={styles.card}>
        <View style={[styles.switchRow, styles.optionRowBorder]}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Face ID / Touch ID</Text>
          </View>
          <Switch
            value={biometrie}
            onValueChange={setBiometrie}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={biometrie ? '#fff' : '#666'}
          />
        </View>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionLabel}>Changer le mot de passe</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Confidentialite */}
      <Text style={styles.sectionTitle}>{t.confidentialite}</Text>
      <View style={styles.card}>
        <View style={[styles.switchRow, styles.optionRowBorder]}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchLabel}>Partage de donnees</Text>
          </View>
          <Switch
            value={donneesPartagees}
            onValueChange={setDonneesPartagees}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={donneesPartagees ? '#fff' : '#666'}
          />
        </View>
        <TouchableOpacity style={[styles.optionRow, styles.optionRowBorder]}>
          <Text style={styles.optionLabel}>Politique de confidentialite</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionLabel}>Conditions d utilisation</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* A propos */}
      <Text style={styles.sectionTitle}>{t.aPropos}</Text>
      <View style={styles.card}>
        <View style={[styles.optionRow, styles.optionRowBorder]}>
          <Text style={styles.optionLabel}>{t.version}</Text>
          <Text style={styles.optionValeur}>1.0.0</Text>
        </View>
        <View style={[styles.optionRow, styles.optionRowBorder]}>
          <Text style={styles.optionLabel}>{t.developpeur}</Text>
          <Text style={styles.optionValeur}>NLT Team</Text>
        </View>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionLabel}>Noter l application</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Compte */}
      <Text style={styles.sectionTitle}>{t.compte}</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.optionRow, styles.optionRowBorder]}
          onPress={confirmerDeconnexion}
        >
          <Text style={[styles.optionLabel, { color: '#E63946' }]}>{t.seDeconnecter}</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionRow} onPress={confirmerSuppression}>
          <Text style={[styles.optionLabel, { color: '#E63946' }]}>{t.supprimerCompte}</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: '#E63946', fontSize: 16 },
  brand: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 4, marginBottom: 24 },
  sectionTitle: {
    color: '#E63946',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 12,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  langueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drapeau: { fontSize: 24 },
  optionLabel: { color: '#fff', fontSize: 15 },
  optionValeur: { color: '#666', fontSize: 14 },
  arrow: { color: '#333', fontSize: 16 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActif: { borderColor: '#E63946' },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E63946',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  switchInfo: { flex: 1, marginRight: 12 },
  switchLabel: { color: '#fff', fontSize: 15, marginBottom: 2 },
  switchDesc: { color: '#555', fontSize: 12 },
});