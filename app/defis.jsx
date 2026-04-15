import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from './ThemeContext';

const DEFIS = [
  {
    id: 1,
    titre: '7 jours de suite',
    description: 'Complete une seance chaque jour pendant 7 jours consecutifs.',
    recompense: '500 pts + Badge Or',
    difficulte: 'Difficile',
    couleur: '#ffd700',
    progression: 4,
    total: 7,
    expire: '3 jours',
    participants: 234,
    type: 'regularite',
  },
  {
    id: 2,
    titre: 'Bruleur de calories',
    description: 'Brule 2000 calories en seances cette semaine.',
    recompense: '300 pts + Badge Flamme',
    difficulte: 'Intermediaire',
    couleur: '#E63946',
    progression: 1380,
    total: 2000,
    expire: '5 jours',
    participants: 189,
    type: 'calories',
  },
  {
    id: 3,
    titre: 'Maitre du HIIT',
    description: 'Complete 3 seances HIIT Cardio cette semaine.',
    recompense: '200 pts + Badge Eclair',
    difficulte: 'Intermediaire',
    couleur: '#ff9800',
    progression: 1,
    total: 3,
    expire: '4 jours',
    participants: 156,
    type: 'programme',
  },
  {
    id: 4,
    titre: 'Force maximale',
    description: 'Complete le programme Force et Puissance 2 fois.',
    recompense: '250 pts + Badge Haltere',
    difficulte: 'Avance',
    couleur: '#9c27b0',
    progression: 1,
    total: 2,
    expire: '6 jours',
    participants: 98,
    type: 'programme',
  },
  {
    id: 5,
    titre: 'Debutant assidu',
    description: 'Complete 5 seances Full Body ce mois.',
    recompense: '150 pts + Badge Etoile',
    difficulte: 'Debutant',
    couleur: '#4caf50',
    progression: 3,
    total: 5,
    expire: '18 jours',
    participants: 412,
    type: 'programme',
  },
  {
    id: 6,
    titre: 'Communaute active',
    description: 'Publie 3 seances sur le fil de la communaute.',
    recompense: '100 pts + Badge Social',
    difficulte: 'Facile',
    couleur: '#4fc3f7',
    progression: 1,
    total: 3,
    expire: '7 jours',
    participants: 523,
    type: 'social',
  },
];

const DEFIS_TERMINES = [
  { titre: 'Premier pas', recompense: '100 pts', date: '10 Avr' },
  { titre: 'Semaine complete', recompense: '200 pts', date: '07 Avr' },
  { titre: 'Cardio warrior', recompense: '150 pts', date: '01 Avr' },
];

const DIFFICULTE_COULEURS = {
  'Facile': '#4caf50',
  'Debutant': '#4caf50',
  'Intermediaire': '#ff9800',
  'Difficile': '#E63946',
  'Avance': '#9c27b0',
};

