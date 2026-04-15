import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLangue } from '../LangueContext';
import { useRouter } from 'expo-router';

const HISTORIQUE = [
  { id: 1, date: 'Aujourd hui', programme: 'Full Body', duree: '52 min', exercices: 5, calories: 380, fait: true },
  { id: 2, date: 'Hier', programme: 'HIIT Cardio', duree: '30 min', exercices: 5, calories: 420, fait: true },
  { id: 3, date: '11 Avr', programme: 'Push Pull Legs', duree: '65 min', exercices: 5, calories: 310, fait: true },
  { id: 4, date: '10 Avr', programme: 'Force et Puissance', duree: '80 min', exercices: 5, calories: 290, fait: true },
  { id: 5, date: '09 Avr', programme: 'Full Body', duree: '48 min', exercices: 5, calories: 350, fait: true },
];

const ACTIVITE_SEMAINE = [
  { jour: 'Lun', fait: true, duree: 52 },
  { jour: 'Mar', fait: true, duree: 30 },
  { jour: 'Mer', fait: false, duree: 0 },
  { jour: 'Jeu', fait: true, duree: 65 },
  { jour: 'Ven', fait: true, duree: 80 },
  { jour: 'Sam', fait: false, duree: 0 },
  { jour: 'Dim', fait: false, duree: 0 },
];

const MAX_DUREE = 80;

export default function Progression() {
  const { t } = useLangue();
  const router = useRouter();

  const seancesTotal = HISTORIQUE.filter(h => h.fait).length;
  const caloriesTotal = HISTORIQUE.reduce((acc, h) => acc + h.calories, 0);
  const dureeTotal = HISTORIQUE.reduce((acc, h) => acc + parseInt(h.duree), 0);
  const assiduite = Math.round((ACTIVITE_SEMAINE.filter(j => j.fait).length / 7) * 100);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>{t.progression}</Text>
      <Text style={styles.sous}>{t.suiviPerformances}</Text>

      {/* Stats globales */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{seancesTotal}</Text>
          <Text style={styles.statLabel}>{t.seances}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{caloriesTotal}</Text>
          <Text style={styles.statLabel}>{t.calories}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{dureeTotal}</Text>
          <Text style={styles.statLabel}>{t.minutes}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{assiduite}%</Text>
          <Text style={styles.statLabel}>{t.assiduite}</Text>
        </View>
      </View>

      {/* Activite semaine */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.activiteSemaine}</Text>
        <View style={styles.activiteRow}>
          {ACTIVITE_SEMAINE.map((j, i) => (
            <View key={i} style={styles.activiteCol}>
              <View style={styles.barreContainer}>
                <View style={[styles.barre, {
                  height: j.fait ? Math.max((j.duree / MAX_DUREE) * 80, 8) : 8,
                  backgroundColor: j.fait ? '#E63946' : '#1a1a1a',
                }]} />
              </View>
              <Text style={styles.activiteJour}>{j.jour}</Text>
              {j.fait && <Text style={styles.activiteMin}>{j.duree}m</Text>}
            </View>
          ))}
        </View>
      </View>

      {/* Objectifs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.objectifs}</Text>
        <View style={styles.objectifCard}>
          <View style={styles.objectifHeader}>
            <Text style={styles.objectifLabel}>Seances par semaine</Text>
            <Text style={styles.objectifVal}>4 / 5</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>
        <View style={styles.objectifCard}>
          <View style={styles.objectifHeader}>
            <Text style={styles.objectifLabel}>{t.calories}</Text>
            <Text style={styles.objectifVal}>{caloriesTotal} / 2000</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((caloriesTotal / 2000) * 100, 100)}%` }]} />
          </View>
        </View>
        <View style={styles.objectifCard}>
          <View style={styles.objectifHeader}>
            <Text style={styles.objectifLabel}>{t.minutes}</Text>
            <Text style={styles.objectifVal}>{dureeTotal} / 300</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((dureeTotal / 300) * 100, 100)}%` }]} />
          </View>
        </View>
      </View>

      {/* Bouton calendrier */}
      <TouchableOpacity
        style={styles.historiqueBtn}
        onPress={() => router.push('/historique')}
      >
        <Text style={styles.historiqueBtnText}>Voir le calendrier complet</Text>
      </TouchableOpacity>

      {/* Historique recent */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.historique}</Text>
        {HISTORIQUE.map(h => (
          <View key={h.id} style={styles.seanceCard}>
            <View style={styles.checkCircle}>
              <Text style={styles.check}>✓</Text>
            </View>
            <View style={styles.seanceInfo}>
              <Text style={styles.seanceNom}>{h.programme}</Text>
              <Text style={styles.seanceDate}>{h.date}</Text>
            </View>
            <View style={styles.seanceMeta}>
              <Text style={styles.seanceMetaText}>{h.duree}</Text>
              <Text style={styles.seanceMetaText}>{h.calories} kcal</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  sous: { color: '#aaa', fontSize: 15, marginTop: 4, marginBottom: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1, minWidth: '45%', backgroundColor: '#1a1a1a',
    borderRadius: 16, padding: 16, alignItems: 'center',
    borderLeftWidth: 3, borderLeftColor: '#E63946',
  },
  statVal: { color: '#E63946', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16 },
  activiteRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#1a1a1a', borderRadius: 16,
    padding: 16, alignItems: 'flex-end',
  },
  activiteCol: { alignItems: 'center', flex: 1 },
  barreContainer: { height: 80, justifyContent: 'flex-end', marginBottom: 8 },
  barre: { width: 20, borderRadius: 6 },
  activiteJour: { color: '#aaa', fontSize: 11 },
  activiteMin: { color: '#E63946', fontSize: 10, marginTop: 2 },
  objectifCard: { backgroundColor: '#1a1a1a', borderRadius: 14, padding: 16, marginBottom: 10 },
  objectifHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  objectifLabel: { color: '#fff', fontSize: 14 },
  objectifVal: { color: '#E63946', fontSize: 14, fontWeight: 'bold' },
  progressBar: { height: 6, backgroundColor: '#2a2a2a', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#E63946', borderRadius: 3 },
  historiqueBtn: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E63946',
  },
  historiqueBtnText: { color: '#E63946', fontSize: 15, fontWeight: 'bold' },
  seanceCard: {
    backgroundColor: '#1a1a1a', borderRadius: 14,
    padding: 16, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  checkCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#1a3a1a', alignItems: 'center', justifyContent: 'center',
  },
  check: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  seanceInfo: { flex: 1 },
  seanceNom: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  seanceDate: { color: '#666', fontSize: 12 },
  seanceMeta: { alignItems: 'flex-end', gap: 4 },
  seanceMetaText: { color: '#aaa', fontSize: 12 },
});