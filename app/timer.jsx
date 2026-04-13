import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Switch, Dimensions, StatusBar
} from 'react-native';
import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');

const SONS = [
  { id: 'gong', label: 'Gong chinois', symbole: '' },
  { id: 'mecanique', label: 'Sonnerie electromecanique', symbole: '' },
  { id: 'electronique', label: 'Sonnerie electronique', symbole: '' },
  { id: 'sifflet_gym', label: 'Sifflet de gym', symbole: '' },
  { id: 'hockey', label: 'Sonnerie de hockey', symbole: '' },
  { id: 'arbitre_long', label: 'Long sifflet arbitre', symbole: '' },
  { id: 'arbitre', label: 'Sifflet arbitre', symbole: '' },
  { id: 'signal', label: 'Signal sportif', symbole: '' },
];

const COULEURS = [
  { id: 'rouge', label: 'Rouge', bg: '#1a0505', accent: '#E63946' },
  { id: 'bleu', label: 'Bleu', bg: '#05051a', accent: '#4fc3f7' },
  { id: 'vert', label: 'Vert', bg: '#051a05', accent: '#4caf50' },
  { id: 'orange', label: 'Orange', bg: '#1a0d05', accent: '#ff9800' },
  { id: 'violet', label: 'Violet', bg: '#0d051a', accent: '#9c27b0' },
  { id: 'noir', label: 'Noir pur', bg: '#000', accent: '#fff' },
];

const VOIX = [
  { id: 'masculin', label: 'Masculine' },
  { id: 'feminin', label: 'Feminine' },
];

const PRESETS = [
  { label: 'Tabata', travail: 20, repos: 10, series: 8 },
  { label: 'HIIT', travail: 40, repos: 20, series: 10 },
  { label: 'Pyramide', travail: 60, repos: 30, series: 6 },
  { label: 'Minuteur', travail: 60, repos: 0, series: 1 },
];

