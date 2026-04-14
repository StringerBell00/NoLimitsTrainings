import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLangue } from '../LangueContext';
import * as ImagePicker from 'expo-image-picker';

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
  const router = useRouter();
  const { t } = useLangue();
  const [mode, setMode] = useState('view');
  const [nom, setNom] = useState('Sidib');
  const [email, setEmail] = useState('mohamedsidibenoisy7@gmail.com');
  const [poids, setPoids] = useState('75');
  const [taille, setTaille] = useState('178');
  const [age, setAge] = useState('25');
  const [objectif, setObjectif] = useState('prise_masse');
  const [niveau, setNiveau] = useState('intermediaire');
  const [photo, setPhoto] = useState(null);

  const sauvegarder = () => {
    setMode('view');
    Alert.alert(t.modifierProfil, t.sauvegarder);
  };

  const handleMenu = (item) => {
    if (item === t.notifications) router.push('/notifications');
    if (item === t.parametres) router.push('/parametres');
    if (item === t.deconnexion) router.replace('/login');
  };

  const changerPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusee', 'Autorise l acces a ta pellicule dans les parametres.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const prendrePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusee', 'Autorise l acces a ta camera dans les parametres.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const afficherOptionsPhoto = () => {
    Alert.alert(
      'Photo de profil',
      'Choisis une option',
      [
        { text: 'Pellicule', onPress: changerPhoto },
        { text: 'Camera', onPress: prendrePhoto },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const MENU = [t.mesProgrammes, t.historiqueSeances, t.notifications, t.parametres, t.deconnexion];

  if (mode === 'edit') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => setMode('view')}>
          <Text style={styles.backText}>{t.annuler}</Text>
        </TouchableOpacity>

        <Text style={styles.titre}>{t.modifierProfil}</Text>

        {/* Photo edition */}
        <View style={styles.avatarSectionEdit}>
          <TouchableOpacity onPress={afficherOptionsPhoto}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{nom[0]}</Text>
              </View>
            )}
            <View style={styles.photoEditBtn}>
              <Text style={styles.photoEditText}>+</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.changerPhotoText}>Appuie pour changer la photo</Text>
        </View>

        <Text style={styles.sectionTitle}>INFORMATIONS</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholderTextColor="#444" color="#fff" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholderTextColor="#444" keyboardType="email-address" autoCapitalize="none" color="#fff" />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>{t.age}</Text>
            <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholderTextColor="#444" color="#fff" />
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>{t.poids}</Text>
            <TextInput style={styles.input} value={poids} onChangeText={setPoids} keyboardType="numeric" placeholderTextColor="#444" color="#fff" />
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>{t.taille}</Text>
            <TextInput style={styles.input} value={taille} onChangeText={setTaille} keyboardType="numeric" placeholderTextColor="#444" color="#fff" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t.objectif}</Text>
        <View style={styles.optionsGrid}>
          {OBJECTIFS.map(o => (
            <TouchableOpacity key={o.id} style={[styles.optionBtn, objectif === o.id && styles.optionBtnActif]} onPress={() => setObjectif(o.id)}>
              <Text style={[styles.optionText, objectif === o.id && styles.optionTextActif]}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t.niveau}</Text>
        <View style={styles.niveauxRow}>
          {NIVEAUX.map(n => (
            <TouchableOpacity key={n.id} style={[styles.niveauBtn, niveau === n.id && styles.niveauBtnActif]} onPress={() => setNiveau(n.id)}>
              <Text style={[styles.niveauText, niveau === n.id && styles.niveauTextActif]}>{n.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={sauvegarder}>
          <Text style={styles.saveBtnText}>{t.sauvegarder}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>

      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={afficherOptionsPhoto} style={styles.avatarWrapper}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{nom[0]}</Text>
            </View>
          )}
          <View style={styles.photoEditBtn}>
            <Text style={styles.photoEditText}>+</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.nom}>{nom}</Text>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => setMode('edit')}>
          <Text style={styles.editBtnText}>{t.modifierProfil}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statVal}>{poids} kg</Text>
          <Text style={styles.statLabel}>{t.poids}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>{taille} cm</Text>
          <Text style={styles.statLabel}>{t.taille}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statVal}>{age} ans</Text>
          <Text style={styles.statLabel}>{t.age}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>{t.objectif}</Text>
        <Text style={styles.infoVal}>{OBJECTIFS.find(o => o.id === objectif)?.label}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>{t.niveau}</Text>
        <Text style={styles.infoVal}>{NIVEAUX.find(n => n.id === niveau)?.label}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>{t.seances}</Text>
        <View style={styles.seancesRow}>
          <View style={styles.seanceStat}>
            <Text style={styles.seanceVal}>12</Text>
            <Text style={styles.seanceLabel}>{t.total}</Text>
          </View>
          <View style={styles.seanceStat}>
            <Text style={styles.seanceVal}>3</Text>
            <Text style={styles.seanceLabel}>{t.ceMois}</Text>
          </View>
          <View style={styles.seanceStat}>
            <Text style={styles.seanceVal}>87%</Text>
            <Text style={styles.seanceLabel}>{t.assiduite}</Text>
          </View>
        </View>
      </View>

      {MENU.map((item, i) => (
        <TouchableOpacity key={i} style={styles.menuItem} onPress={() => handleMenu(item)}>
          <Text style={[styles.menuText, item === t.deconnexion && { color: '#E63946' }]}>{item}</Text>
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
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, fontSize: 15, borderWidth: 1, borderColor: '#2a2a2a' },
  row: { flexDirection: 'row' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  optionBtn: { backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: '#2a2a2a' },
  optionBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  optionText: { color: '#aaa', fontSize: 13 },
  optionTextActif: { color: '#fff', fontWeight: 'bold' },
  niveauxRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  niveauBtn: { flex: 1, backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#2a2a2a' },
  niveauBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  niveauText: { color: '#aaa', fontSize: 13 },
  niveauTextActif: { color: '#fff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#E63946', borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 32 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', marginVertical: 32 },
  avatarSectionEdit: { alignItems: 'center', marginBottom: 32 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#E63946' },
  avatarText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  photoEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#111',
  },
  photoEditText: { color: '#fff', fontSize: 20, fontWeight: 'bold', lineHeight: 24 },
  changerPhotoText: { color: '#555', fontSize: 13, marginTop: 8 },
  nom: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  email: { color: '#666', fontSize: 13, marginTop: 4, marginBottom: 16 },
  editBtn: { borderWidth: 1, borderColor: '#E63946', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8 },
  editBtnText: { color: '#E63946', fontSize: 14 },
  statsRow: { flexDirection: 'row', backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20, marginBottom: 16, justifyContent: 'space-around', alignItems: 'center' },
  stat: { alignItems: 'center' },
  statVal: { color: '#E63946', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: '#2a2a2a' },
  infoCard: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20, marginBottom: 12 },
  infoLabel: { color: '#555', fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  infoVal: { color: '#fff', fontSize: 16, fontWeight: '600' },
  seancesRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  seanceStat: { alignItems: 'center' },
  seanceVal: { color: '#E63946', fontSize: 22, fontWeight: 'bold' },
  seanceLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 18, marginBottom: 10 },
  menuText: { color: '#fff', fontSize: 15 },
  arrow: { color: '#333', fontSize: 16 },
});