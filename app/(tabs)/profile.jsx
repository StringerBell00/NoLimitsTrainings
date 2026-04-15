import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLangue } from '../LangueContext';
import { useTheme } from '../ThemeContext';
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
  const { theme } = useTheme();
  const s = createStyles(theme);

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
    if (item === 'NLT Premium') router.push('/premium');
    if (item === 'Boutique') router.push('/boutique');
    if (item === t.deconnexion) router.replace('/login');
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

  const changerPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusee', 'Autorise l acces a ta pellicule.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) setPhoto(result.assets[0].uri);
  };

  const prendrePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusee', 'Autorise l acces a ta camera.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, aspect: [1, 1], quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) setPhoto(result.assets[0].uri);
  };

  const MENU = [t.mesProgrammes, t.historiqueSeances, t.notifications, 'NLT Premium', 'Boutique', t.parametres, t.deconnexion];

  if (mode === 'edit') {
    return (
      <ScrollView style={s.container}>
        <TouchableOpacity style={s.back} onPress={() => setMode('view')}>
          <Text style={s.backText}>{t.annuler}</Text>
        </TouchableOpacity>

        <Text style={s.titre}>{t.modifierProfil}</Text>

        <View style={s.avatarSectionEdit}>
          <TouchableOpacity onPress={afficherOptionsPhoto}>
            {photo ? (
              <Image source={{ uri: photo }} style={s.avatarImage} />
            ) : (
              <View style={s.avatar}>
                <Text style={s.avatarText}>{nom[0]}</Text>
              </View>
            )}
            <View style={s.photoEditBtn}>
              <Text style={s.photoEditText}>+</Text>
            </View>
          </TouchableOpacity>
          <Text style={s.changerPhotoText}>Appuie pour changer la photo</Text>
        </View>

        <Text style={s.sectionTitle}>INFORMATIONS</Text>

        <View style={s.inputContainer}>
          <Text style={s.label}>Nom</Text>
          <TextInput style={s.input} value={nom} onChangeText={setNom} placeholderTextColor={theme.texteFaible} color={theme.texte} />
        </View>

        <View style={s.inputContainer}>
          <Text style={s.label}>Email</Text>
          <TextInput style={s.input} value={email} onChangeText={setEmail} placeholderTextColor={theme.texteFaible} keyboardType="email-address" autoCapitalize="none" color={theme.texte} />
        </View>

        <View style={s.row}>
          <View style={[s.inputContainer, { flex: 1 }]}>
            <Text style={s.label}>{t.age}</Text>
            <TextInput style={s.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholderTextColor={theme.texteFaible} color={theme.texte} />
          </View>
          <View style={{ width: 12 }} />
          <View style={[s.inputContainer, { flex: 1 }]}>
            <Text style={s.label}>{t.poids}</Text>
            <TextInput style={s.input} value={poids} onChangeText={setPoids} keyboardType="numeric" placeholderTextColor={theme.texteFaible} color={theme.texte} />
          </View>
          <View style={{ width: 12 }} />
          <View style={[s.inputContainer, { flex: 1 }]}>
            <Text style={s.label}>{t.taille}</Text>
            <TextInput style={s.input} value={taille} onChangeText={setTaille} keyboardType="numeric" placeholderTextColor={theme.texteFaible} color={theme.texte} />
          </View>
        </View>

        <Text style={s.sectionTitle}>{t.objectif}</Text>
        <View style={s.optionsGrid}>
          {OBJECTIFS.map(o => (
            <TouchableOpacity key={o.id} style={[s.optionBtn, objectif === o.id && s.optionBtnActif]} onPress={() => setObjectif(o.id)}>
              <Text style={[s.optionText, objectif === o.id && s.optionTextActif]}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.sectionTitle}>{t.niveau}</Text>
        <View style={s.niveauxRow}>
          {NIVEAUX.map(n => (
            <TouchableOpacity key={n.id} style={[s.niveauBtn, niveau === n.id && s.niveauBtnActif]} onPress={() => setNiveau(n.id)}>
              <Text style={[s.niveauText, niveau === n.id && s.niveauTextActif]}>{n.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.saveBtn} onPress={sauvegarder}>
          <Text style={s.saveBtnText}>{t.sauvegarder}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={s.container}>
      <Text style={s.brand}>NLT</Text>

      <View style={s.avatarSection}>
        <TouchableOpacity onPress={afficherOptionsPhoto} style={s.avatarWrapper}>
          {photo ? (
            <Image source={{ uri: photo }} style={s.avatarImage} />
          ) : (
            <View style={s.avatar}>
              <Text style={s.avatarText}>{nom[0]}</Text>
            </View>
          )}
          <View style={s.photoEditBtn}>
            <Text style={s.photoEditText}>+</Text>
          </View>
        </TouchableOpacity>
        <Text style={s.nom}>{nom}</Text>
        <Text style={s.emailText}>{email}</Text>
        <TouchableOpacity style={s.editBtn} onPress={() => setMode('edit')}>
          <Text style={s.editBtnText}>{t.modifierProfil}</Text>
        </TouchableOpacity>
      </View>

      <View style={s.statsRow}>
        <View style={s.stat}>
          <Text style={s.statVal}>{poids} kg</Text>
          <Text style={s.statLabel}>{t.poids}</Text>
        </View>
        <View style={s.statDivider} />
        <View style={s.stat}>
          <Text style={s.statVal}>{taille} cm</Text>
          <Text style={s.statLabel}>{t.taille}</Text>
        </View>
        <View style={s.statDivider} />
        <View style={s.stat}>
          <Text style={s.statVal}>{age} ans</Text>
          <Text style={s.statLabel}>{t.age}</Text>
        </View>
      </View>

      <View style={s.infoCard}>
        <Text style={s.infoLabel}>{t.objectif}</Text>
        <Text style={s.infoVal}>{OBJECTIFS.find(o => o.id === objectif)?.label}</Text>
      </View>

      <View style={s.infoCard}>
        <Text style={s.infoLabel}>{t.niveau}</Text>
        <Text style={s.infoVal}>{NIVEAUX.find(n => n.id === niveau)?.label}</Text>
      </View>

      <View style={s.infoCard}>
        <Text style={s.infoLabel}>{t.seances}</Text>
        <View style={s.seancesRow}>
          <View style={s.seanceStat}>
            <Text style={s.seanceVal}>12</Text>
            <Text style={s.seanceLabel}>{t.total}</Text>
          </View>
          <View style={s.seanceStat}>
            <Text style={s.seanceVal}>3</Text>
            <Text style={s.seanceLabel}>{t.ceMois}</Text>
          </View>
          <View style={s.seanceStat}>
            <Text style={s.seanceVal}>87%</Text>
            <Text style={s.seanceLabel}>{t.assiduite}</Text>
          </View>
        </View>
      </View>

      {MENU.map((item, i) => (
        <TouchableOpacity key={i} style={s.menuItem} onPress={() => handleMenu(item)}>
          <Text style={[s.menuText, item === t.deconnexion && { color: theme.accent }]}>{item}</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  brand: { color: theme.accent, fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  back: { marginTop: 60, marginBottom: 24 },
  backText: { color: theme.accent, fontSize: 16 },
  titre: { color: theme.texte, fontSize: 26, fontWeight: 'bold', marginBottom: 32 },
  sectionTitle: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14, marginTop: 24 },
  inputContainer: { marginBottom: 16 },
  label: { color: theme.texteSous, fontSize: 13, marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: theme.card, borderRadius: 12, padding: 14, fontSize: 15, borderWidth: 1, borderColor: theme.bordure },
  row: { flexDirection: 'row' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  optionBtn: { backgroundColor: theme.card, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderColor: theme.bordure },
  optionBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  optionText: { color: theme.texteSous, fontSize: 13 },
  optionTextActif: { color: '#fff', fontWeight: 'bold' },
  niveauxRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  niveauBtn: { flex: 1, backgroundColor: theme.card, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: theme.bordure },
  niveauBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  niveauText: { color: theme.texteSous, fontSize: 13 },
  niveauTextActif: { color: '#fff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: theme.accent, borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 32 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', marginVertical: 32 },
  avatarSectionEdit: { alignItems: 'center', marginBottom: 32 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: theme.accent },
  avatarText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  photoEditBtn: { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderRadius: 15, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.bg },
  photoEditText: { color: '#fff', fontSize: 20, fontWeight: 'bold', lineHeight: 24 },
  changerPhotoText: { color: theme.texteFaible, fontSize: 13, marginTop: 8 },
  nom: { color: theme.texte, fontSize: 22, fontWeight: 'bold' },
  emailText: { color: theme.texteFaible, fontSize: 13, marginTop: 4, marginBottom: 16 },
  editBtn: { borderWidth: 1, borderColor: theme.accent, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8 },
  editBtnText: { color: theme.accent, fontSize: 14 },
  statsRow: { flexDirection: 'row', backgroundColor: theme.card, borderRadius: 16, padding: 20, marginBottom: 16, justifyContent: 'space-around', alignItems: 'center' },
  stat: { alignItems: 'center' },
  statVal: { color: theme.accent, fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: theme.texteSous, fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: theme.bordure },
  infoCard: { backgroundColor: theme.card, borderRadius: 16, padding: 20, marginBottom: 12 },
  infoLabel: { color: theme.texteFaible, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  infoVal: { color: theme.texte, fontSize: 16, fontWeight: '600' },
  seancesRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  seanceStat: { alignItems: 'center' },
  seanceVal: { color: theme.accent, fontSize: 22, fontWeight: 'bold' },
  seanceLabel: { color: theme.texteSous, fontSize: 12, marginTop: 4 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.card, borderRadius: 12, padding: 18, marginBottom: 10 },
  menuText: { color: theme.texte, fontSize: 15 },
  arrow: { color: theme.texteFaible, fontSize: 16 },
});