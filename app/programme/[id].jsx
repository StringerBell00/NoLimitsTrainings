import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../ThemeContext';

const DETAILS = {
  '1': {
    titre: 'Full Body',
    niveau: 'Debutant',
    duree: '45 min',
    objectif: 'Forme generale',
    description: 'Programme complet sollicitant tous les groupes musculaires en une seule seance. Ideal pour les debutants ou pour maintenir une forme generale.',
    exercices: [
      { nom: 'Squat', series: '3x12', repos: '60s', muscle: 'Jambes' },
      { nom: 'Pompes', series: '3x10', repos: '60s', muscle: 'Pectoraux' },
      { nom: 'Rowing haltere', series: '3x12', repos: '60s', muscle: 'Dos' },
      { nom: 'Developpe militaire', series: '3x10', repos: '60s', muscle: 'Epaules' },
      { nom: 'Planche', series: '3x30s', repos: '45s', muscle: 'Abdos' },
    ],
  },
  '2': {
    titre: 'Push Pull Legs',
    niveau: 'Intermediaire',
    duree: '60 min',
    objectif: 'Masse musculaire',
    description: 'Programme fractionne en 3 types de seances : poussee, tirage et jambes. Permet une recuperation optimale et une frequence d entrainement elevee.',
    exercices: [
      { nom: 'Developpe couche', series: '4x10', repos: '90s', muscle: 'Pectoraux' },
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
    objectif: 'Perte de poids',
    description: 'Entrainement intervalles haute intensite pour bruler un maximum de calories en un minimum de temps. Combine cardio et renforcement musculaire.',
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
    objectif: 'Force maximale',
    description: 'Programme base sur les mouvements de force fondamentaux. Charges lourdes et faible volume pour maximiser les gains de force.',
    exercices: [
      { nom: 'Squat barre', series: '5x5', repos: '3min', muscle: 'Jambes' },
      { nom: 'Souleve de terre', series: '5x5', repos: '3min', muscle: 'Dos' },
      { nom: 'Developpe couche lourd', series: '5x5', repos: '3min', muscle: 'Pectoraux' },
      { nom: 'Rowing barre', series: '4x6', repos: '2min', muscle: 'Dos' },
      { nom: 'Developpe militaire', series: '4x6', repos: '2min', muscle: 'Epaules' },
    ],
  },
};

const NIVEAU_COULEURS = {
  'Debutant': '#4caf50',
  'Intermediaire': '#ff9800',
  'Avance': '#E63946',
};

export default function ProgrammeDetail() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const s = createStyles(theme);
  const programme = DETAILS[id];

  if (!programme) return (
    <View style={s.container}>
      <Text style={s.erreur}>Programme introuvable</Text>
    </View>
  );

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>Retour</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={s.header}>
        <Text style={s.titre}>{programme.titre}</Text>
        <View style={s.metaRow}>
          <View style={[s.niveauBadge, { backgroundColor: NIVEAU_COULEURS[programme.niveau] + '22' }]}>
            <Text style={[s.niveauText, { color: NIVEAU_COULEURS[programme.niveau] }]}>
              {programme.niveau}
            </Text>
          </View>
          <Text style={s.meta}>{programme.duree}</Text>
          <Text style={s.meta}>{programme.objectif}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={s.descriptionCard}>
        <Text style={s.descriptionText}>{programme.description}</Text>
      </View>

      {/* Stats */}
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statVal}>{programme.exercices.length}</Text>
          <Text style={s.statLabel}>Exercices</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{programme.duree}</Text>
          <Text style={s.statLabel}>Duree</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{programme.exercices.reduce((acc, e) => acc + parseInt(e.series[0]), 0)}</Text>
          <Text style={s.statLabel}>Series totales</Text>
        </View>
      </View>

      {/* Exercices */}
      <Text style={s.sectionTitle}>EXERCICES</Text>
      {programme.exercices.map((ex, i) => (
        <View key={i} style={s.exCard}>
          <View style={s.exNumero}>
            <Text style={s.exNumeroText}>{i + 1}</Text>
          </View>
          <View style={s.exInfo}>
            <Text style={s.exNom}>{ex.nom}</Text>
            <Text style={s.exMuscle}>{ex.muscle}</Text>
            <View style={s.exMeta}>
              <View style={s.exMetaBadge}>
                <Text style={s.exMetaText}>{ex.series}</Text>
              </View>
              <View style={s.exMetaBadge}>
                <Text style={s.exMetaText}>Repos : {ex.repos}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}

      {/* Bouton commencer */}
      <TouchableOpacity
        style={s.startBtn}
        onPress={() => router.push(`/seance/${id}`)}
      >
        <Text style={s.startBtnText}>Commencer la seance</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  erreur: { color: theme.accent, fontSize: 16, marginTop: 60 },
  back: { marginTop: 60, marginBottom: 24 },
  backText: { color: theme.accent, fontSize: 16 },
  header: { marginBottom: 20 },
  titre: { color: theme.texte, fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  niveauBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  niveauText: { fontSize: 12, fontWeight: 'bold' },
  meta: { color: theme.texteSous, fontSize: 13 },
  descriptionCard: { backgroundColor: theme.card, borderRadius: 16, padding: 18, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: theme.accent },
  descriptionText: { color: theme.texteSous, fontSize: 14, lineHeight: 22 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: theme.card, borderRadius: 14, padding: 14, alignItems: 'center' },
  statVal: { color: theme.accent, fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: theme.texteFaible, fontSize: 11, marginTop: 4, textAlign: 'center' },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16 },
  exCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.card, borderRadius: 16,
    padding: 16, marginBottom: 10, gap: 14,
  },
  exNumero: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  exNumeroText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  exInfo: { flex: 1 },
  exNom: { color: theme.texte, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  exMuscle: { color: theme.accent, fontSize: 12, marginBottom: 8 },
  exMeta: { flexDirection: 'row', gap: 8 },
  exMetaBadge: { backgroundColor: theme.card2, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  exMetaText: { color: theme.texteSous, fontSize: 12 },
  startBtn: {
    backgroundColor: theme.accent, borderRadius: 16,
    padding: 18, alignItems: 'center',
    marginTop: 16, marginBottom: 40,
  },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});