import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLangue } from '../LangueContext';
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
      {
        nom: 'Thomas R.',
        avatar: 'T',
        note: 5.0,
        commentaire: 'Mohamed-Lamine est un coach exceptionnel. En 4 mois j ai pris 8kg de muscle tout en perdant de la graisse. Son suivi est au top, il est toujours disponible et ses programmes sont vraiment efficaces.',
        date: '10 Avr 2026',
        resultat: '+8kg masse musculaire',
      },
      {
        nom: 'Sarah M.',
        avatar: 'S',
        note: 5.0,
        commentaire: 'Je recommande vivement ! J ai perdu 12kg en 5 mois avec des seances intensives et un plan nutrition parfaitement adapte. Coach tres a l ecoute et tres motivant.',
        date: '05 Avr 2026',
        resultat: '-12kg en 5 mois',
      },
      {
        nom: 'Kevin L.',
        avatar: 'K',
        note: 5.0,
        commentaire: 'Coaching au top niveau. Mohamed-Lamine connait parfaitement son metier. Chaque seance est bien structuree, les explications sont claires et les resultats sont la. Je continue avec lui sans hesitation.',
        date: '01 Avr 2026',
        resultat: 'Force x2 en 6 mois',
      },
      {
        nom: 'Amina D.',
        avatar: 'A',
        note: 5.0,
        commentaire: 'Excellent coach, tres professionnel et bienveillant. Il adapte chaque programme a mes besoins et mes contraintes. J ai retrouve confiance en moi grace a lui.',
        date: '25 Mar 2026',
        resultat: 'Transformation complete',
      },
      {
        nom: 'Lucas B.',
        avatar: 'L',
        note: 4.9,
        commentaire: 'Super experience de coaching. Les resultats parlent d eux-memes : +5kg de muscle en 3 mois avec un programme adapte a mon niveau. Je recommande a 100%.',
        date: '18 Mar 2026',
        resultat: '+5kg en 3 mois',
      },
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
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const nouveaux = [...coaches];
      nouveaux[index] = { ...nouveaux[index], photo: result.assets[0].uri };
      setCoaches(nouveaux);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>{t.nosCoaches}</Text>
      <Text style={styles.subtitle}>{t.expertsAVotreService}</Text>

      {coaches.map((c, i) => (
        <View key={i} style={styles.card}>

          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: c.photo }} style={styles.photo} />
              <TouchableOpacity
                style={styles.photoEditBtn}
                onPress={() => changerPhoto(i)}
              >
                <Text style={styles.photoEditText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.info}>
              <Text style={styles.nom}>{c.nom}</Text>
              <Text style={styles.specialite}>{c.specialite}</Text>
              <Text style={styles.sousSpecialite}>{c.sousSpecialite}</Text>
              <Text style={styles.meta}>{c.experience} d experience</Text>
              <View style={styles.noteRow}>
                <Text style={styles.etoilesText}>{noteEnEtoiles(c.note)}</Text>
                <Text style={styles.noteVal}>{c.note.toFixed(2)}</Text>
                <Text style={styles.avisCount}>({c.avis} avis)</Text>
              </View>
              <View style={styles.dispoBadge}>
                <Text style={styles.dispoText}>{t.disponibleLabel}</Text>
              </View>
            </View>
          </View>

          {/* Tarif */}
          <View style={styles.tarifRow}>
            <Text style={styles.tarifLabel}>Tarif</Text>
            <Text style={styles.tarifVal}>{c.tarif}</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{c.description}</Text>

          {/* Certifications */}
          <Text style={styles.detailsTitre}>CERTIFICATIONS</Text>
          <View style={styles.certifsRow}>
            {c.certifications.map((cert, j) => (
              <View key={j} style={styles.certifBadge}>
                <Text style={styles.certifText}>{cert}</Text>
              </View>
            ))}
          </View>

          {/* Avis */}
          <Text style={styles.detailsTitre}>AVIS CLIENTS</Text>

          {/* Note globale */}
          <View style={styles.noteGlobale}>
            <Text style={styles.noteGlobaleVal}>{c.note.toFixed(2)}</Text>
            <Text style={styles.noteGlobaleEtoiles}>{noteEnEtoiles(c.note)}</Text>
            <Text style={styles.noteGlobaleAvis}>{c.avis} avis verifies</Text>
          </View>

          {/* Liste avis */}
          {c.avisClients.map((a, j) => (
            <View key={j} style={styles.avisCard}>
              <View style={styles.avisHeader}>
                <View style={styles.avisAvatar}>
                  <Text style={styles.avisAvatarText}>{a.avatar}</Text>
                </View>
                <View style={styles.avisInfoHeader}>
                  <Text style={styles.avisNom}>{a.nom}</Text>
                  <Text style={styles.avisDate}>{a.date}</Text>
                </View>
                <View style={styles.avisNoteContainer}>
                  <Text style={styles.avisNoteVal}>{a.note.toFixed(2)}</Text>
                  <Text style={styles.avisEtoiles}>{noteEnEtoiles(a.note)}</Text>
                </View>
              </View>

              {a.resultat && (
                <View style={styles.resultatBadge}>
                  <Text style={styles.resultatText}>{a.resultat}</Text>
                </View>
              )}

              <Text style={styles.avisCommentaire}>{a.commentaire}</Text>
            </View>
          ))}

          {/* Bouton reserver */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push(`/booking/${c.nom}`)}
          >
            <Text style={styles.btnText}>{t.reserverSeance}</Text>
          </TouchableOpacity>

        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  subtitle: { color: '#aaa', fontSize: 15, marginTop: 8, marginBottom: 32 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  photoContainer: { position: 'relative' },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2a2a2a',
    borderWidth: 2,
    borderColor: '#E63946',
  },
  photoEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  photoEditText: { color: '#fff', fontSize: 18, fontWeight: 'bold', lineHeight: 22 },
  info: { flex: 1 },
  nom: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  specialite: { color: '#E63946', fontSize: 13, fontWeight: 'bold', marginBottom: 2 },
  sousSpecialite: { color: '#aaa', fontSize: 12, marginBottom: 4 },
  meta: { color: '#555', fontSize: 12, marginBottom: 6 },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  etoilesText: { color: '#ff9800', fontSize: 14 },
  noteVal: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  avisCount: { color: '#555', fontSize: 12 },
  dispoBadge: {
    backgroundColor: '#1a3a1a',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  dispoText: { color: '#4caf50', fontSize: 11, fontWeight: 'bold' },
  tarifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  tarifLabel: { color: '#aaa', fontSize: 14 },
  tarifVal: { color: '#E63946', fontSize: 16, fontWeight: 'bold' },
  description: { color: '#aaa', fontSize: 14, lineHeight: 22, marginBottom: 16 },
  detailsTitre: {
    color: '#E63946',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 4,
  },
  certifsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  certifBadge: { backgroundColor: '#2a2a2a', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  certifText: { color: '#aaa', fontSize: 12 },
  noteGlobale: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E63946',
  },
  noteGlobaleVal: { color: '#E63946', fontSize: 48, fontWeight: 'bold' },
  noteGlobaleEtoiles: { color: '#ff9800', fontSize: 20, marginVertical: 4 },
  noteGlobaleAvis: { color: '#555', fontSize: 13 },
  avisCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  avisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  avisAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avisAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avisInfoHeader: { flex: 1 },
  avisNom: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  avisDate: { color: '#555', fontSize: 11, marginTop: 2 },
  avisNoteContainer: { alignItems: 'flex-end' },
  avisNoteVal: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  avisEtoiles: { color: '#ff9800', fontSize: 12 },
  resultatBadge: {
    backgroundColor: '#1a3a1a',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  resultatText: { color: '#4caf50', fontSize: 12, fontWeight: 'bold' },
  avisCommentaire: { color: '#aaa', fontSize: 13, lineHeight: 20 },
  btn: {
    backgroundColor: '#E63946',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});