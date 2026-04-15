import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

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
  const [onglet, setOnglet] = useState('actifs');
  const [defisRejoints, setDefisRejoints] = useState([1, 2, 3]);

  const rejoindre = (id) => {
    if (defisRejoints.includes(id)) return;
    setDefisRejoints(prev => [...prev, id]);
    Alert.alert('Defi rejoint !', 'Bonne chance ! Tu peux le faire.');
  };

  const totalPoints = DEFIS_TERMINES.length * 150;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>Defis</Text>
      <Text style={styles.sous}>Releve les challenges de la semaine</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{defisRejoints.length}</Text>
          <Text style={styles.statLabel}>En cours</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{DEFIS_TERMINES.length}</Text>
          <Text style={styles.statLabel}>Termines</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statVal}>{totalPoints}</Text>
          <Text style={styles.statLabel}>Points gagnes</Text>
        </View>
      </View>

      {/* Onglets */}
      <View style={styles.onglets}>
        <TouchableOpacity
          style={[styles.onglet, onglet === 'actifs' && styles.ongletActif]}
          onPress={() => setOnglet('actifs')}
        >
          <Text style={[styles.ongletText, onglet === 'actifs' && styles.ongletTextActif]}>
            Defis actifs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.onglet, onglet === 'termines' && styles.ongletActif]}
          onPress={() => setOnglet('termines')}
        >
          <Text style={[styles.ongletText, onglet === 'termines' && styles.ongletTextActif]}>
            Termines
          </Text>
        </TouchableOpacity>
      </View>

      {/* Defis actifs */}
      {onglet === 'actifs' && (
        <View>
          {DEFIS.map(d => {
            const rejoint = defisRejoints.includes(d.id);
            const pct = Math.min((d.progression / d.total) * 100, 100);

            return (
              <View key={d.id} style={styles.defiCard}>

                {/* Header */}
                <View style={styles.defiHeader}>
                  <View style={styles.defiTitreRow}>
                    <Text style={styles.defiTitre}>{d.titre}</Text>
                    <View style={[styles.difficulteBadge, { backgroundColor: DIFFICULTE_COULEURS[d.difficulte] + '22' }]}>
                      <Text style={[styles.difficulteTexte, { color: DIFFICULTE_COULEURS[d.difficulte] }]}>
                        {d.difficulte}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.defiDescription}>{d.description}</Text>
                </View>

                {/* Progression */}
                {rejoint && (
                  <View style={styles.progressionSection}>
                    <View style={styles.progressionHeader}>
                      <Text style={styles.progressionLabel}>Progression</Text>
                      <Text style={[styles.progressionVal, { color: d.couleur }]}>
                        {d.progression} / {d.total}
                        {d.type === 'calories' ? ' kcal' : d.type === 'regularite' ? ' jours' : ''}
                      </Text>
                    </View>
                    <View style={styles.progressionBarre}>
                      <View style={[styles.progressionFill, { width: `${pct}%`, backgroundColor: d.couleur }]} />
                    </View>
                    <Text style={styles.progressionPct}>{Math.round(pct)}% complete</Text>
                  </View>
                )}

                {/* Footer */}
                <View style={styles.defiFooter}>
                  <View style={styles.defiInfos}>
                    <Text style={styles.defiExpire}>Expire dans {d.expire}</Text>
                    <Text style={styles.defiParticipants}>{d.participants} participants</Text>
                  </View>
                  <View style={styles.recompenseTag}>
                    <Text style={styles.recompenseTexte}>{d.recompense}</Text>
                  </View>
                </View>

                {/* Bouton */}
                <TouchableOpacity
                  style={[styles.defiBtn, rejoint && { backgroundColor: '#1a3a1a', borderColor: '#4caf50' }]}
                  onPress={() => rejoindre(d.id)}
                >
                  <Text style={[styles.defiBtnText, rejoint && { color: '#4caf50' }]}>
                    {rejoint ? 'Defi rejoint' : 'Rejoindre le defi'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {/* Defis termines */}
      {onglet === 'termines' && (
        <View>
          {DEFIS_TERMINES.map((d, i) => (
            <View key={i} style={styles.termineCard}>
              <View style={styles.termineIcone}>
                <Text style={styles.termineIconeTexte}>🏆</Text>
              </View>
              <View style={styles.termineInfo}>
                <Text style={styles.termineNom}>{d.titre}</Text>
                <Text style={styles.termineDate}>{d.date}</Text>
              </View>
              <View style={styles.termineRecompense}>
                <Text style={styles.termineRecompenseTexte}>{d.recompense}</Text>
              </View>
            </View>
          ))}

          {DEFIS_TERMINES.length === 0 && (
            <View style={styles.vide}>
              <Text style={styles.videTexte}>Pas encore de defis termines</Text>
              <Text style={styles.videConseils}>Rejoins un defi pour commencer !</Text>
            </View>
          )}
        </View>
      )}

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
  onglets: { flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  onglet: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  ongletActif: { borderBottomWidth: 2, borderBottomColor: '#E63946' },
  ongletText: { color: '#555', fontSize: 14, fontWeight: '600' },
  ongletTextActif: { color: '#E63946' },
  defiCard: { backgroundColor: '#1a1a1a', borderRadius: 20, padding: 20, marginBottom: 16 },
  defiHeader: { marginBottom: 16 },
  defiTitreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  defiTitre: { color: '#fff', fontSize: 17, fontWeight: 'bold', flex: 1 },
  difficulteBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  difficulteTexte: { fontSize: 11, fontWeight: 'bold' },
  defiDescription: { color: '#aaa', fontSize: 14, lineHeight: 20 },
  progressionSection: { marginBottom: 16 },
  progressionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressionLabel: { color: '#555', fontSize: 12 },
  progressionVal: { fontSize: 13, fontWeight: 'bold' },
  progressionBarre: { height: 8, backgroundColor: '#2a2a2a', borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  progressionFill: { height: '100%', borderRadius: 4 },
  progressionPct: { color: '#555', fontSize: 11 },
  defiFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  defiInfos: {},
  defiExpire: { color: '#E63946', fontSize: 12, fontWeight: 'bold' },
  defiParticipants: { color: '#555', fontSize: 11, marginTop: 2 },
  recompenseTag: { backgroundColor: '#1a3a1a', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  recompenseTexte: { color: '#4caf50', fontSize: 12, fontWeight: 'bold' },
  defiBtn: {
    borderWidth: 1, borderColor: '#E63946',
    borderRadius: 12, paddingVertical: 12,
    alignItems: 'center',
  },
  defiBtnText: { color: '#E63946', fontWeight: 'bold', fontSize: 14 },
  termineCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a1a', borderRadius: 14,
    padding: 16, marginBottom: 10, gap: 14,
  },
  termineIcone: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2a2a2a', alignItems: 'center', justifyContent: 'center' },
  termineIconeTexte: { fontSize: 22 },
  termineInfo: { flex: 1 },
  termineNom: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  termineDate: { color: '#555', fontSize: 12, marginTop: 2 },
  termineRecompense: { backgroundColor: '#1a3a1a', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  termineRecompenseTexte: { color: '#4caf50', fontSize: 12, fontWeight: 'bold' },
  vide: { alignItems: 'center', paddingTop: 60 },
  videTexte: { color: '#aaa', fontSize: 16, marginBottom: 8 },
  videConseils: { color: '#555', fontSize: 13 },
});