import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const MOIS = [
  'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
];

const JOURS_SEMAINE = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const SEANCES_HISTORIQUE = [
  { date: '2026-04-14', programme: 'Full Body', duree: '52 min', calories: 380, niveau: 'Debutant' },
  { date: '2026-04-13', programme: 'HIIT Cardio', duree: '30 min', calories: 420, niveau: 'Avance' },
  { date: '2026-04-11', programme: 'Push Pull Legs', duree: '65 min', calories: 310, niveau: 'Intermediaire' },
  { date: '2026-04-10', programme: 'Force et Puissance', duree: '80 min', calories: 290, niveau: 'Avance' },
  { date: '2026-04-09', programme: 'Full Body', duree: '48 min', calories: 350, niveau: 'Debutant' },
  { date: '2026-04-07', programme: 'HIIT Cardio', duree: '30 min', calories: 410, niveau: 'Avance' },
  { date: '2026-04-05', programme: 'Full Body', duree: '55 min', calories: 360, niveau: 'Debutant' },
  { date: '2026-04-03', programme: 'Push Pull Legs', duree: '62 min', calories: 300, niveau: 'Intermediaire' },
  { date: '2026-04-01', programme: 'Force et Puissance', duree: '78 min', calories: 280, niveau: 'Avance' },
  { date: '2026-03-30', programme: 'Full Body', duree: '50 min', calories: 370, niveau: 'Debutant' },
  { date: '2026-03-28', programme: 'HIIT Cardio', duree: '30 min', calories: 430, niveau: 'Avance' },
  { date: '2026-03-26', programme: 'Push Pull Legs', duree: '60 min', calories: 320, niveau: 'Intermediaire' },
];

const NIVEAU_COULEURS = {
  'Debutant': '#4caf50',
  'Intermediaire': '#ff9800',
  'Avance': '#E63946',
};

