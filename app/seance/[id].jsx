import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, Vibration
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';

const SEANCES = {
  '1': {
    titre: 'Full Body',
    niveau: 'Debutant',
    exercices: [
      { id: 1, nom: 'Squat', series: 3, reps: 12, repos: 60, muscle: 'Jambes', consigne: 'Pieds largeur epaules, dos droit' },
      { id: 2, nom: 'Pompes', series: 3, reps: 10, repos: 60, muscle: 'Pectoraux', consigne: 'Corps droit, descends jusqu au sol' },
      { id: 3, nom: 'Rowing haltere', series: 3, reps: 12, repos: 60, muscle: 'Dos', consigne: 'Dos plat, tire vers la hanche' },
      { id: 4, nom: 'Developpé militaire', series: 3, reps: 10, repos: 60, muscle: 'Epaules', consigne: 'Pousse vers le haut, core engage' },
      { id: 5, nom: 'Planche', series: 3, reps: 30, repos: 45, muscle: 'Abdos', consigne: 'Corps droit comme une planche', isTemps: true },
    ],
  },
  '2': {
    titre: 'Push Pull Legs',
    niveau: 'Intermediaire',
    exercices: [
      { id: 1, nom: 'Developpé couché', series: 4, reps: 10, repos: 90, muscle: 'Pectoraux', consigne: 'Barre a hauteur de poitrine' },
      { id: 2, nom: 'Elevation laterale', series: 3, reps: 15, repos: 60, muscle: 'Epaules', consigne: 'Coudes legerement flechis' },
      { id: 3, nom: 'Triceps poulie', series: 3, reps: 12, repos: 60, muscle: 'Triceps', consigne: 'Coudes fixes contre le corps' },
      { id: 4, nom: 'Traction', series: 4, reps: 8, repos: 90, muscle: 'Dos', consigne: 'Tire jusqu au menton' },
      { id: 5, nom: 'Curl biceps', series: 3, reps: 12, repos: 60, muscle: 'Biceps', consigne: 'Coudes fixes, contracte en haut' },
    ],
  },
  '3': {
    titre: 'HIIT Cardio',
    niveau: 'Avance',
    exercices: [
      { id: 1, nom: 'Burpees', series: 4, reps: 20, repos: 10, muscle: 'Full Body', consigne: 'Enchaine saut pompe et retour', isTemps: true },
      { id: 2, nom: 'Mountain Climbers', series: 4, reps: 20, repos: 10, muscle: 'Abdos', consigne: 'Rapide, genoux vers la poitrine', isTemps: true },
      { id: 3, nom: 'Jump Squats', series: 4, reps: 20, repos: 10, muscle: 'Jambes', consigne: 'Explose vers le haut', isTemps: true },
      { id: 4, nom: 'High Knees', series: 4, reps: 20, repos: 10, muscle: 'Cardio', consigne: 'Genoux a hauteur de hanches', isTemps: true },
      { id: 5, nom: 'Box Jumps', series: 4, reps: 20, repos: 10, muscle: 'Explosivite', consigne: 'Reception souple', isTemps: true },
    ],
  },
  '4': {
    titre: 'Force et Puissance',
    niveau: 'Avance',
    exercices: [
      { id: 1, nom: 'Squat barre', series: 5, reps: 5, repos: 180, muscle: 'Jambes', consigne: 'Descends sous le parallele' },
      { id: 2, nom: 'Souleve de terre', series: 5, reps: 5, repos: 180, muscle: 'Dos', consigne: 'Dos plat, pousse dans le sol' },
      { id: 3, nom: 'Developpe couche lourd', series: 5, reps: 5, repos: 180, muscle: 'Pectoraux', consigne: 'Prise large, descends lentement' },
      { id: 4, nom: 'Rowing barre', series: 4, reps: 6, repos: 120, muscle: 'Dos', consigne: 'Penche a 45 degres' },
      { id: 5, nom: 'Developpe militaire', series: 4, reps: 6, repos: 120, muscle: 'Epaules', consigne: 'Debout, core tres engage' },
    ],
  },
};

