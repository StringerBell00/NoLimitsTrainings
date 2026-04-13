import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert
} from 'react-native';

const OBJECTIFS = [
  { id: 'perte_poids', label: 'Perte de poids' },
  { id: 'prise_masse', label: 'Prise de masse' },
  { id: 'endurance', label: 'Endurance' },
  { id: 'force', label: 'Force' },
  { id: 'forme', label: 'Forme generale' },
];

const NIVEAUX = [
  { id: 'debutant', label: 'Debutant' },
  { id: 'intermediaire', label: 'Intermediaire' },
  { id: 'avance', label: 'Avance' },
];

export default function Profile() {
  const [mode, setMode] = useState('view');
  const [nom, setNom] = useState('Sidib');
  const [email, setEmail] = useState('mohamedsidibenoisy7@gmail.com');
  const [poids, setPoids] = useState('75');
  const [taille, setTaille] = useState('178');
  const [age, setAge] = useState('25');
  const [objectif, setObjectif] = useState('prise_masse');
  const [niveau, setNiveau] = useState('intermediaire');

  const sauvegarder = () => {
    setMode('view');
    Alert.alert('Profil mis a jour', 'Tes informations ont ete sauvegardees.');
  };

  const annuler = () => {
    setMode('view');
  };

  if (mode === 'edit') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={annuler}>
          <Text style={styles.backText}>Annuler</Text>
        </TouchableOpacity>

        <Text style={styles.titre}>Modifier le profil</Text>

        <Text style={styles.sectionTitle}>INFORMATIONS</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholderTextColor="#444"
            color="#fff"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#444"
            keyboardType="email-address"
            autoCapitalize="none"
            color="#fff"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholderTextColor="#444"
              color="#fff"
            />
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Poids (kg)</Text>
            <TextInput
              style={styles.input}
              value={poids}
              onChangeText={setPoids}
              keyboardType="numeric"
              placeholderTextColor="#444"
              color="#fff"
            />
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Taille (cm)</Text>
            <TextInput
              style={styles.input}
              value={taille}
              onChangeText={setTaille}
              keyboardType="numeric"
              placeholderTextColor="#444"
              color="#fff"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>OBJECTIF</Text>
        <View style={styles.optionsGrid}>
          {OBJECTIFS.map(o => (
            <TouchableOpacity
              key={o.id}
              style={[styles.optionBtn, objectif === o.id && styles.optionBtnActif]}
              onPress={() => setObjectif(o.id)}
            >
              <Text style={[styles.optionText, objectif === o.id && styles.optionTextActif]}>
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>NIVEAU</Text>
        <View style={styles.niveauxRow}>
          {NIVEAUX.map(n => (
            <TouchableOpacity
              key={n.id}
              style={[styles.niveauBtn, niveau === n.id && styles.niveauBtnActif]}
              onPress={() => setNiveau(n.id)}
            >
              <Text style={[styles.niveauText, niveau === n.id && styles.niveauTextActif]}>
                {n.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={sauvegarder}>
          <Text style={styles.saveBtnText}>Sauvegarder</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{nom[0]}</Text>
        </View>
        <Text style={styles.nom}>{nom}</Text>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => setMode('edit')}>
          <Text style={styles.editBtnText}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statVal}>{poids} kg</Text>
          <Text style={styles.statLabel}>Poids</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>{taille} cm</Text>
          <Text style={styles.statLabel}>Taille</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>{age} ans</Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
      </View>

      {/* Objectif */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>OBJECTIF</Text>
        <Text style={styles.infoVal}>
          {OBJECTIFS.find(o => o.id === objectif)?.label}
        </Text>
      </View>

      {/* Niveau */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>NIVEAU</Text>
        <Text style={styles.infoVal}>
          {NIVEAUX.find(n => n.id === niveau)?.label}
        </Text>
      </View>

      {/* Seances */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>SEANCES</Text>
        <View style={styles.seancesRow}>
          <View style={styles.seanceStat}>
            <Text style={styles.seanceVal}>12</Text>
            <Text style={styles.seanceLabel}>Total</Text>
          </View>
          <View style={styles.seanceStat}>
            <Text style={styles.seanceVal}>3</Text>
            <Text style={styles.seanceLabel}>Ce mois</Text>
          </View>
          <View style={styles.seanceStat}>
            <Text style={styles.seanceVal}>87%</Text>
            <Text style={styles.seanceLabel}>Assiduite</Text>
          </View>
        </View>
      </View>

      {/* Menu */}
      {['Mes programmes', 'Historique des seances', 'Parametres', 'Deconnexion'].map((item, i) => (
        <TouchableOpacity key={i} style={styles.menuItem}>
          <Text style={[styles.menuText, item === 'Deconnexion' && { color: '#E63946' }]}>
            {item}
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  back: { marginTop: 60, marginBottom: 24 },
  backText: { color: '#E63946', fontSize: 16 },
  titre: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 32 },
  sectionTitle: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14, marginTop: 24 },
  inputContainer: { marginBottom: 16 },
  label: { color: '#aaa', fontSize: 13, marginBottom: 8, fontWeight: '600' },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  row: { flexDirection: 'row' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  optionBtn: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  optionBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  optionText: { color: '#aaa', fontSize: 13 },
  optionTextActif: { color: '#fff', fontWeight: 'bold' },
  niveauxRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  niveauBtn: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  niveauBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  niveauText: { color: '#aaa', fontSize: 13 },
  niveauTextActif: { color: '#fff', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#E63946',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', marginVertical: 32 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#E63946',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  nom: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  email: { color: '#666', fontSize: 13, marginTop: 4, marginBottom: 16 },
  editBtn: {
    borderWidth: 1,
    borderColor: '#E63946',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editBtnText: { color: '#E63946', fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: { alignItems: 'center' },
  statVal: { color: '#E63946', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: '#2a2a2a' },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  infoLabel: { color: '#555', fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  infoVal: { color: '#fff', fontSize: 16, fontWeight: '600' },
  seancesRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  seanceStat: { alignItems: 'center' },
  seanceVal: { color: '#E63946', fontSize: 22, fontWeight: 'bold' },
  seanceLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
  },
  menuText: { color: '#fff', fontSize: 15 },
  arrow: { color: '#333', fontSize: 16 },
});