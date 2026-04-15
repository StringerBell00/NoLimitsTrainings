import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLangue } from '../LangueContext';
import { useTheme } from '../ThemeContext';
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
  const { theme } = useTheme();
  const router = useRouter();
  const s = createStyles(theme);

  const seancesTotal = HISTORIQUE.filter(h => h.fait).length;
  const caloriesTotal = HISTORIQUE.reduce((acc, h) => acc + h.calories, 0);
  const dureeTotal = HISTORIQUE.reduce((acc, h) => acc + parseInt(h.duree), 0);
  const assiduite = Math.round((ACTIVITE_SEMAINE.filter(j => j.fait).length / 7) * 100);

  return (
    <ScrollView style={s.container}>
      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>{t.progression}</Text>
      <Text style={s.sous}>{t.suiviPerformances}</Text>

      <View style={s.statsGrid}>
        <View style={s.statCard}>
          <Text style={s.statVal}>{seancesTotal}</Text>
          <Text style={s.statLabel}>{t.seances}</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{caloriesTotal}</Text>
          <Text style={s.statLabel}>{t.calories}</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{dureeTotal}</Text>
          <Text style={s.statLabel}>{t.minutes}</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{assiduite}%</Text>
          <Text style={s.statLabel}>{t.assiduite}</Text>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.activiteSemaine}</Text>
        <View style={s.activiteRow}>
          {ACTIVITE_SEMAINE.map((j, i) => (
            <View key={i} style={s.activiteCol}>
              <View style={s.barreContainer}>
                <View style={[s.barre, {
                  height: j.fait ? Math.max((j.duree / MAX_DUREE) * 80, 8) : 8,
                  backgroundColor: j.fait ? theme.accent : theme.card2,
                }]} />
              </View>
              <Text style={s.activiteJour}>{j.jour}</Text>
              {j.fait && <Text style={s.activiteMin}>{j.duree}m</Text>}
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.objectifs}</Text>
        <View style={s.objectifCard}>
          <View style={s.objectifHeader}>
            <Text style={s.objectifLabel}>Seances par semaine</Text>
            <Text style={s.objectifVal}>4 / 5</Text>
          </View>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: '80%' }]} />
          </View>
        </View>
        <View style={s.objectifCard}>
          <View style={s.objectifHeader}>
            <Text style={s.objectifLabel}>{t.calories}</Text>
            <Text style={s.objectifVal}>{caloriesTotal} / 2000</Text>
          </View>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${Math.min((caloriesTotal / 2000) * 100, 100)}%` }]} />
          </View>
        </View>
        <View style={s.objectifCard}>
          <View style={s.objectifHeader}>
            <Text style={s.objectifLabel}>{t.minutes}</Text>
            <Text style={s.objectifVal}>{dureeTotal} / 300</Text>
          </View>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${Math.min((dureeTotal / 300) * 100, 100)}%` }]} />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={s.historiqueBtn}
        onPress={() => router.push('/historique')}
      >
        <Text style={s.historiqueBtnText}>Voir le calendrier complet</Text>
      </TouchableOpacity>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.historique}</Text>
        {HISTORIQUE.map(h => (
          <View key={h.id} style={s.seanceCard}>
            <View style={s.checkCircle}>
              <Text style={s.check}>✓</Text>
            </View>
            <View style={s.seanceInfo}>
              <Text style={s.seanceNom}>{h.programme}</Text>
              <Text style={s.seanceDate}>{h.date}</Text>
            </View>
            <View style={s.seanceMeta}>
              <Text style={s.seanceMetaText}>{h.duree}</Text>
              <Text style={s.seanceMetaText}>{h.calories} kcal</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  brand: { color: theme.accent, fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  sous: { color: theme.texteSous, fontSize: 15, marginTop: 4, marginBottom: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: theme.card, borderRadius: 16, padding: 16, alignItems: 'center', borderLeftWidth: 3, borderLeftColor: theme.accent },
  statVal: { color: theme.accent, fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: theme.texteSous, fontSize: 12, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16 },
  activiteRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.card, borderRadius: 16, padding: 16, alignItems: 'flex-end' },
  activiteCol: { alignItems: 'center', flex: 1 },
  barreContainer: { height: 80, justifyContent: 'flex-end', marginBottom: 8 },
  barre: { width: 20, borderRadius: 6 },
  activiteJour: { color: theme.texteSous, fontSize: 11 },
  activiteMin: { color: theme.accent, fontSize: 10, marginTop: 2 },
  objectifCard: { backgroundColor: theme.card, borderRadius: 14, padding: 16, marginBottom: 10 },
  objectifHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  objectifLabel: { color: theme.texte, fontSize: 14 },
  objectifVal: { color: theme.accent, fontSize: 14, fontWeight: 'bold' },
  progressBar: { height: 6, backgroundColor: theme.card2, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: theme.accent, borderRadius: 3 },
  historiqueBtn: { backgroundColor: theme.card, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: theme.accent },
  historiqueBtnText: { color: theme.accent, fontSize: 15, fontWeight: 'bold' },
  seanceCard: { backgroundColor: theme.card, borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 14 },
  checkCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1a3a1a', alignItems: 'center', justifyContent: 'center' },
  check: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  seanceInfo: { flex: 1 },
  seanceNom: { color: theme.texte, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  seanceDate: { color: theme.texteFaible, fontSize: 12 },
  seanceMeta: { alignItems: 'flex-end', gap: 4 },
  seanceMetaText: { color: theme.texteSous, fontSize: 12 },
});