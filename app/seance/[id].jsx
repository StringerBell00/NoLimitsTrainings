import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, Vibration
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';
import { useTheme } from '../ThemeContext';

const SEANCES = {
  '1': {
    titre: 'Full Body',
    niveau: 'Debutant',
    exercices: [
      { id: 1, nom: 'Squat', series: 3, reps: 12, repos: 60, muscle: 'Jambes', consigne: 'Pieds largeur epaules, dos droit' },
      { id: 2, nom: 'Pompes', series: 3, reps: 10, repos: 60, muscle: 'Pectoraux', consigne: 'Corps droit, descends jusqu au sol' },
      { id: 3, nom: 'Rowing haltere', series: 3, reps: 12, repos: 60, muscle: 'Dos', consigne: 'Dos plat, tire vers la hanche' },
      { id: 4, nom: 'Developpe militaire', series: 3, reps: 10, repos: 60, muscle: 'Epaules', consigne: 'Pousse vers le haut, core engage' },
      { id: 5, nom: 'Planche', series: 3, reps: 30, repos: 45, muscle: 'Abdos', consigne: 'Corps droit comme une planche', isTemps: true },
    ],
  },
  '2': {
    titre: 'Push Pull Legs',
    niveau: 'Intermediaire',
    exercices: [
      { id: 1, nom: 'Developpe couche', series: 4, reps: 10, repos: 90, muscle: 'Pectoraux', consigne: 'Barre a hauteur de poitrine' },
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
  const { theme } = useTheme();
  const s = createStyles(theme);
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
    if (voixActive) Speech.speak(texte, { language: 'fr-FR', pitch: 1.0, rate: 0.9 });
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
    return repsValidees.length / totalSeries;
  };

  if (!seance) return (
    <View style={s.container}>
      <Text style={s.erreur}>Seance introuvable</Text>
    </View>
  );

  if (seanceTerminee) {
    return (
      <View style={s.containerTermine}>
        <Text style={s.termineTitre}>Seance terminee !</Text>
        <Text style={s.termineSous}>{seance.titre}</Text>
        <View style={s.statsFinales}>
          <View style={s.statFinale}>
            <Text style={s.statFinaleVal}>{formaterTemps(tempsTotal)}</Text>
            <Text style={s.statFinaleLabel}>Duree</Text>
          </View>
          <View style={s.statFinale}>
            <Text style={s.statFinaleVal}>{seance.exercices.length}</Text>
            <Text style={s.statFinaleLabel}>Exercices</Text>
          </View>
          <View style={s.statFinale}>
            <Text style={s.statFinaleVal}>{repsValidees.length}</Text>
            <Text style={s.statFinaleLabel}>Series</Text>
          </View>
        </View>
        <TouchableOpacity style={s.btnTermine} onPress={() => router.back()}>
          <Text style={s.btnTermineText}>Retour aux programmes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => {
          Alert.alert('Quitter', 'Tu veux vraiment quitter la seance ?', [
            { text: 'Non', style: 'cancel' },
            { text: 'Oui', onPress: () => router.back() },
          ]);
        }}>
          <Text style={s.quitter}>✕</Text>
        </TouchableOpacity>
        <View style={s.headerInfo}>
          <Text style={s.headerTitre}>{seance.titre}</Text>
          <Text style={s.headerTemps}>{formaterTemps(tempsTotal)}</Text>
        </View>
        <TouchableOpacity onPress={() => setVoixActive(!voixActive)}>
          <Text style={s.voixBtn}>{voixActive ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>
      </View>

      <View style={s.progressionGlobale}>
        <View style={[s.progressionFill, { width: `${progressionGlobale() * 100}%` }]} />
      </View>

      {phase === 'repos' && (
        <View style={s.reposContainer}>
          <Text style={s.reposLabel}>REPOS</Text>
          <Text style={s.reposTemps}>{tempsRepos}</Text>
          <Text style={s.reposSous}>secondes</Text>
          <Text style={s.prochainExo}>
            Prochain : {ex.nom} — Serie {serieActuelle}/{ex.series}
          </Text>
          <TouchableOpacity
            style={s.skipBtn}
            onPress={() => {
              clearInterval(intervalRepos.current);
              setPhase('exercice');
              setTempsRepos(0);
            }}
          >
            <Text style={s.skipBtnText}>Passer le repos</Text>
          </TouchableOpacity>
        </View>
      )}

      {phase === 'exercice' && (
        <ScrollView style={s.exerciceContainer}>
          <View style={s.exerciceCard}>
            <View style={s.exerciceNumero}>
              <Text style={s.exerciceNumeroText}>{exerciceActuel + 1}</Text>
            </View>
            <View style={s.exerciceInfo}>
              <Text style={s.exerciceNom}>{ex.nom}</Text>
              <Text style={s.exerciceMuscle}>{ex.muscle}</Text>
            </View>
            <View style={s.serieBadge}>
              <Text style={s.serieBadgeText}>{serieActuelle}/{ex.series}</Text>
            </View>
          </View>

          <View style={s.consigneCard}>
            <Text style={s.consigneLabel}>CONSIGNE</Text>
            <Text style={s.consigneText}>{ex.consigne}</Text>
          </View>

          <View style={s.repsCard}>
            {ex.isTemps ? (
              <>
                <Text style={s.repsLabel}>TEMPS</Text>
                <Text style={s.repsVal}>{actif ? tempsExercice : ex.reps}s</Text>
                {!actif ? (
                  <TouchableOpacity style={s.demarrerBtn} onPress={demarrerExerciceTemps}>
                    <Text style={s.demarrerBtnText}>Demarrer</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={s.enCoursText}>En cours...</Text>
                )}
              </>
            ) : (
              <>
                <Text style={s.repsLabel}>REPETITIONS</Text>
                <Text style={s.repsVal}>{ex.reps}</Text>
                <TouchableOpacity style={s.validerBtn} onPress={validerSerie}>
                  <Text style={s.validerBtnText}>Serie validee ✓</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={s.seriesRow}>
            {Array.from({ length: ex.series }).map((_, i) => {
              const key = `${exerciceActuel}-${i + 1}`;
              const validee = repsValidees.includes(key);
              return (
                <View key={i} style={[s.serieDot, validee && s.serieDotValidee]}>
                  <Text style={[s.serieDotText, validee && s.serieDotTextValidee]}>
                    {i + 1}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={s.suiteLabel}>EXERCICES SUIVANTS</Text>
          {seance.exercices.slice(exerciceActuel + 1).map((e, i) => (
            <View key={i} style={s.suiteItem}>
              <Text style={s.suiteNom}>{e.nom}</Text>
              <Text style={s.suiteMeta}>{e.series}x{e.reps} • {e.muscle}</Text>
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  containerTermine: { flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  erreur: { color: theme.accent, fontSize: 16, textAlign: 'center', marginTop: 60 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16,
  },
  quitter: { color: theme.texteFaible, fontSize: 20 },
  headerInfo: { alignItems: 'center' },
  headerTitre: { color: theme.texte, fontSize: 16, fontWeight: 'bold' },
  headerTemps: { color: theme.accent, fontSize: 13, marginTop: 2 },
  voixBtn: { fontSize: 20 },
  progressionGlobale: { height: 3, backgroundColor: theme.card2, marginHorizontal: 24, borderRadius: 2, overflow: 'hidden', marginBottom: 24 },
  progressionFill: { height: '100%', backgroundColor: theme.accent, borderRadius: 2 },
  reposContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  reposLabel: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 16 },
  reposTemps: { color: theme.texte, fontSize: 96, fontWeight: 'bold' },
  reposSous: { color: theme.texteFaible, fontSize: 18, marginBottom: 32 },
  prochainExo: { color: theme.texteSous, fontSize: 14, marginBottom: 32, textAlign: 'center' },
  skipBtn: { borderWidth: 1, borderColor: theme.bordure, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  skipBtnText: { color: theme.texteFaible, fontSize: 14 },
  exerciceContainer: { flex: 1, paddingHorizontal: 24 },
  exerciceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 12, gap: 14 },
  exerciceNumero: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  exerciceNumeroText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  exerciceInfo: { flex: 1 },
  exerciceNom: { color: theme.texte, fontSize: 18, fontWeight: 'bold' },
  exerciceMuscle: { color: theme.accent, fontSize: 12, marginTop: 2 },
  serieBadge: { backgroundColor: theme.card2, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  serieBadgeText: { color: theme.texte, fontSize: 14, fontWeight: 'bold' },
  consigneCard: { backgroundColor: theme.card, borderRadius: 14, padding: 16, marginBottom: 12 },
  consigneLabel: { color: theme.texteFaible, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  consigneText: { color: theme.texteSous, fontSize: 14, lineHeight: 22 },
  repsCard: { backgroundColor: theme.card, borderRadius: 14, padding: 20, marginBottom: 16, alignItems: 'center' },
  repsLabel: { color: theme.texteFaible, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  repsVal: { color: theme.accent, fontSize: 64, fontWeight: 'bold', marginBottom: 20 },
  validerBtn: { backgroundColor: theme.accent, borderRadius: 14, paddingHorizontal: 32, paddingVertical: 16, width: '100%', alignItems: 'center' },
  validerBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  demarrerBtn: { backgroundColor: '#4caf50', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 16, width: '100%', alignItems: 'center' },
  demarrerBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  enCoursText: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  seriesRow: { flexDirection: 'row', gap: 10, marginBottom: 24, justifyContent: 'center' },
  serieDot: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.card, borderWidth: 2, borderColor: theme.card2, alignItems: 'center', justifyContent: 'center' },
  serieDotValidee: { backgroundColor: theme.accent, borderColor: theme.accent },
  serieDotText: { color: theme.texteFaible, fontSize: 16, fontWeight: 'bold' },
  serieDotTextValidee: { color: '#fff' },
  suiteLabel: { color: theme.texteFaible, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  suiteItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.card, borderRadius: 12, padding: 14, marginBottom: 8 },
  suiteNom: { color: theme.texteSous, fontSize: 14 },
  suiteMeta: { color: theme.texteFaible, fontSize: 13 },
  termineTitre: { color: theme.texte, fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  termineSous: { color: theme.texteSous, fontSize: 16, marginBottom: 40 },
  statsFinales: { flexDirection: 'row', gap: 24, marginBottom: 48 },
  statFinale: { alignItems: 'center' },
  statFinaleVal: { color: theme.accent, fontSize: 28, fontWeight: 'bold' },
  statFinaleLabel: { color: theme.texteSous, fontSize: 13, marginTop: 4 },
  btnTermine: { backgroundColor: theme.accent, borderRadius: 16, padding: 18, alignItems: 'center', width: '100%' },
  btnTermineText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});