export default function Timer() {
  const [ecran, setEcran] = useState('config');
  const [travail, setTravail] = useState(20);
  const [repos, setRepos] = useState(10);
  const [series, setSeries] = useState(8);
  const [serieActuelle, setSerieActuelle] = useState(1);
  const [phase, setPhase] = useState('travail');
  const [tempsRestant, setTempsRestant] = useState(20);
  const [actif, setActif] = useState(false);
  const [termine, setTermine] = useState(false);
  const [sonChoisi, setSonChoisi] = useState('gong');
  const [couleur, setCouleur] = useState('rouge');
  const [voixActive, setVoixActive] = useState(false);
  const [voix, setVoix] = useState('masculin');
  const [rotation, setRotation] = useState(false);
  const [ongletConfig, setOngletConfig] = useState('timer');

  const intervalRef = useRef(null);
  const couleurObj = COULEURS.find(c => c.id === couleur);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  useEffect(() => {
    if (actif && !termine) {
      intervalRef.current = setInterval(() => {
        setTempsRestant(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            jouerSon();
            passerPhase();
            return 0;
          }
          if (prev <= 4 && voixActive) {
            parler(`${prev - 1}`);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [actif, phase, serieActuelle]);

  const jouerSon = () => {
    if (!voixActive) return;
    const son = SONS.find(s => s.id === sonChoisi);
    const lang = voix === 'feminin' ? 'fr-FR' : 'fr-FR';
    Speech.speak(son?.label || 'Signal', {
      language: lang,
      pitch: voix === 'feminin' ? 1.4 : 0.8,
      rate: 0.9,
    });
  };

  const parler = (texte) => {
    if (!voixActive) return;
    Speech.speak(texte, {
      language: 'fr-FR',
      pitch: voix === 'feminin' ? 1.4 : 0.8,
      rate: 1.0,
    });
  };

  const passerPhase = () => {
    setPhase(prev => {
      if (prev === 'travail') {
        if (repos > 0) {
          setTempsRestant(repos);
          if (voixActive) Speech.speak('Repos', { language: 'fr-FR', pitch: voix === 'feminin' ? 1.4 : 0.8 });
          setActif(true);
          intervalRef.current = setInterval(() => {
            setTempsRestant(p => {
              if (p <= 1) {
                clearInterval(intervalRef.current);
                jouerSon();
                passerPhase();
                return 0;
              }
              if (p <= 4 && voixActive) parler(`${p - 1}`);
              return p - 1;
            });
          }, 1000);
          return 'repos';
        } else {
          passerSerie();
          return 'travail';
        }
      } else {
        passerSerie();
        return 'travail';
      }
    });
  };

  const passerSerie = () => {
    setSerieActuelle(prev => {
      if (prev >= series) {
        setActif(false);
        setTermine(true);
        if (voixActive) Speech.speak('Bravo, entrainement termine !', { language: 'fr-FR', pitch: voix === 'feminin' ? 1.4 : 0.8 });
        return prev;
      }
      const next = prev + 1;
      setTempsRestant(travail);
      if (voixActive) Speech.speak(`Serie ${next}`, { language: 'fr-FR', pitch: voix === 'feminin' ? 1.4 : 0.8 });
      setActif(true);
      return next;
    });
  };

  const demarrer = async () => {
    setSerieActuelle(1);
    setPhase('travail');
    setTempsRestant(travail);
    setTermine(false);
    setActif(true);
    setEcran('actif');
    if (voixActive) Speech.speak('Pret, partez !', { language: 'fr-FR', pitch: voix === 'feminin' ? 1.4 : 0.8 });
    if (rotation) {
      await ScreenOrientation.unlockAsync();
    }
  };

  const pauseResume = () => {
    setActif(prev => !prev);
  };

  const reinitialiser = async () => {
    clearInterval(intervalRef.current);
    setActif(false);
    setTermine(false);
    setSerieActuelle(1);
    setPhase('travail');
    setTempsRestant(travail);
    setEcran('config');
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  const formaterTemps = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? `${m}:` : ''}${s.toString().padStart(2, '0')}`;
  };

  const progression = phase === 'travail'
    ? (travail - tempsRestant) / travail
    : (repos - tempsRestant) / repos;

  const appliquerPreset = (preset) => {
    setTravail(preset.travail);
    setRepos(preset.repos);
    setSeries(preset.series);
  };

  if (ecran === 'actif') {
    return (
      <View style={[styles.timerEcran, { backgroundColor: couleurObj.bg }]}>
        <StatusBar hidden />

        {/* Phase */}
        <Text style={[styles.phaseLabel, { color: couleurObj.accent }]}>
          {phase === 'travail' ? 'TRAVAIL' : 'REPOS'}
        </Text>

        {/* Serie */}
        <Text style={[styles.serieLabel, { color: couleurObj.accent + '88' }]}>
          Serie {serieActuelle} / {series}
        </Text>

        {/* Cercle */}
        <View style={[styles.cerclePrincipal, { borderColor: couleurObj.accent + '33' }]}>
          <View style={[styles.cercleInterieur, { borderColor: couleurObj.accent }]}>
            {termine ? (
              <Text style={[styles.termineText, { color: couleurObj.accent }]}>FINI !</Text>
            ) : (
              <Text style={[styles.timerTexte, { color: couleurObj.accent }]}>
                {formaterTemps(tempsRestant)}
              </Text>
            )}
          </View>
        </View>

        {/* Barre progression */}
        <View style={styles.progressionBarre}>
          <View style={[styles.progressionFill, { width: `${progression * 100}%`, backgroundColor: couleurObj.accent }]} />
        </View>

        {/* Boutons */}
        <View style={styles.boutonsRow}>
          <TouchableOpacity style={[styles.btnSecondaire, { borderColor: couleurObj.accent }]} onPress={reinitialiser}>
            <Text style={[styles.btnSecondaireText, { color: couleurObj.accent }]}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnPrincipal, { backgroundColor: couleurObj.accent }]}
            onPress={pauseResume}
            disabled={termine}
          >
            <Text style={styles.btnPrincipalText}>
              {termine ? 'Termine' : actif ? 'Pause' : 'Reprendre'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btnSecondaire, { borderColor: couleurObj.accent }]} onPress={reinitialiser}>
            <Text style={[styles.btnSecondaireText, { color: couleurObj.accent }]}>Config</Text>
          </TouchableOpacity>
        </View>

        {/* Prochaine phase */}
        {!termine && (
          <Text style={[styles.prochainePhase, { color: couleurObj.accent + '66' }]}>
            {phase === 'travail' ? `Repos : ${repos}s` : `Travail : ${travail}s`} apres
          </Text>
        )}
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: couleurObj.bg }]}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={[styles.backText, { color: couleurObj.accent }]}>Retour</Text>
      </TouchableOpacity>

      <Text style={[styles.brand, { color: couleurObj.accent }]}>NLT</Text>
      <Text style={styles.titre}>Timer</Text>

      {/* Onglets config */}
      <View style={styles.onglets}>
        {['timer', 'son', 'apparence'].map(o => (
          <TouchableOpacity
            key={o}
            style={[styles.onglet, ongletConfig === o && { borderBottomColor: couleurObj.accent, borderBottomWidth: 2 }]}
            onPress={() => setOngletConfig(o)}
          >
            <Text style={[styles.ongletText, ongletConfig === o && { color: couleurObj.accent }]}>
              {o === 'timer' ? 'Timer' : o === 'son' ? 'Son' : 'Apparence'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Onglet Timer */}
      {ongletConfig === 'timer' && (
        <View style={styles.section}>
          {/* Presets */}
          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>PRESETS</Text>
          <View style={styles.presetsRow}>
            {PRESETS.map(p => (
              <TouchableOpacity
                key={p.label}
                style={[styles.presetBtn, { borderColor: couleurObj.accent + '44' }]}
                onPress={() => appliquerPreset(p)}
              >
                <Text style={[styles.presetLabel, { color: couleurObj.accent }]}>{p.label}</Text>
                <Text style={styles.presetDetail}>{p.travail}s / {p.repos}s</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Travail */}
          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>TRAVAIL</Text>
          <View style={styles.valeurRow}>
            <TouchableOpacity style={[styles.valeurBtn, { borderColor: couleurObj.accent }]} onPress={() => setTravail(Math.max(5, travail - 5))}>
              <Text style={[styles.valeurBtnText, { color: couleurObj.accent }]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.valeurTexte}>{travail}s</Text>
            <TouchableOpacity style={[styles.valeurBtn, { borderColor: couleurObj.accent }]} onPress={() => setTravail(travail + 5)}>
              <Text style={[styles.valeurBtnText, { color: couleurObj.accent }]}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Repos */}
          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>REPOS</Text>
          <View style={styles.valeurRow}>
            <TouchableOpacity style={[styles.valeurBtn, { borderColor: couleurObj.accent }]} onPress={() => setRepos(Math.max(0, repos - 5))}>
              <Text style={[styles.valeurBtnText, { color: couleurObj.accent }]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.valeurTexte}>{repos}s</Text>
            <TouchableOpacity style={[styles.valeurBtn, { borderColor: couleurObj.accent }]} onPress={() => setRepos(repos + 5)}>
              <Text style={[styles.valeurBtnText, { color: couleurObj.accent }]}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Series */}
          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>SERIES</Text>
          <View style={styles.valeurRow}>
            <TouchableOpacity style={[styles.valeurBtn, { borderColor: couleurObj.accent }]} onPress={() => setSeries(Math.max(1, series - 1))}>
              <Text style={[styles.valeurBtnText, { color: couleurObj.accent }]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.valeurTexte}>{series}</Text>
            <TouchableOpacity style={[styles.valeurBtn, { borderColor: couleurObj.accent }]} onPress={() => setSeries(series + 1)}>
              <Text style={[styles.valeurBtnText, { color: couleurObj.accent }]}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Rotation */}
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Rotation ecran</Text>
              <Text style={styles.switchDesc}>Paysage quand le timer est lance</Text>
            </View>
            <Switch
              value={rotation}
              onValueChange={setRotation}
              trackColor={{ false: '#2a2a2a', true: couleurObj.accent }}
              thumbColor={rotation ? '#fff' : '#666'}
            />
          </View>
        </View>
      )}

      {/* Onglet Son */}
      {ongletConfig === 'son' && (
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Voix assistee</Text>
              <Text style={styles.switchDesc}>Annonce les phases et le compte</Text>
            </View>
            <Switch
              value={voixActive}
              onValueChange={setVoixActive}
              trackColor={{ false: '#2a2a2a', true: couleurObj.accent }}
              thumbColor={voixActive ? '#fff' : '#666'}
            />
          </View>

          {voixActive && (
            <>
              <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>VOIX</Text>
              <View style={styles.voixRow}>
                {VOIX.map(v => (
                  <TouchableOpacity
                    key={v.id}
                    style={[styles.voixBtn, voix === v.id && { backgroundColor: couleurObj.accent }]}
                    onPress={() => setVoix(v.id)}
                  >
                    <Text style={[styles.voixBtnText, voix === v.id && { color: '#fff' }]}>{v.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>SIGNAL SONORE</Text>
          {SONS.map(s => (
            <TouchableOpacity
              key={s.id}
              style={[styles.sonItem, sonChoisi === s.id && { borderLeftColor: couleurObj.accent, borderLeftWidth: 4 }]}
              onPress={() => {
                setSonChoisi(s.id);
                Speech.speak(s.label, { language: 'fr-FR', pitch: voix === 'feminin' ? 1.4 : 0.8 });
              }}
            >
              <Text style={styles.sonLabel}>{s.label}</Text>
              {sonChoisi === s.id && <Text style={[styles.sonActif, { color: couleurObj.accent }]}>Actif</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Onglet Apparence */}
      {ongletConfig === 'apparence' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>COULEUR DU TIMER</Text>
          {COULEURS.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[styles.couleurItem, couleur === c.id && { borderLeftColor: c.accent, borderLeftWidth: 4 }]}
              onPress={() => setCouleur(c.id)}
            >
              <View style={[styles.couleurPreview, { backgroundColor: c.bg, borderColor: c.accent }]}>
                <View style={[styles.couleurDot, { backgroundColor: c.accent }]} />
              </View>
              <Text style={styles.couleurLabel}>{c.label}</Text>
              {couleur === c.id && <Text style={[styles.sonActif, { color: c.accent }]}>Actif</Text>}
            </TouchableOpacity>
          ))}

          {/* Apercu */}
          <Text style={[styles.sectionTitle, { color: couleurObj.accent }]}>APERCU</Text>
          <View style={[styles.apercu, { backgroundColor: couleurObj.bg, borderColor: couleurObj.accent + '44' }]}>
            <Text style={[styles.apercuPhase, { color: couleurObj.accent }]}>TRAVAIL</Text>
            <Text style={[styles.apercuTemps, { color: couleurObj.accent }]}>20</Text>
            <View style={[styles.apercuBarre, { backgroundColor: couleurObj.accent + '33' }]}>
              <View style={[styles.apercuFill, { backgroundColor: couleurObj.accent, width: '60%' }]} />
            </View>
          </View>
        </View>
      )}

      {/* Bouton demarrer */}
      <TouchableOpacity
        style={[styles.demarrerBtn, { backgroundColor: couleurObj.accent }]}
        onPress={demarrer}
      >
        <Text style={styles.demarrerBtnText}>Demarrer</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { fontSize: 16 },
  brand: { fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  onglets: { flexDirection: 'row', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  onglet: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  ongletText: { color: '#555', fontSize: 14, fontWeight: '600' },
  section: {},
  sectionTitle: { fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14, marginTop: 8 },
  presetsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  presetBtn: { flex: 1, minWidth: '45%', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1 },
  presetLabel: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  presetDetail: { color: '#555', fontSize: 12 },
  valeurRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 24, backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20 },
  valeurBtn: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  valeurBtnText: { fontSize: 24, fontWeight: 'bold' },
  valeurTexte: { color: '#fff', fontSize: 32, fontWeight: 'bold', minWidth: 80, textAlign: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 14, padding: 16, marginBottom: 16 },
  switchLabel: { color: '#fff', fontSize: 15, marginBottom: 4 },
  switchDesc: { color: '#555', fontSize: 12 },
  voixRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  voixBtn: { flex: 1, backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, alignItems: 'center' },
  voixBtnText: { color: '#aaa', fontSize: 14, fontWeight: '600' },
  sonItem: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#2a2a2a' },
  sonLabel: { color: '#fff', fontSize: 14 },
  sonActif: { fontSize: 12, fontWeight: 'bold' },
  couleurItem: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 16, borderLeftWidth: 1, borderLeftColor: '#2a2a2a' },
  couleurPreview: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  couleurDot: { width: 20, height: 20, borderRadius: 10 },
  couleurLabel: { color: '#fff', fontSize: 14, flex: 1 },
  apercu: { borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, marginBottom: 24 },
  apercuPhase: { fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 8 },
  apercuTemps: { fontSize: 64, fontWeight: 'bold', marginBottom: 16 },
  apercuBarre: { width: '100%', height: 6, borderRadius: 3, overflow: 'hidden' },
  apercuFill: { height: '100%', borderRadius: 3 },
  demarrerBtn: { borderRadius: 16, padding: 20, alignItems: 'center', marginTop: 24, marginBottom: 16 },
  demarrerBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  timerEcran: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  phaseLabel: { fontSize: 16, fontWeight: 'bold', letterSpacing: 6, marginBottom: 8 },
  serieLabel: { fontSize: 14, marginBottom: 40 },
  cerclePrincipal: { width: 280, height: 280, borderRadius: 140, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  cercleInterieur: { width: 240, height: 240, borderRadius: 120, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  timerTexte: { fontSize: 72, fontWeight: 'bold' },
  termineText: { fontSize: 36, fontWeight: 'bold' },
  progressionBarre: { width: '100%', height: 6, backgroundColor: '#2a2a2a', borderRadius: 3, overflow: 'hidden', marginBottom: 40 },
  progressionFill: { height: '100%', borderRadius: 3 },
  boutonsRow: { flexDirection: 'row', gap: 16, alignItems: 'center', marginBottom: 24 },
  btnPrincipal: { flex: 1, borderRadius: 16, padding: 18, alignItems: 'center' },
  btnPrincipalText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  btnSecondaire: { width: 80, height: 56, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  btnSecondaireText: { fontSize: 13, fontWeight: 'bold' },
  prochainePhase: { fontSize: 13 },
});