export default function Defis() {
  const { theme } = useTheme();
  const s = createStyles(theme);
  const [onglet, setOnglet] = useState('actifs');
  const [defisRejoints, setDefisRejoints] = useState([1, 2, 3]);

  const rejoindre = (id) => {
    if (defisRejoints.includes(id)) return;
    setDefisRejoints(prev => [...prev, id]);
    Alert.alert('Defi rejoint !', 'Bonne chance ! Tu peux le faire.');
  };

  const totalPoints = DEFIS_TERMINES.length * 150;

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>Defis</Text>
      <Text style={s.sous}>Releve les challenges de la semaine</Text>

      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statVal}>{defisRejoints.length}</Text>
          <Text style={s.statLabel}>En cours</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{DEFIS_TERMINES.length}</Text>
          <Text style={s.statLabel}>Termines</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>{totalPoints}</Text>
          <Text style={s.statLabel}>Points gagnes</Text>
        </View>
      </View>

      <View style={s.onglets}>
        <TouchableOpacity
          style={[s.onglet, onglet === 'actifs' && s.ongletActif]}
          onPress={() => setOnglet('actifs')}
        >
          <Text style={[s.ongletText, onglet === 'actifs' && s.ongletTextActif]}>Defis actifs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.onglet, onglet === 'termines' && s.ongletActif]}
          onPress={() => setOnglet('termines')}
        >
          <Text style={[s.ongletText, onglet === 'termines' && s.ongletTextActif]}>Termines</Text>
        </TouchableOpacity>
      </View>

      {onglet === 'actifs' && (
        <View>
          {DEFIS.map(d => {
            const rejoint = defisRejoints.includes(d.id);
            const pct = Math.min((d.progression / d.total) * 100, 100);

            return (
              <View key={d.id} style={s.defiCard}>
                <View style={s.defiHeader}>
                  <View style={s.defiTitreRow}>
                    <Text style={s.defiTitre}>{d.titre}</Text>
                    <View style={[s.difficulteBadge, { backgroundColor: DIFFICULTE_COULEURS[d.difficulte] + '22' }]}>
                      <Text style={[s.difficulteTexte, { color: DIFFICULTE_COULEURS[d.difficulte] }]}>
                        {d.difficulte}
                      </Text>
                    </View>
                  </View>
                  <Text style={s.defiDescription}>{d.description}</Text>
                </View>

                {rejoint && (
                  <View style={s.progressionSection}>
                    <View style={s.progressionHeader}>
                      <Text style={s.progressionLabel}>Progression</Text>
                      <Text style={[s.progressionVal, { color: d.couleur }]}>
                        {d.progression} / {d.total}
                        {d.type === 'calories' ? ' kcal' : d.type === 'regularite' ? ' jours' : ''}
                      </Text>
                    </View>
                    <View style={s.progressionBarre}>
                      <View style={[s.progressionFill, { width: `${pct}%`, backgroundColor: d.couleur }]} />
                    </View>
                    <Text style={s.progressionPct}>{Math.round(pct)}% complete</Text>
                  </View>
                )}

                <View style={s.defiFooter}>
                  <View>
                    <Text style={s.defiExpire}>Expire dans {d.expire}</Text>
                    <Text style={s.defiParticipants}>{d.participants} participants</Text>
                  </View>
                  <View style={s.recompenseTag}>
                    <Text style={s.recompenseTexte}>{d.recompense}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[s.defiBtn, rejoint && s.defiBtnRejoint]}
                  onPress={() => rejoindre(d.id)}
                >
                  <Text style={[s.defiBtnText, rejoint && s.defiBtnTextRejoint]}>
                    {rejoint ? 'Defi rejoint' : 'Rejoindre le defi'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {onglet === 'termines' && (
        <View>
          {DEFIS_TERMINES.map((d, i) => (
            <View key={i} style={s.termineCard}>
              <View style={s.termineIcone}>
                <Text style={s.termineIconeTexte}>★</Text>
              </View>
              <View style={s.termineInfo}>
                <Text style={s.termineNom}>{d.titre}</Text>
                <Text style={s.termineDate}>{d.date}</Text>
              </View>
              <View style={s.termineRecompense}>
                <Text style={s.termineRecompenseTexte}>{d.recompense}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

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
  onglets: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: theme.bordure },
  onglet: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  ongletActif: { borderBottomWidth: 2, borderBottomColor: theme.accent },
  ongletText: { color: theme.texteFaible, fontSize: 14, fontWeight: '600' },
  ongletTextActif: { color: theme.accent },
  defiCard: { backgroundColor: theme.card, borderRadius: 20, padding: 20, marginBottom: 16 },
  defiHeader: { marginBottom: 16 },
  defiTitreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  defiTitre: { color: theme.texte, fontSize: 17, fontWeight: 'bold', flex: 1 },
  difficulteBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  difficulteTexte: { fontSize: 11, fontWeight: 'bold' },
  defiDescription: { color: theme.texteSous, fontSize: 14, lineHeight: 20 },
  progressionSection: { marginBottom: 16 },
  progressionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressionLabel: { color: theme.texteFaible, fontSize: 12 },
  progressionVal: { fontSize: 13, fontWeight: 'bold' },
  progressionBarre: { height: 8, backgroundColor: theme.card2, borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  progressionFill: { height: '100%', borderRadius: 4 },
  progressionPct: { color: theme.texteFaible, fontSize: 11 },
  defiFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  defiExpire: { color: theme.accent, fontSize: 12, fontWeight: 'bold' },
  defiParticipants: { color: theme.texteFaible, fontSize: 11, marginTop: 2 },
  recompenseTag: { backgroundColor: '#1a3a1a', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  recompenseTexte: { color: '#4caf50', fontSize: 12, fontWeight: 'bold' },
  defiBtn: { borderWidth: 1, borderColor: theme.accent, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  defiBtnRejoint: { backgroundColor: '#1a3a1a', borderColor: '#4caf50' },
  defiBtnText: { color: theme.accent, fontWeight: 'bold', fontSize: 14 },
  defiBtnTextRejoint: { color: '#4caf50' },
  termineCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 14, padding: 16, marginBottom: 10, gap: 14 },
  termineIcone: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.card2, alignItems: 'center', justifyContent: 'center' },
  termineIconeTexte: { color: '#ffd700', fontSize: 22 },
  termineInfo: { flex: 1 },
  termineNom: { color: theme.texte, fontSize: 15, fontWeight: 'bold' },
  termineDate: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
  termineRecompense: { backgroundColor: '#1a3a1a', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  termineRecompenseTexte: { color: '#4caf50', fontSize: 12, fontWeight: 'bold' },
});