export default function Historique() {
  const today = new Date();
  const [moisActuel, setMoisActuel] = useState(today.getMonth());
  const [anneeActuelle, setAnneeActuelle] = useState(today.getFullYear());
  const [jourSelectionne, setJourSelectionne] = useState(null);

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const seancesDuMois = SEANCES_HISTORIQUE.filter(s => {
    const date = new Date(s.date);
    return date.getMonth() === moisActuel && date.getFullYear() === anneeActuelle;
  });

  const datesAvecSeance = seancesDuMois.map(s => new Date(s.date).getDate());

  const seancesDuJour = jourSelectionne
    ? SEANCES_HISTORIQUE.filter(s => {
        const date = new Date(s.date);
        return date.getDate() === jourSelectionne &&
               date.getMonth() === moisActuel &&
               date.getFullYear() === anneeActuelle;
      })
    : [];

  const moisPrecedent = () => {
    if (moisActuel === 0) {
      setMoisActuel(11);
      setAnneeActuelle(prev => prev - 1);
    } else {
      setMoisActuel(prev => prev - 1);
    }
    setJourSelectionne(null);
  };

  const moisSuivant = () => {
    if (moisActuel === 11) {
      setMoisActuel(0);
      setAnneeActuelle(prev => prev + 1);
    } else {
      setMoisActuel(prev => prev + 1);
    }
    setJourSelectionne(null);
  };

  const totalCalories = seancesDuMois.reduce((acc, s) => acc + s.calories, 0);
  const totalMinutes = seancesDuMois.reduce((acc, s) => acc + parseInt(s.duree), 0);

  const daysInMonth = getDaysInMonth(moisActuel, anneeActuelle);
  const firstDay = getFirstDayOfMonth(moisActuel, anneeActuelle);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>Historique</Text>
      <Text style={styles.sous}>Calendrier de tes seances</Text>

      {/* Stats du mois */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{seancesDuMois.length}</Text>
          <Text style={styles.statLabel}>Seances</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{totalCalories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>

      {/* Calendrier */}
      <View style={styles.calendrier}>

        {/* Navigation mois */}
        <View style={styles.navMois}>
          <TouchableOpacity style={styles.navBtn} onPress={moisPrecedent}>
            <Text style={styles.navBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.moisTitre}>
            {MOIS[moisActuel]} {anneeActuelle}
          </Text>
          <TouchableOpacity style={styles.navBtn} onPress={moisSuivant}>
            <Text style={styles.navBtnText}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Jours de la semaine */}
        <View style={styles.joursRow}>
          {JOURS_SEMAINE.map((j, i) => (
            <Text key={i} style={styles.jourSemaine}>{j}</Text>
          ))}
        </View>

        {/* Grille calendrier */}
        <View style={styles.grille}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.celluleVide} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const jour = i + 1;
            const aSeance = datesAvecSeance.includes(jour);
            const estAujourdhui = jour === today.getDate() &&
                                  moisActuel === today.getMonth() &&
                                  anneeActuelle === today.getFullYear();
            const estSelectionne = jourSelectionne === jour;

            return (
              <TouchableOpacity
                key={jour}
                style={[
                  styles.cellule,
                  aSeance && styles.celluleSeance,
                  estAujourdhui && styles.celluleAujourdhui,
                  estSelectionne && styles.celluleSelectionnee,
                ]}
                onPress={() => setJourSelectionne(estSelectionne ? null : jour)}
              >
                <Text style={[
                  styles.celluleTexte,
                  aSeance && styles.celluleTexteSeance,
                  estAujourdhui && styles.celluleTexteAujourdhui,
                  estSelectionne && styles.celluleTexteSelectionnee,
                ]}>
                  {jour}
                </Text>
                {aSeance && !estSelectionne && (
                  <View style={styles.pointSeance} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Legende */}
        <View style={styles.legende}>
          <View style={styles.legendeItem}>
            <View style={[styles.legendeDot, { backgroundColor: '#E63946' }]} />
            <Text style={styles.legendeTexte}>Seance</Text>
          </View>
          <View style={styles.legendeItem}>
            <View style={[styles.legendeDot, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E63946' }]} />
            <Text style={styles.legendeTexte}>Aujourd hui</Text>
          </View>
        </View>
      </View>

      {/* Detail jour selectionne */}
      {jourSelectionne && seancesDuJour.length > 0 && (
        <View style={styles.detailSection}>
          <Text style={styles.detailTitre}>
            {jourSelectionne} {MOIS[moisActuel]}
          </Text>
          {seancesDuJour.map((s, i) => (
            <View key={i} style={styles.seanceCard}>
              <View style={styles.seanceLeft}>
                <View style={[styles.seancePoint, { backgroundColor: NIVEAU_COULEURS[s.niveau] }]} />
              </View>
              <View style={styles.seanceInfo}>
                <Text style={styles.seanceNom}>{s.programme}</Text>
                <Text style={styles.seanceNiveau}>{s.niveau}</Text>
              </View>
              <View style={styles.seanceMeta}>
                <Text style={styles.seanceMetaText}>{s.duree}</Text>
                <Text style={styles.seanceMetaText}>{s.calories} kcal</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {jourSelectionne && seancesDuJour.length === 0 && (
        <View style={styles.jourVide}>
          <Text style={styles.jourVideTexte}>Pas de seance ce jour</Text>
        </View>
      )}

      {/* Liste complete */}
      <Text style={styles.sectionTitle}>TOUTES LES SEANCES</Text>
      {SEANCES_HISTORIQUE.map((s, i) => {
        const date = new Date(s.date);
        return (
          <View key={i} style={styles.listeItem}>
            <View style={styles.listeDate}>
              <Text style={styles.listeDateJour}>{date.getDate()}</Text>
              <Text style={styles.listeDateMois}>{MOIS[date.getMonth()].slice(0, 3)}</Text>
            </View>
            <View style={styles.listeInfo}>
              <Text style={styles.listeNom}>{s.programme}</Text>
              <View style={[styles.niveauBadge, { backgroundColor: NIVEAU_COULEURS[s.niveau] + '22' }]}>
                <Text style={[styles.niveauTexte, { color: NIVEAU_COULEURS[s.niveau] }]}>{s.niveau}</Text>
              </View>
            </View>
            <View style={styles.listeMeta}>
              <Text style={styles.listeMetaText}>{s.duree}</Text>
              <Text style={styles.listeMetaText}>{s.calories} kcal</Text>
            </View>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: '#E63946', fontSize: 16 },
  brand: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  sous: { color: '#aaa', fontSize: 15, marginTop: 4, marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#1a1a1a', borderRadius: 14, padding: 14, alignItems: 'center', borderLeftWidth: 3, borderLeftColor: '#E63946' },
  statVal: { color: '#E63946', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#aaa', fontSize: 11, marginTop: 4 },
  calendrier: { backgroundColor: '#1a1a1a', borderRadius: 20, padding: 20, marginBottom: 24 },
  navMois: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  navBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2a2a2a', alignItems: 'center', justifyContent: 'center' },
  navBtnText: { color: '#E63946', fontSize: 18, fontWeight: 'bold' },
  moisTitre: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  joursRow: { flexDirection: 'row', marginBottom: 8 },
  jourSemaine: { flex: 1, color: '#555', fontSize: 12, textAlign: 'center', fontWeight: 'bold' },
  grille: { flexDirection: 'row', flexWrap: 'wrap' },
  cellule: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  celluleVide: { width: '14.28%', aspectRatio: 1 },
  celluleSeance: { backgroundColor: '#E6394622' },
  celluleAujourdhui: { borderWidth: 1, borderColor: '#E63946' },
  celluleSelectionnee: { backgroundColor: '#E63946' },
  celluleTexte: { color: '#aaa', fontSize: 13 },
  celluleTexteSeance: { color: '#E63946', fontWeight: 'bold' },
  celluleTexteAujourdhui: { color: '#E63946', fontWeight: 'bold' },
  celluleTexteSelectionnee: { color: '#fff', fontWeight: 'bold' },
  pointSeance: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#E63946', marginTop: 2 },
  legende: { flexDirection: 'row', gap: 20, marginTop: 16, justifyContent: 'center' },
  legendeItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendeDot: { width: 10, height: 10, borderRadius: 5 },
  legendeTexte: { color: '#555', fontSize: 12 },
  detailSection: { marginBottom: 24 },
  detailTitre: { color: '#E63946', fontSize: 14, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  seanceCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a1a', borderRadius: 14,
    padding: 16, marginBottom: 8, gap: 14,
  },
  seanceLeft: { alignItems: 'center', justifyContent: 'center' },
  seancePoint: { width: 12, height: 12, borderRadius: 6 },
  seanceInfo: { flex: 1 },
  seanceNom: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  seanceNiveau: { color: '#666', fontSize: 12 },
  seanceMeta: { alignItems: 'flex-end', gap: 4 },
  seanceMetaText: { color: '#aaa', fontSize: 12 },
  jourVide: { alignItems: 'center', padding: 24, marginBottom: 24 },
  jourVideTexte: { color: '#555', fontSize: 14 },
  sectionTitle: { color: '#E63946', fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16 },
  listeItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a1a', borderRadius: 14,
    padding: 14, marginBottom: 8, gap: 14,
  },
  listeDate: { alignItems: 'center', width: 36 },
  listeDateJour: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listeDateMois: { color: '#555', fontSize: 11 },
  listeInfo: { flex: 1, gap: 6 },
  listeNom: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  niveauBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start' },
  niveauTexte: { fontSize: 11, fontWeight: 'bold' },
  listeMeta: { alignItems: 'flex-end', gap: 4 },
  listeMetaText: { color: '#aaa', fontSize: 12 },
});