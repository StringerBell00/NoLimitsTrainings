import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLangue } from '../LangueContext';
import { useTheme } from '../ThemeContext';
import * as ImagePicker from 'expo-image-picker';

const COACHES_DEFAUT = [
  {
    nom: 'Mohamed-Lamine S.',
    specialite: 'Musculation & Force',
    sousSpecialite: 'Perte de poids & Prise de masse',
    experience: '3 ans',
    tarif: '60/seance',
    dispo: true,
    note: 5.0,
    avis: 48,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
    description: 'Coach passione par la musculation et la transformation physique. Specialiste en perte de poids et prise de masse, j accompagne mes clients vers leurs objectifs avec des programmes 100% personnalises et un suivi rigoureux.',
    certifications: ['BPJEPS', 'Nutrition sportive', 'Preparation physique'],
    avisClients: [
      { nom: 'Thomas R.', avatar: 'T', note: 5.0, commentaire: 'Mohamed-Lamine est un coach exceptionnel. En 4 mois j ai pris 8kg de muscle tout en perdant de la graisse.', date: '10 Avr 2026', resultat: '+8kg masse musculaire' },
      { nom: 'Sarah M.', avatar: 'S', note: 5.0, commentaire: 'Je recommande vivement ! J ai perdu 12kg en 5 mois avec des seances intensives et un plan nutrition parfaitement adapte.', date: '05 Avr 2026', resultat: '-12kg en 5 mois' },
      { nom: 'Kevin L.', avatar: 'K', note: 5.0, commentaire: 'Coaching au top niveau. Mohamed-Lamine connait parfaitement son metier. Les resultats sont la.', date: '01 Avr 2026', resultat: 'Force x2 en 6 mois' },
      { nom: 'Amina D.', avatar: 'A', note: 5.0, commentaire: 'Excellent coach, tres professionnel et bienveillant. J ai retrouve confiance en moi grace a lui.', date: '25 Mar 2026', resultat: 'Transformation complete' },
      { nom: 'Lucas B.', avatar: 'L', note: 4.9, commentaire: 'Super experience de coaching. +5kg de muscle en 3 mois avec un programme adapte a mon niveau.', date: '18 Mar 2026', resultat: '+5kg en 3 mois' },
    ],
  },
];

const noteEnEtoiles = (note) => {
  const plein = Math.floor(note);
  const demi = note % 1 >= 0.5;
  return '★'.repeat(plein) + (demi ? '½' : '');
};

