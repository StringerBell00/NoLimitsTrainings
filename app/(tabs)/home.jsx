import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useLangue } from '../LangueContext';
import { useTheme } from '../ThemeContext';

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
  const { theme } = useTheme();
  const s = createStyles(theme);

  const repaisFaits = REPAS_DU_JOUR.filter(r => r.fait).length;
  const seancesSemaine = STATS_SEMAINE.filter(s => s.fait).length;

  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.brand}>NLT</Text>
          <Text style={s.bonjour}>{t.bonjour}, Sidib</Text>
          <Text style={s.date}>Lundi 14 Avril 2026</Text>
        </View>
        <View style={s.headerRight}>
          <TouchableOpacity
            style={s.rechercheBtn}
            onPress={() => router.push('/recherche')}
          >
            <Text style={s.rechercheBtnText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.avatarBtn}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <View style={s.avatar}>
              <Text style={s.avatarText}>S</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statVal}>{seancesSemaine}</Text>
          <Text style={s.statLabel}>{t.seancesCeMois}</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>87%</Text>
          <Text style={s.statLabel}>{t.assiduite}</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>1750</Text>
          <Text style={s.statLabel}>{t.kcalBrulees}</Text>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.cetteSemaine}</Text>
        <View style={s.semaineRow}>
          {STATS_SEMAINE.map((j, i) => (
            <View key={i} style={s.jourCol}>
              <View style={[s.jourPoint, j.fait && s.jourPointActif]} />
              <Text style={s.jourLabel}>{j.jour}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.programmeDuJour}</Text>
        <TouchableOpacity
          style={s.programmeCard}
          onPress={() => router.push(`/programme/${PROGRAMME_DU_JOUR.id}`)}
        >
          <View style={s.programmeInfo}>
            <Text style={s.programmeNom}>{PROGRAMME_DU_JOUR.titre}</Text>
            <Text style={s.programmeMeta}>
              {PROGRAMME_DU_JOUR.niveau} • {PROGRAMME_DU_JOUR.duree} • {PROGRAMME_DU_JOUR.exercices} exercices
            </Text>
          </View>
          <View style={s.programmeBtn}>
            <Text style={s.programmeBtnText}>{t.commencer}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.nutritionDuJour}</Text>
        <View style={s.nutritionCard}>
          <View style={s.nutritionHeader}>
            <Text style={s.nutritionKcal}>2100 kcal</Text>
            <Text style={s.nutritionSous}>{t.kcalParJour}</Text>
          </View>
          <View style={s.repasRow}>
            {REPAS_DU_JOUR.map((r, i) => (
              <View key={i} style={s.repasItem}>
                <View style={[s.repasPoint, r.fait && s.repasPointActif]} />
                <Text style={s.repasLabel}>{r.moment}</Text>
              </View>
            ))}
          </View>
          <View style={s.nutritionProgress}>
            <View style={s.progressBar}>
              <View style={[s.progressFill, { width: `${(repaisFaits / REPAS_DU_JOUR.length) * 100}%` }]} />
            </View>
            <Text style={s.progressText}>{repaisFaits}/{REPAS_DU_JOUR.length} repas</Text>
          </View>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.tesCoaches}</Text>
        <TouchableOpacity
          style={s.coachCard}
          onPress={() => router.push('/(tabs)/coaches')}
        >
          <View style={s.coachAvatar}>
            <Text style={s.coachAvatarText}>M</Text>
          </View>
          <View style={s.coachInfo}>
            <Text style={s.coachNom}>Mohamed-Lamine S.</Text>
            <Text style={s.coachSpecialite}>Musculation et Force</Text>
            <Text style={s.coachDispo}>{t.disponible}</Text>
          </View>
          <TouchableOpacity
            style={s.reserverBtn}
            onPress={() => router.push('/booking/Mohamed-Lamine S.')}
          >
            <Text style={s.reserverBtnText}>{t.reserver}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>{t.accesRapides}</Text>
        <View style={s.raccourcisGrid}>
          <TouchableOpacity style={s.raccourci} onPress={() => router.push('/(tabs)/catalogue')}>
            <Text style={s.raccourciTitre}>{t.exercices}</Text>
            <Text style={s.raccourciSous}>30 exercices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.raccourci} onPress={() => router.push('/(tabs)/maps')}>
            <Text style={s.raccourciTitre}>{t.carte}</Text>
            <Text style={s.raccourciSous}>Salles proches</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.raccourci} onPress={() => router.push('/(tabs)/progression')}>
            <Text style={s.raccourciTitre}>{t.stats}</Text>
            <Text style={s.raccourciSous}>{t.progression}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.raccourci} onPress={() => router.push('/(tabs)/nutrition')}>
            <Text style={s.raccourciTitre}>{t.nutrition}</Text>
            <Text style={s.raccourciSous}>Plan du jour</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.raccourci} onPress={() => router.push('/timer')}>
            <Text style={s.raccourciTitre}>Timer</Text>
            <Text style={s.raccourciSous}>Tabata / HIIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.raccourci} onPress={() => router.push('/recherche')}>
            <Text style={s.raccourciTitre}>Recherche</Text>
            <Text style={s.raccourciSous}>Tout trouver</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', paddingHorizontal: 24,
    paddingTop: 60, marginBottom: 24,
  },
  brand: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  bonjour: { color: theme.texte, fontSize: 24, fontWeight: 'bold' },
  date: { color: theme.texteFaible, fontSize: 13, marginTop: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rechercheBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.card, alignItems: 'center', justifyContent: 'center' },
  rechercheBtnText: { fontSize: 18 },
  avatarBtn: {},
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 24, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: theme.card, borderRadius: 14, padding: 14, alignItems: 'center' },
  statVal: { color: theme.accent, fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: theme.texteFaible, fontSize: 10, marginTop: 4, textAlign: 'center' },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14 },
  semaineRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.card, borderRadius: 14, padding: 16 },
  jourCol: { alignItems: 'center', gap: 8 },
  jourPoint: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.card2 },
  jourPointActif: { backgroundColor: theme.accent },
  jourLabel: { color: theme.texteFaible, fontSize: 11 },
  programmeCard: {
    backgroundColor: theme.card, borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 4, borderLeftColor: theme.accent,
  },
  programmeInfo: { flex: 1 },
  programmeNom: { color: theme.texte, fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  programmeMeta: { color: theme.texteFaible, fontSize: 13 },
  programmeBtn: { backgroundColor: theme.accent, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  programmeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  nutritionCard: { backgroundColor: theme.card, borderRadius: 16, padding: 20 },
  nutritionHeader: { marginBottom: 16 },
  nutritionKcal: { color: theme.texte, fontSize: 22, fontWeight: 'bold' },
  nutritionSous: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
  repasRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  repasItem: { alignItems: 'center', gap: 6 },
  repasPoint: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.card2 },
  repasPointActif: { backgroundColor: '#4caf50' },
  repasLabel: { color: theme.texteFaible, fontSize: 10 },
  nutritionProgress: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressBar: { flex: 1, height: 6, backgroundColor: theme.card2, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: theme.accent, borderRadius: 3 },
  progressText: { color: theme.texteFaible, fontSize: 12 },
  coachCard: { backgroundColor: theme.card, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  coachAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  coachAvatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  coachInfo: { flex: 1 },
  coachNom: { color: theme.texte, fontSize: 15, fontWeight: 'bold' },
  coachSpecialite: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
  coachDispo: { color: '#4caf50', fontSize: 11, marginTop: 4 },
  reserverBtn: { backgroundColor: theme.accent, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  reserverBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  raccourcisGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  raccourci: { flex: 1, minWidth: '45%', backgroundColor: theme.card, borderRadius: 14, padding: 16, borderLeftWidth: 3, borderLeftColor: theme.accent },
  raccourciTitre: { color: theme.texte, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  raccourciSous: { color: theme.texteFaible, fontSize: 12 },
});