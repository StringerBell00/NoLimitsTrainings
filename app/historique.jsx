import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from './ThemeContext';

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
  const { theme } = useTheme();
  const s = createStyles(theme);

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
    if (moisActuel === 0) { setMoisActuel(11); setAnneeActuelle(prev => prev - 1); }
    else setMoisActuel(prev => prev - 1);
    setJourSelectionne(null);
  };

  const moisSuivant = () => {
    if (moisActuel === 11) { setMoisActuel(0); setAnneeActuelle(prev => prev + 1); }
    else setMoisActuel(prev => prev + 1);
    setJourSelectionne(null);
  };

  const totalCalories = seancesDuMois.reduce((acc, s) => acc + s.calories, 0);
  const totalMinutes = seancesDuMois.reduce((acc, s) => acc + parseInt(s.duree), 0);
  const daysInMonth = getDaysInMonth(moisActuel, anneeActuelle);
  const firstDay = getFirstDayOfMonth(moisActuel, anneeActuelle);

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>Historique</Text>
      <Text style={s.sous}>Calendrier de tes seances</Text>

      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statVal}>{seancesDuMois.length}</Text>
          <Text style={s.statLabel}>Seances</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{totalMinutes}</Text>
          <Text style={s.statLabel}>Minutes</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{totalCalories}</Text>
          <Text style={s.statLabel}>Calories</Text>
        </View>
      </View>

      <View style={s.calendrier}>
        <View style={s.navMois}>
          <TouchableOpacity style={s.navBtn} onPress={moisPrecedent}>
            <Text style={s.navBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={s.moisTitre}>{MOIS[moisActuel]} {anneeActuelle}</Text>
          <TouchableOpacity style={s.navBtn} onPress={moisSuivant}>
            <Text style={s.navBtnText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={s.joursRow}>
          {JOURS_SEMAINE.map((j, i) => (
            <Text key={i} style={s.jourSemaine}>{j}</Text>
          ))}
        </View>

        <View style={s.grille}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={`empty-${i}`} style={s.celluleVide} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const jour = i + 1;
            const aSeance = datesAvecSeance.includes(jour);
            const estAujourdhui = jour === today.getDate() && moisActuel === today.getMonth() && anneeActuelle === today.getFullYear();
            const estSelectionne = jourSelectionne === jour;

            return (
              <TouchableOpacity
                key={jour}
                style={[
                  s.cellule,
                  aSeance && s.celluleSeance,
                  estAujourdhui && s.celluleAujourdhui,
                  estSelectionne && s.celluleSelectionnee,
                ]}
                onPress={() => setJourSelectionne(estSelectionne ? null : jour)}
              >
                <Text style={[
                  s.celluleTexte,
                  aSeance && s.celluleTexteSeance,
                  estAujourdhui && s.celluleTexteAujourdhui,
                  estSelectionne && s.celluleTexteSelectionnee,
                ]}>
                  {jour}
                </Text>
                {aSeance && !estSelectionne && <View style={s.pointSeance} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.legende}>
          <View style={s.legendeItem}>
            <View style={[s.legendeDot, { backgroundColor: theme.accent }]} />
            <Text style={s.legendeTexte}>Seance</Text>
          </View>
          <View style={s.legendeItem}>
            <View style={[s.legendeDot, { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.accent }]} />
            <Text style={s.legendeTexte}>Aujourd hui</Text>
          </View>
        </View>
      </View>

      {jourSelectionne && seancesDuJour.length > 0 && (
        <View style={s.detailSection}>
          <Text style={s.detailTitre}>{jourSelectionne} {MOIS[moisActuel]}</Text>
          {seancesDuJour.map((se, i) => (
            <View key={i} style={s.seanceCard}>
              <View style={s.seanceLeft}>
                <View style={[s.seancePoint, { backgroundColor: NIVEAU_COULEURS[se.niveau] }]} />
              </View>
              <View style={s.seanceInfo}>
                <Text style={s.seanceNom}>{se.programme}</Text>
                <Text style={s.seanceNiveau}>{se.niveau}</Text>
              </View>
              <View style={s.seanceMeta}>
                <Text style={s.seanceMetaText}>{se.duree}</Text>
                <Text style={s.seanceMetaText}>{se.calories} kcal</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {jourSelectionne && seancesDuJour.length === 0 && (
        <View style={s.jourVide}>
          <Text style={s.jourVideTexte}>Pas de seance ce jour</Text>
        </View>
      )}

      <Text style={s.sectionTitle}>TOUTES LES SEANCES</Text>
      {SEANCES_HISTORIQUE.map((se, i) => {
        const date = new Date(se.date);
        return (
          <View key={i} style={s.listeItem}>
            <View style={s.listeDate}>
              <Text style={s.listeDateJour}>{date.getDate()}</Text>
              <Text style={s.listeDateMois}>{MOIS[date.getMonth()].slice(0, 3)}</Text>
            </View>
            <View style={s.listeInfo}>
              <Text style={s.listeNom}>{se.programme}</Text>
              <View style={[s.niveauBadge, { backgroundColor: NIVEAU_COULEURS[se.niveau] + '22' }]}>
                <Text style={[s.niveauTexte, { color: NIVEAU_COULEURS[se.niveau] }]}>{se.niveau}</Text>
              </View>
            </View>
            <View style={s.listeMeta}>
              <Text style={s.listeMetaText}>{se.duree}</Text>
              <Text style={s.listeMetaText}>{se.calories} kcal</Text>
            </View>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: theme.accent, fontSize: 16 },
  brand: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  sous: { color: theme.texteSous, fontSize: 15, marginTop: 4, marginBottom: 24 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: theme.card, borderRadius: 14, padding: 14, alignItems: 'center', borderLeftWidth: 3, borderLeftColor: theme.accent },
  statVal: { color: theme.accent, fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: theme.texteSous, fontSize: 11, marginTop: 4 },
  calendrier: { backgroundColor: theme.card, borderRadius: 20, padding: 20, marginBottom: 24 },
  navMois: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  navBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.card2, alignItems: 'center', justifyContent: 'center' },
  navBtnText: { color: theme.accent, fontSize: 18, fontWeight: 'bold' },
  moisTitre: { color: theme.texte, fontSize: 16, fontWeight: 'bold' },
  joursRow: { flexDirection: 'row', marginBottom: 8 },
  jourSemaine: { flex: 1, color: theme.texteFaible, fontSize: 12, textAlign: 'center', fontWeight: 'bold' },
  grille: { flexDirection: 'row', flexWrap: 'wrap' },
  cellule: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginVertical: 2 },
  celluleVide: { width: '14.28%', aspectRatio: 1 },
  celluleSeance: { backgroundColor: theme.accent + '22' },
  celluleAujourdhui: { borderWidth: 1, borderColor: theme.accent },
  celluleSelectionnee: { backgroundColor: theme.accent },
  celluleTexte: { color: theme.texteSous, fontSize: 13 },
  celluleTexteSeance: { color: theme.accent, fontWeight: 'bold' },
  celluleTexteAujourdhui: { color: theme.accent, fontWeight: 'bold' },
  celluleTexteSelectionnee: { color: '#fff', fontWeight: 'bold' },
  pointSeance: { width: 4, height: 4, borderRadius: 2, backgroundColor: theme.accent, marginTop: 2 },
  legende: { flexDirection: 'row', gap: 20, marginTop: 16, justifyContent: 'center' },
  legendeItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendeDot: { width: 10, height: 10, borderRadius: 5 },
  legendeTexte: { color: theme.texteFaible, fontSize: 12 },
  detailSection: { marginBottom: 24 },
  detailTitre: { color: theme.accent, fontSize: 14, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  seanceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 14, padding: 16, marginBottom: 8, gap: 14 },
  seanceLeft: { alignItems: 'center', justifyContent: 'center' },
  seancePoint: { width: 12, height: 12, borderRadius: 6 },
  seanceInfo: { flex: 1 },
  seanceNom: { color: theme.texte, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  seanceNiveau: { color: theme.texteFaible, fontSize: 12 },
  seanceMeta: { alignItems: 'flex-end', gap: 4 },
  seanceMetaText: { color: theme.texteSous, fontSize: 12 },
  jourVide: { alignItems: 'center', padding: 24, marginBottom: 24 },
  jourVideTexte: { color: theme.texteFaible, fontSize: 14 },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16 },
  listeItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 14, padding: 14, marginBottom: 8, gap: 14 },
  listeDate: { alignItems: 'center', width: 36 },
  listeDateJour: { color: theme.texte, fontSize: 18, fontWeight: 'bold' },
  listeDateMois: { color: theme.texteFaible, fontSize: 11 },
  listeInfo: { flex: 1, gap: 6 },
  listeNom: { color: theme.texte, fontSize: 14, fontWeight: 'bold' },
  niveauBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start' },
  niveauTexte: { fontSize: 11, fontWeight: 'bold' },
  listeMeta: { alignItems: 'flex-end', gap: 4 },
  listeMetaText: { color: theme.texteSous, fontSize: 12 },
});