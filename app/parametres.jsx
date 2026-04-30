import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './AuthContext';
import { useLangue } from './LangueContext';
import { useTheme } from './ThemeContext';
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

export default function Parametres() {
  const { deconnexion } = useAuth();
  const { langue, setLangue, t } = useLangue();
  const { theme, themeId, setThemeId } = useTheme();
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
        {
          text: t.supprimerCompte,
          style: 'destructive',
          onPress: async () => {
            await deconnexion();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const confirmerDeconnexion = () => {
    Alert.alert(
      t.deconnexion,
      '',
      [
        { text: t.annuler, style: 'cancel' },
        {
          text: t.seDeconnecter,
          onPress: async () => {
            await deconnexion();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const s = createStyles(theme);

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>{t.retour}</Text>
      </TouchableOpacity>

      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>{t.parametres}</Text>

      {/* Langue */}
      <Text style={s.sectionTitle}>{t.langue}</Text>
      <View style={s.card}>
        {LANGUES.map((l, i) => {
          const trad = TRADUCTIONS[l.id];
          return (
            <TouchableOpacity
              key={l.id}
              style={[s.optionRow, i < LANGUES.length - 1 && s.optionRowBorder]}
              onPress={() => setLangue(l.id)}
            >
              <View style={s.langueRow}>
                <Text style={s.drapeau}>{trad.drapeau}</Text>
                <Text style={s.optionLabel}>{trad.nom}</Text>
              </View>
              <View style={[s.radio, langue === l.id && s.radioActif]}>
                {langue === l.id && <View style={s.radioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Theme */}
      <Text style={s.sectionTitle}>{t.theme}</Text>
      <View style={s.card}>
        <TouchableOpacity
          style={[s.optionRow, s.optionRowBorder]}
          onPress={() => setThemeId('dark')}
        >
          <View style={s.themeRow}>
            <View style={[s.themePreview, { backgroundColor: '#111', borderColor: '#333' }]}>
              <View style={[s.themeDot, { backgroundColor: '#E63946' }]} />
            </View>
            <Text style={s.optionLabel}>{t.sombre}</Text>
          </View>
          <View style={[s.radio, themeId === 'dark' && s.radioActif]}>
            {themeId === 'dark' && <View style={s.radioDot} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.optionRow}
          onPress={() => setThemeId('light')}
        >
          <View style={s.themeRow}>
            <View style={[s.themePreview, { backgroundColor: '#f5f5f5', borderColor: '#ddd' }]}>
              <View style={[s.themeDot, { backgroundColor: '#E63946' }]} />
            </View>
            <Text style={s.optionLabel}>{t.clair}</Text>
          </View>
          <View style={[s.radio, themeId === 'light' && s.radioActif]}>
            {themeId === 'light' && <View style={s.radioDot} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <Text style={s.sectionTitle}>{t.notifications}</Text>
      <View style={s.card}>
        <View style={[s.switchRow, s.optionRowBorder]}>
          <View style={s.switchInfo}>
            <Text style={s.switchLabel}>Rappels de seances</Text>
          </View>
          <Switch
            value={notifSeance}
            onValueChange={setNotifSeance}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={notifSeance ? '#fff' : '#666'}
          />
        </View>
        <View style={[s.switchRow, s.optionRowBorder]}>
          <View style={s.switchInfo}>
            <Text style={s.switchLabel}>Rappels nutrition</Text>
          </View>
          <Switch
            value={notifNutrition}
            onValueChange={setNotifNutrition}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={notifNutrition ? '#fff' : '#666'}
          />
        </View>
        <View style={s.switchRow}>
          <View style={s.switchInfo}>
            <Text style={s.switchLabel}>Messages coach</Text>
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
      <Text style={s.sectionTitle}>{t.securite}</Text>
      <View style={s.card}>
        <View style={[s.switchRow, s.optionRowBorder]}>
          <View style={s.switchInfo}>
            <Text style={s.switchLabel}>Face ID / Touch ID</Text>
          </View>
          <Switch
            value={biometrie}
            onValueChange={setBiometrie}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={biometrie ? '#fff' : '#666'}
          />
        </View>
        <TouchableOpacity style={s.optionRow}>
          <Text style={s.optionLabel}>Changer le mot de passe</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Confidentialite */}
      <Text style={s.sectionTitle}>{t.confidentialite}</Text>
      <View style={s.card}>
        <View style={[s.switchRow, s.optionRowBorder]}>
          <View style={s.switchInfo}>
            <Text style={s.switchLabel}>Partage de donnees</Text>
          </View>
          <Switch
            value={donneesPartagees}
            onValueChange={setDonneesPartagees}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={donneesPartagees ? '#fff' : '#666'}
          />
        </View>
        <TouchableOpacity style={[s.optionRow, s.optionRowBorder]}>
          <Text style={s.optionLabel}>Politique de confidentialite</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.optionRow}>
          <Text style={s.optionLabel}>Conditions d utilisation</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* A propos */}
      <Text style={s.sectionTitle}>{t.aPropos}</Text>
      <View style={s.card}>
        <TouchableOpacity
          style={[s.optionRow, s.optionRowBorder]}
          onPress={() => router.push('/apropos')}
        >
          <Text style={s.optionLabel}>A propos de NLT</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
        <View style={[s.optionRow, s.optionRowBorder]}>
          <Text style={s.optionLabel}>{t.version}</Text>
          <Text style={s.optionValeur}>1.0.0</Text>
        </View>
        <View style={[s.optionRow, s.optionRowBorder]}>
          <Text style={s.optionLabel}>{t.developpeur}</Text>
          <Text style={s.optionValeur}>NLT Team</Text>
        </View>
        <TouchableOpacity style={s.optionRow}>
          <Text style={s.optionLabel}>Noter l application</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Compte */}
      <Text style={s.sectionTitle}>{t.compte}</Text>
      <View style={s.card}>
        <TouchableOpacity
          style={[s.optionRow, s.optionRowBorder]}
          onPress={confirmerDeconnexion}
        >
          <Text style={[s.optionLabel, { color: '#E63946' }]}>{t.seDeconnecter}</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.optionRow} onPress={confirmerSuppression}>
          <Text style={[s.optionLabel, { color: '#E63946' }]}>{t.supprimerCompte}</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: theme.accent, fontSize: 16 },
  brand: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 4, marginBottom: 24 },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 12, marginTop: 8 },
  card: { backgroundColor: theme.card, borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  optionRowBorder: { borderBottomWidth: 1, borderBottomColor: theme.bordure },
  langueRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  themePreview: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  themeDot: { width: 14, height: 14, borderRadius: 7 },
  drapeau: { fontSize: 24 },
  optionLabel: { color: theme.texte, fontSize: 15 },
  optionValeur: { color: theme.texteFaible, fontSize: 14 },
  arrow: { color: theme.texteFaible, fontSize: 16 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.card2, alignItems: 'center', justifyContent: 'center' },
  radioActif: { borderColor: theme.accent },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.accent },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  switchInfo: { flex: 1, marginRight: 12 },
  switchLabel: { color: theme.texte, fontSize: 15, marginBottom: 2 },
});