export default function Coaches() {
  const router = useRouter();
  const { t } = useLangue();
  const { theme } = useTheme();
  const s = createStyles(theme);
  const [coaches, setCoaches] = useState(COACHES_DEFAUT);
  const [coachOuvert, setCoachOuvert] = useState(0);

  const changerPhoto = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusee', 'Autorise l acces a ta pellicule dans les parametres.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const nouveaux = [...coaches];
      nouveaux[index] = { ...nouveaux[index], photo: result.assets[0].uri };
      setCoaches(nouveaux);
    }
  };

  return (
    <ScrollView style={s.container}>
      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>{t.nosCoaches}</Text>
      <Text style={s.subtitle}>{t.expertsAVotreService}</Text>

      {coaches.map((c, i) => (
        <View key={i} style={s.card}>
          <View style={s.cardHeader}>
            <View style={s.photoContainer}>
              <Image source={{ uri: c.photo }} style={s.photo} />
              <TouchableOpacity style={s.photoEditBtn} onPress={() => changerPhoto(i)}>
                <Text style={s.photoEditText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={s.info}>
              <Text style={s.nom}>{c.nom}</Text>
              <Text style={s.specialite}>{c.specialite}</Text>
              <Text style={s.sousSpecialite}>{c.sousSpecialite}</Text>
              <Text style={s.meta}>{c.experience} d experience</Text>
              <View style={s.noteRow}>
                <Text style={s.etoilesText}>{noteEnEtoiles(c.note)}</Text>
                <Text style={s.noteVal}>{c.note.toFixed(2)}</Text>
                <Text style={s.avisCount}>({c.avis} avis)</Text>
              </View>
              <View style={s.dispoBadge}>
                <Text style={s.dispoText}>{t.disponibleLabel}</Text>
              </View>
            </View>
          </View>

          <View style={s.tarifRow}>
            <Text style={s.tarifLabel}>Tarif</Text>
            <Text style={s.tarifVal}>{c.tarif}</Text>
          </View>

          <Text style={s.description}>{c.description}</Text>

          <Text style={s.detailsTitre}>CERTIFICATIONS</Text>
          <View style={s.certifsRow}>
            {c.certifications.map((cert, j) => (
              <View key={j} style={s.certifBadge}>
                <Text style={s.certifText}>{cert}</Text>
              </View>
            ))}
          </View>

          <Text style={s.detailsTitre}>AVIS CLIENTS</Text>
          <View style={s.noteGlobale}>
            <Text style={s.noteGlobaleVal}>{c.note.toFixed(2)}</Text>
            <Text style={s.noteGlobaleEtoiles}>{noteEnEtoiles(c.note)}</Text>
            <Text style={s.noteGlobaleAvis}>{c.avis} avis verifies</Text>
          </View>

          {c.avisClients.map((a, j) => (
            <View key={j} style={s.avisCard}>
              <View style={s.avisHeader}>
                <View style={s.avisAvatar}>
                  <Text style={s.avisAvatarText}>{a.avatar}</Text>
                </View>
                <View style={s.avisInfoHeader}>
                  <Text style={s.avisNom}>{a.nom}</Text>
                  <Text style={s.avisDate}>{a.date}</Text>
                </View>
                <View style={s.avisNoteContainer}>
                  <Text style={s.avisNoteVal}>{a.note.toFixed(2)}</Text>
                  <Text style={s.avisEtoiles}>{noteEnEtoiles(a.note)}</Text>
                </View>
              </View>
              {a.resultat && (
                <View style={s.resultatBadge}>
                  <Text style={s.resultatText}>{a.resultat}</Text>
                </View>
              )}
              <Text style={s.avisCommentaire}>{a.commentaire}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={s.btn}
            onPress={() => router.push(`/booking/${c.nom}`)}
          >
            <Text style={s.btnText}>{t.reserverSeance}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.chatBtn}
            onPress={() => router.push(`/chat/${c.nom}`)}
          >
            <Text style={s.chatBtnText}>Envoyer un message</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  brand: { color: theme.accent, fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  subtitle: { color: theme.texteSous, fontSize: 15, marginTop: 8, marginBottom: 32 },
  card: { backgroundColor: theme.card, borderRadius: 20, padding: 20, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  photoContainer: { position: 'relative' },
  photo: { width: 90, height: 90, borderRadius: 45, backgroundColor: theme.card2, borderWidth: 2, borderColor: theme.accent },
  photoEditBtn: { position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.card },
  photoEditText: { color: '#fff', fontSize: 18, fontWeight: 'bold', lineHeight: 22 },
  info: { flex: 1 },
  nom: { color: theme.texte, fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  specialite: { color: theme.accent, fontSize: 13, fontWeight: 'bold', marginBottom: 2 },
  sousSpecialite: { color: theme.texteSous, fontSize: 12, marginBottom: 4 },
  meta: { color: theme.texteFaible, fontSize: 12, marginBottom: 6 },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  etoilesText: { color: '#ff9800', fontSize: 14 },
  noteVal: { color: theme.texte, fontSize: 14, fontWeight: 'bold' },
  avisCount: { color: theme.texteFaible, fontSize: 12 },
  dispoBadge: { backgroundColor: '#1a3a1a', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start' },
  dispoText: { color: '#4caf50', fontSize: 11, fontWeight: 'bold' },
  tarifRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.bg, borderRadius: 12, padding: 14, marginBottom: 16 },
  tarifLabel: { color: theme.texteSous, fontSize: 14 },
  tarifVal: { color: theme.accent, fontSize: 16, fontWeight: 'bold' },
  description: { color: theme.texteSous, fontSize: 14, lineHeight: 22, marginBottom: 16 },
  detailsTitre: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12, marginTop: 4 },
  certifsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  certifBadge: { backgroundColor: theme.card2, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  certifText: { color: theme.texteSous, fontSize: 12 },
  noteGlobale: { backgroundColor: theme.bg, borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: theme.accent },
  noteGlobaleVal: { color: theme.accent, fontSize: 48, fontWeight: 'bold' },
  noteGlobaleEtoiles: { color: '#ff9800', fontSize: 20, marginVertical: 4 },
  noteGlobaleAvis: { color: theme.texteFaible, fontSize: 13 },
  avisCard: { backgroundColor: theme.bg, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: theme.bordure },
  avisHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  avisAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  avisAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avisInfoHeader: { flex: 1 },
  avisNom: { color: theme.texte, fontSize: 14, fontWeight: 'bold' },
  avisDate: { color: theme.texteFaible, fontSize: 11, marginTop: 2 },
  avisNoteContainer: { alignItems: 'flex-end' },
  avisNoteVal: { color: theme.texte, fontSize: 16, fontWeight: 'bold' },
  avisEtoiles: { color: '#ff9800', fontSize: 12 },
  resultatBadge: { backgroundColor: '#1a3a1a', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 10 },
  resultatText: { color: '#4caf50', fontSize: 12, fontWeight: 'bold' },
  avisCommentaire: { color: theme.texteSous, fontSize: 13, lineHeight: 20 },
  btn: { backgroundColor: theme.accent, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  chatBtn: { borderWidth: 1, borderColor: theme.accent, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  chatBtnText: { color: theme.accent, fontWeight: 'bold', fontSize: 15 },
});