export default function Seance() {
  const { id } = useLocalSearchParams();
  const seance = SEANCES[id];

  const [exerciceActuel, setExerciceActuel] = useState(0);
  const [serieActuelle, setSerieActuelle] = useState(1);
  const [phase, setPhase] = useState('exercice');
  const [tempsRepos, setTempsRepos] = useState(0);
  const [tempsExercice, setTempsExercice] = useState(0);
  const [actif, setActif] = useState(false);
  const [repsValidees, setRepsValidees] = useState([]);
  const [seanceTerminee, setSeanceTerminee] = useState(false);
  const [tempsTotal, setTempsTotal] = useState(0);
  const [voixActive, setVoixActive] = useState(true);

  const intervalRepos = useRef(null);
  const intervalExercice = useRef(null);
  const intervalTotal = useRef(null);

  const ex = seance?.exercices[exerciceActuel];

  useEffect(() => {
    intervalTotal.current = setInterval(() => {
      setTempsTotal(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intervalTotal.current);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalRepos.current);
      clearInterval(intervalExercice.current);
    };
  }, []);

  const parler = (texte) => {
    if (voixActive) {
      Speech.speak(texte, { language: 'fr-FR', pitch: 1.0, rate: 0.9 });
    }
  };

  const demarrerRepos = (duree) => {
    setPhase('repos');
    setTempsRepos(duree);
    parler(`Repos ${duree} secondes`);

    intervalRepos.current = setInterval(() => {
      setTempsRepos(prev => {
        if (prev <= 1) {
          clearInterval(intervalRepos.current);
          Vibration.vibrate([0, 500, 200, 500]);
          parler('C est parti !');
          setPhase('exercice');
          return 0;
        }
        if (prev <= 4) parler(`${prev - 1}`);
        return prev - 1;
      });
    }, 1000);
  };

  const demarrerExerciceTemps = () => {
    setActif(true);
    setTempsExercice(ex.reps);
    parler(`${ex.nom}, go !`);

    intervalExercice.current = setInterval(() => {
      setTempsExercice(prev => {
        if (prev <= 1) {
          clearInterval(intervalExercice.current);
          setActif(false);
          Vibration.vibrate([0, 300]);
          validerSerie();
          return 0;
        }
        if (prev <= 4) parler(`${prev - 1}`);
        return prev - 1;
      });
    }, 1000);
  };

  const validerSerie = () => {
    const key = `${exerciceActuel}-${serieActuelle}`;
    setRepsValidees(prev => [...prev, key]);
    Vibration.vibrate(200);

    const estDerniereSerieExo = serieActuelle >= ex.series;
    const estDernierExo = exerciceActuel >= seance.exercices.length - 1;

    if (estDerniereSerieExo && estDernierExo) {
      clearInterval(intervalTotal.current);
      setSeanceTerminee(true);
      parler('Bravo ! Seance terminee !');
      return;
    }

    if (estDerniereSerieExo) {
      parler(`Exercice suivant : ${seance.exercices[exerciceActuel + 1].nom}`);
      setExerciceActuel(prev => prev + 1);
      setSerieActuelle(1);
      demarrerRepos(ex.repos);
    } else {
      setSerieActuelle(prev => prev + 1);
      demarrerRepos(ex.repos);
      parler(`Serie ${serieActuelle + 1} sur ${ex.series}`);
    }
  };

  const formaterTemps = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressionGlobale = () => {
    const totalSeries = seance.exercices.reduce((acc, e) => acc + e.series, 0);
    const seriesFaites = repsValidees.length;
    return seriesFaites / totalSeries;
  };

  if (!seance) return (
    <View style={styles.container}>
      <Text style={styles.erreur}>Seance introuvable</Text>
    </View>
  );

  if (seanceTerminee) {
    return (
      <View style={styles.containerTermine}>
        <Text style={styles.termineEmoji}>🏆</Text>
        <Text style={styles.termineTitre}>Seance terminee !</Text>
        <Text style={styles.termineSous}>{seance.titre}</Text>

        <View style={styles.statsFinales}>
          <View style={styles.statFinale}>
            <Text style={styles.statFinaleVal}>{formaterTemps(tempsTotal)}</Text>
            <Text style={styles.statFinaleLabel}>Duree</Text>
          </View>
          <View style={styles.statFinale}>
            <Text style={styles.statFinaleVal}>{seance.exercices.length}</Text>
            <Text style={styles.statFinaleLabel}>Exercices</Text>
          </View>
          <View style={styles.statFinale}>
            <Text style={styles.statFinaleVal}>{repsValidees.length}</Text>
            <Text style={styles.statFinaleLabel}>Series</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnTermine}
          onPress={() => router.back()}
        >
          <Text style={styles.btnTermineText}>Retour aux programmes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          Alert.alert('Quitter', 'Tu veux vraiment quitter la seance ?', [
            { text: 'Non', style: 'cancel' },
            { text: 'Oui', onPress: () => router.back() },
          ]);
        }}>
          <Text style={styles.quitter}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitre}>{seance.titre}</Text>
          <Text style={styles.headerTemps}>{formaterTemps(tempsTotal)}</Text>
        </View>
        <TouchableOpacity onPress={() => setVoixActive(!voixActive)}>
          <Text style={styles.voixBtn}>{voixActive ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>
      </View>

      {/* Barre progression globale */}
      <View style={styles.progressionGlobale}>
        <View style={[styles.progressionFill, { width: `${progressionGlobale() * 100}%` }]} />
      </View>

      {/* Phase repos */}
      {phase === 'repos' && (
        <View style={styles.reposContainer}>
          <Text style={styles.reposLabel}>REPOS</Text>
          <Text style={styles.reposTemps}>{tempsRepos}</Text>
          <Text style={styles.reposSous}>secondes</Text>
          <Text style={styles.prochainExo}>
            Prochain : {ex.nom} — Serie {serieActuelle}/{ex.series}
          </Text>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => {
              clearInterval(intervalRepos.current);
              setPhase('exercice');
              setTempsRepos(0);
            }}
          >
            <Text style={styles.skipBtnText}>Passer le repos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Phase exercice */}
      {phase === 'exercice' && (
        <ScrollView style={styles.exerciceContainer}>

          {/* Exercice actuel */}
          <View style={styles.exerciceCard}>
            <View style={styles.exerciceNumero}>
              <Text style={styles.exerciceNumeroText}>{exerciceActuel + 1}</Text>
            </View>
            <View style={styles.exerciceInfo}>
              <Text style={styles.exerciceNom}>{ex.nom}</Text>
              <Text style={styles.exerciceMuscle}>{ex.muscle}</Text>
            </View>
            <View style={styles.serieBadge}>
              <Text style={styles.serieBadgeText}>{serieActuelle}/{ex.series}</Text>
            </View>
          </View>

          {/* Consigne */}
          <View style={styles.consigneCard}>
            <Text style={styles.consigneLabel}>CONSIGNE</Text>
            <Text style={styles.consigneText}>{ex.consigne}</Text>
          </View>

          {/* Reps ou temps */}
          <View style={styles.repsCard}>
            {ex.isTemps ? (
              <>
                <Text style={styles.repsLabel}>TEMPS</Text>
                <Text style={styles.repsVal}>
                  {actif ? tempsExercice : ex.reps}s
                </Text>
                {!actif ? (
                  <TouchableOpacity style={styles.demarrerBtn} onPress={demarrerExerciceTemps}>
                    <Text style={styles.demarrerBtnText}>Demarrer</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.enCoursText}>En cours...</Text>
                )}
              </>
            ) : (
              <>
                <Text style={styles.repsLabel}>REPETITIONS</Text>
                <Text style={styles.repsVal}>{ex.reps}</Text>
                <TouchableOpacity style={styles.validerBtn} onPress={validerSerie}>
                  <Text style={styles.validerBtnText}>Serie validee ✓</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Series validees */}
          <View style={styles.seriesRow}>
            {Array.from({ length: ex.series }).map((_, i) => {
              const key = `${exerciceActuel}-${i + 1}`;
              const validee = repsValidees.includes(key);
              return (
                <View key={i} style={[styles.serieDot, validee && styles.serieDotValidee]}>
                  <Text style={[styles.serieDotText, validee && styles.serieDotTextValidee]}>
                    {i + 1}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Exercices suivants */}
          <Text style={styles.suiteLabel}>EXERCICES SUIVANTS</Text>
          {seance.exercices.slice(exerciceActuel + 1).map((e, i) => (
            <View key={i} style={styles.suiteItem}>
              <Text style={styles.suiteNom}>{e.nom}</Text>
              <Text style={styles.suiteMeta}>{e.series}x{e.reps} • {e.muscle}</Text>
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  containerTermine: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', padding: 24 },
  erreur: { color: '#E63946', fontSize: 16, textAlign: 'center', marginTop: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  quitter: { color: '#666', fontSize: 20 },
  headerInfo: { alignItems: 'center' },
  headerTitre: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerTemps: { color: '#E63946', fontSize: 13, marginTop: 2 },
  voixBtn: { fontSize: 20 },
  progressionGlobale: {
    height: 3,
    backgroundColor: '#2a2a2a',
    marginHorizontal: 24,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressionFill: { height: '100%', backgroundColor: '#E63946', borderRadius: 2 },
  reposContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  reposLabel: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 16 },
  reposTemps: { color: '#fff', fontSize: 96, fontWeight: 'bold' },
  reposSous: { color: '#666', fontSize: 18, marginBottom: 32 },
  prochainExo: { color: '#aaa', fontSize: 14, marginBottom: 32, textAlign: 'center' },
  skipBtn: { borderWidth: 1, borderColor: '#333', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  skipBtnText: { color: '#666', fontSize: 14 },
  exerciceContainer: { flex: 1, paddingHorizontal: 24 },
  exerciceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  exerciceNumero: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  exerciceNumeroText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  exerciceInfo: { flex: 1 },
  exerciceNom: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  exerciceMuscle: { color: '#E63946', fontSize: 12, marginTop: 2 },
  serieBadge: { backgroundColor: '#2a2a2a', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  serieBadgeText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  consigneCard: { backgroundColor: '#1a1a1a', borderRadius: 14, padding: 16, marginBottom: 12 },
  consigneLabel: { color: '#555', fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  consigneText: { color: '#aaa', fontSize: 14, lineHeight: 22 },
  repsCard: { backgroundColor: '#1a1a1a', borderRadius: 14, padding: 20, marginBottom: 16, alignItems: 'center' },
  repsLabel: { color: '#555', fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  repsVal: { color: '#E63946', fontSize: 64, fontWeight: 'bold', marginBottom: 20 },
  validerBtn: { backgroundColor: '#E63946', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 16, width: '100%', alignItems: 'center' },
  validerBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  demarrerBtn: { backgroundColor: '#4caf50', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 16, width: '100%', alignItems: 'center' },
  demarrerBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  enCoursText: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  seriesRow: { flexDirection: 'row', gap: 10, marginBottom: 24, justifyContent: 'center' },
  serieDot: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1a1a1a', borderWidth: 2, borderColor: '#2a2a2a', alignItems: 'center', justifyContent: 'center' },
  serieDotValidee: { backgroundColor: '#E63946', borderColor: '#E63946' },
  serieDotText: { color: '#555', fontSize: 16, fontWeight: 'bold' },
  serieDotTextValidee: { color: '#fff' },
  suiteLabel: { color: '#555', fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  suiteItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 8 },
  suiteNom: { color: '#aaa', fontSize: 14 },
  suiteMeta: { color: '#555', fontSize: 13 },
  termineEmoji: { fontSize: 80, marginBottom: 24 },
  termineTitre: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  termineSous: { color: '#aaa', fontSize: 16, marginBottom: 40 },
  statsFinales: { flexDirection: 'row', gap: 24, marginBottom: 48 },
  statFinale: { alignItems: 'center' },
  statFinaleVal: { color: '#E63946', fontSize: 28, fontWeight: 'bold' },
  statFinaleLabel: { color: '#aaa', fontSize: 13, marginTop: 4 },
  btnTermine: { backgroundColor: '#E63946', borderRadius: 16, padding: 18, alignItems: 'center', width: '100%' },
  btnTermineText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});