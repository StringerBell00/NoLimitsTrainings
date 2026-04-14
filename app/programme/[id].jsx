import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const DETAILS = {
  '1': {
    titre: 'Full Body',
    niveau: 'Debutant',
    duree: '45 min',
    exercices: [
      { nom: 'Squat', series: '3x12', repos: '60s', muscle: 'Jambes' },
      { nom: 'Pompes', series: '3x10', repos: '60s', muscle: 'Pectoraux' },
      { nom: 'Rowing haltere', series: '3x12', repos: '60s', muscle: 'Dos' },
      { nom: 'Developpé militaire', series: '3x10', repos: '60s', muscle: 'Epaules' },
      { nom: 'Planche', series: '3x30s', repos: '45s', muscle: 'Abdos' },
    ],
  },
  '2': {
    titre: 'Push Pull Legs',
    niveau: 'Intermediaire',
    duree: '60 min',
    exercices: [
      { nom: 'Developpé couché', series: '4x10', repos: '90s', muscle: 'Pectoraux' },
      { nom: 'Elevation laterale', series: '3x15', repos: '60s', muscle: 'Epaules' },
      { nom: 'Triceps poulie', series: '3x12', repos: '60s', muscle: 'Triceps' },
      { nom: 'Traction', series: '4x8', repos: '90s', muscle: 'Dos' },
      { nom: 'Curl biceps', series: '3x12', repos: '60s', muscle: 'Biceps' },
    ],
  },
  '3': {
    titre: 'HIIT Cardio',
    niveau: 'Avance',
    duree: '30 min',
    exercices: [
      { nom: 'Burpees', series: '4x20s', repos: '10s', muscle: 'Full Body' },
      { nom: 'Mountain Climbers', series: '4x20s', repos: '10s', muscle: 'Abdos' },
      { nom: 'Jump Squats', series: '4x20s', repos: '10s', muscle: 'Jambes' },
      { nom: 'High Knees', series: '4x20s', repos: '10s', muscle: 'Cardio' },
      { nom: 'Box Jumps', series: '4x20s', repos: '10s', muscle: 'Explosivite' },
    ],
  },
  '4': {
    titre: 'Force et Puissance',
    niveau: 'Avance',
    duree: '75 min',
    exercices: [
      { nom: 'Squat barre', series: '5x5', repos: '3min', muscle: 'Jambes' },
      { nom: 'Souleve de terre', series: '5x5', repos: '3min', muscle: 'Dos' },
      { nom: 'Developpe couche lourd', series: '5x5', repos: '3min', muscle: 'Pectoraux' },
      { nom: 'Rowing barre', series: '4x6', repos: '2min', muscle: 'Dos' },
      { nom: 'Developpe militaire', series: '4x6', repos: '2min', muscle: 'Epaules' },
    ],
  },
};

export default function ProgrammeDetail() {
  const { id } = useLocalSearchParams();
  const programme = DETAILS[id];

  if (!programme) return (
    <View style={styles.container}>
      <Text style={styles.error}>Programme introuvable</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.titre}>{programme.titre}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{programme.niveau}</Text>
        <Text style={styles.meta}>{programme.duree}</Text>
      </View>

      <Text style={styles.sectionTitle}>EXERCICES</Text>

      {programme.exercices.map((ex, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.numero}>{i + 1}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.exNom}>{ex.nom}</Text>
            <Text style={styles.exMuscle}>{ex.muscle}</Text>
            <View style={styles.exMeta}>
              <Text style={styles.exMetaText}>{ex.series}</Text>
              <Text style={styles.exMetaText}>Repos : {ex.repos}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => router.push(`/seance/${id}`)}
      >
        <Text style={styles.startBtnText}>Commencer la seance</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  back: { marginTop: 60, marginBottom: 24 },
  backText: { color: '#E63946', fontSize: 16 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  meta: { color: '#aaa', fontSize: 14 },
  sectionTitle: { color: '#E63946', fontSize: 14, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardLeft: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#E63946',
    alignItems: 'center', justifyContent: 'center',
  },
  numero: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cardRight: { flex: 1 },
  exNom: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  exMuscle: { color: '#E63946', fontSize: 12, marginBottom: 8 },
  exMeta: { flexDirection: 'row', gap: 16 },
  exMetaText: { color: '#666', fontSize: 12 },
  startBtn: {
    backgroundColor: '#E63946',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  error: { color: '#E63946', fontSize: 16, marginTop: 60 },
});