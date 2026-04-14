import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useLangue } from '../LangueContext';

const PROGRAMME_DU_JOUR = {
  id: '1',
  titre: 'Full Body',
  niveau: 'Intermediaire',
  duree: '45 min',
  exercices: 5,
};

const REPAS_DU_JOUR = [
  { moment: 'Petit-dejeuner', fait: true },
  { moment: 'Dejeuner', fait: true },
  { moment: 'Collation', fait: false },
  { moment: 'Diner', fait: false },
];

const STATS_SEMAINE = [
  { jour: 'L', fait: true },
  { jour: 'M', fait: true },
  { jour: 'M', fait: false },
  { jour: 'J', fait: true },
  { jour: 'V', fait: true },
  { jour: 'S', fait: false },
  { jour: 'D', fait: false },
];

export default function Home() {
  const router = useRouter();
  const { t } = useLangue();

  const repaisFaits = REPAS_DU_JOUR.filter(r => r.fait).length;
  const seancesSemaine = STATS_SEMAINE.filter(s => s.fait).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>NLT</Text>
          <Text style={styles.bonjour}>{t.bonjour}, Sidib</Text>
          <Text style={styles.date}>Lundi 14 Avril 2026</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.rechercheBtn}
            onPress={() => router.push('/recherche')}
          >
            <Text style={styles.rechercheBtnText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{seancesSemaine}</Text>
          <Text style={styles.statLabel}>{t.seancesCeMois}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>87%</Text>
          <Text style={styles.statLabel}>{t.assiduite}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>1750</Text>
          <Text style={styles.statLabel}>{t.kcalBrulees}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.cetteSemaine}</Text>
        <View style={styles.semaineRow}>
          {STATS_SEMAINE.map((j, i) => (
            <View key={i} style={styles.jourCol}>
              <View style={[styles.jourPoint, j.fait && styles.jourPointActif]} />
              <Text style={styles.jourLabel}>{j.jour}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.programmeDuJour}</Text>
        <TouchableOpacity
          style={styles.programmeCard}
          onPress={() => router.push(`/programme/${PROGRAMME_DU_JOUR.id}`)}
        >
          <View style={styles.programmeInfo}>
            <Text style={styles.programmeNom}>{PROGRAMME_DU_JOUR.titre}</Text>
            <Text style={styles.programmeMeta}>
              {PROGRAMME_DU_JOUR.niveau} • {PROGRAMME_DU_JOUR.duree} • {PROGRAMME_DU_JOUR.exercices} exercices
            </Text>
          </View>
          <View style={styles.programmeBtn}>
            <Text style={styles.programmeBtnText}>{t.commencer}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.nutritionDuJour}</Text>
        <View style={styles.nutritionCard}>
          <View style={styles.nutritionHeader}>
            <Text style={styles.nutritionKcal}>2100 kcal</Text>
            <Text style={styles.nutritionSous}>{t.kcalParJour}</Text>
          </View>
          <View style={styles.repasRow}>
            {REPAS_DU_JOUR.map((r, i) => (
              <View key={i} style={styles.repasItem}>
                <View style={[styles.repasPoint, r.fait && styles.repasPointActif]} />
                <Text style={styles.repasLabel}>{r.moment}</Text>
              </View>
            ))}
          </View>
          <View style={styles.nutritionProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(repaisFaits / REPAS_DU_JOUR.length) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{repaisFaits}/{REPAS_DU_JOUR.length} repas</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.tesCoaches}</Text>
        <TouchableOpacity
          style={styles.coachCard}
          onPress={() => router.push('/(tabs)/coaches')}
        >
          <View style={styles.coachAvatar}>
            <Text style={styles.coachAvatarText}>M</Text>
          </View>
          <View style={styles.coachInfo}>
            <Text style={styles.coachNom}>Mohamed-Lamine S.</Text>
            <Text style={styles.coachSpecialite}>Musculation et Force</Text>
            <Text style={styles.coachDispo}>{t.disponible}</Text>
          </View>
          <TouchableOpacity
            style={styles.reserverBtn}
            onPress={() => router.push('/booking/Mohamed-Lamine S.')}
          >
            <Text style={styles.reserverBtnText}>{t.reserver}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.accesRapides}</Text>
        <View style={styles.raccourcisGrid}>
          <TouchableOpacity
            style={styles.raccourci}
            onPress={() => router.push('/(tabs)/catalogue')}
          >
            <Text style={styles.raccourciTitre}>{t.exercices}</Text>
            <Text style={styles.raccourciSous}>30 exercices</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.raccourci}
            onPress={() => router.push('/(tabs)/maps')}
          >
            <Text style={styles.raccourciTitre}>{t.carte}</Text>
            <Text style={styles.raccourciSous}>Salles proches</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.raccourci}
            onPress={() => router.push('/(tabs)/progression')}
          >
            <Text style={styles.raccourciTitre}>{t.stats}</Text>
            <Text style={styles.raccourciSous}>{t.progression}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.raccourci}
            onPress={() => router.push('/(tabs)/nutrition')}
          >
            <Text style={styles.raccourciTitre}>{t.nutrition}</Text>
            <Text style={styles.raccourciSous}>Plan du jour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.raccourci}
            onPress={() => router.push('/timer')}
          >
            <Text style={styles.raccourciTitre}>Timer</Text>
            <Text style={styles.raccourciSous}>Tabata / HIIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.raccourci}
            onPress={() => router.push('/recherche')}
          >
            <Text style={styles.raccourciTitre}>Recherche</Text>
            <Text style={styles.raccourciSous}>Tout trouver</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 24,
  },
  brand: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  bonjour: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  date: { color: '#555', fontSize: 13, marginTop: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rechercheBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center', justifyContent: 'center',
  },
  rechercheBtnText: { fontSize: 18 },
  avatarBtn: {},
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#E63946',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#1a1a1a', borderRadius: 14, padding: 14, alignItems: 'center' },
  statVal: { color: '#E63946', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 10, marginTop: 4, textAlign: 'center' },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { color: '#E63946', fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14 },
  semaineRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderRadius: 14, padding: 16 },
  jourCol: { alignItems: 'center', gap: 8 },
  jourPoint: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2a2a2a' },
  jourPointActif: { backgroundColor: '#E63946' },
  jourLabel: { color: '#555', fontSize: 11 },
  programmeCard: {
    backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 4, borderLeftColor: '#E63946',
  },
  programmeInfo: { flex: 1 },
  programmeNom: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  programmeMeta: { color: '#666', fontSize: 13 },
  programmeBtn: { backgroundColor: '#E63946', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  programmeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  nutritionCard: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20 },
  nutritionHeader: { marginBottom: 16 },
  nutritionKcal: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  nutritionSous: { color: '#666', fontSize: 12, marginTop: 2 },
  repasRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  repasItem: { alignItems: 'center', gap: 6 },
  repasPoint: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#2a2a2a' },
  repasPointActif: { backgroundColor: '#4caf50' },
  repasLabel: { color: '#555', fontSize: 10 },
  nutritionProgress: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressBar: { flex: 1, height: 6, backgroundColor: '#2a2a2a', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#E63946', borderRadius: 3 },
  progressText: { color: '#666', fontSize: 12 },
  coachCard: {
    backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  coachAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  coachAvatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  coachInfo: { flex: 1 },
  coachNom: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  coachSpecialite: { color: '#666', fontSize: 12, marginTop: 2 },
  coachDispo: { color: '#4caf50', fontSize: 11, marginTop: 4 },
  reserverBtn: { backgroundColor: '#E63946', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  reserverBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  raccourcisGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  raccourci: {
    flex: 1, minWidth: '45%', backgroundColor: '#1a1a1a',
    borderRadius: 14, padding: 16, borderLeftWidth: 3, borderLeftColor: '#E63946',
  },
  raccourciTitre: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  raccourciSous: { color: '#555', fontSize: 12 },
});