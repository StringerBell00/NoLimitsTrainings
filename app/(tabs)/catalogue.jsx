import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../ThemeContext';

const MUSCLES = [
  { id: 'all', label: 'Tous' },
  { id: 'pectoraux', label: 'Pectoraux' },
  { id: 'dos', label: 'Dos' },
  { id: 'epaules', label: 'Epaules' },
  { id: 'biceps', label: 'Biceps' },
  { id: 'triceps', label: 'Triceps' },
  { id: 'jambes', label: 'Jambes' },
  { id: 'abdos', label: 'Abdos' },
  { id: 'cardio', label: 'Cardio' },
];

const EXERCICES = [
  { id: 1, nom: 'Developpé couché', muscle: 'pectoraux', niveau: 'Intermediaire', materiel: 'Barre', description: 'Allonge sur un banc, descends la barre jusqu a la poitrine puis pousse vers le haut.' },
  { id: 2, nom: 'Pompes', muscle: 'pectoraux', niveau: 'Debutant', materiel: 'Aucun', description: 'En appui sur les mains et les pieds, descends le buste vers le sol puis remonte.' },
  { id: 3, nom: 'Ecartes halteres', muscle: 'pectoraux', niveau: 'Intermediaire', materiel: 'Halteres', description: 'Allonge, ouvre les bras en arc de cercle jusqu a ressentir un etirement dans les pectoraux.' },
  { id: 4, nom: 'Developpé incline', muscle: 'pectoraux', niveau: 'Avance', materiel: 'Barre', description: 'Comme le developpé couché mais sur un banc incline pour cibler le haut des pectoraux.' },
  { id: 5, nom: 'Traction', muscle: 'dos', niveau: 'Intermediaire', materiel: 'Barre fixe', description: 'Suspendu a une barre, tire ton corps vers le haut jusqu a ce que le menton depasse la barre.' },
  { id: 6, nom: 'Rowing haltere', muscle: 'dos', niveau: 'Debutant', materiel: 'Haltere', description: 'Penche en avant, tire l haltere vers la hanche en gardant le dos droit.' },
  { id: 7, nom: 'Soulevé de terre', muscle: 'dos', niveau: 'Avance', materiel: 'Barre', description: 'Genoux flechi, dos droit, souleve la barre jusqu a la position debout complete.' },
  { id: 8, nom: 'Tirage poulie haute', muscle: 'dos', niveau: 'Debutant', materiel: 'Poulie', description: 'Assis, tire la barre vers la poitrine en contractant les dorsaux.' },
  { id: 9, nom: 'Developpé militaire', muscle: 'epaules', niveau: 'Intermediaire', materiel: 'Barre', description: 'Debout, pousse la barre au dessus de la tete en gardant le dos droit.' },
  { id: 10, nom: 'Elevation laterale', muscle: 'epaules', niveau: 'Debutant', materiel: 'Halteres', description: 'Leve les bras sur les cotes jusqu a hauteur des epaules, coudes legerement flechis.' },
  { id: 11, nom: 'Face pull', muscle: 'epaules', niveau: 'Debutant', materiel: 'Poulie', description: 'Tire la corde vers le visage en ecartant les mains pour cibler les deltoïdes posterieurs.' },
  { id: 12, nom: 'Curl biceps', muscle: 'biceps', niveau: 'Debutant', materiel: 'Halteres', description: 'Debout, flechi les avant bras vers les epaules en contractant les biceps.' },
  { id: 13, nom: 'Curl marteau', muscle: 'biceps', niveau: 'Debutant', materiel: 'Halteres', description: 'Comme le curl biceps mais les paumes face a face pour cibler le brachial.' },
  { id: 14, nom: 'Curl barre EZ', muscle: 'biceps', niveau: 'Intermediaire', materiel: 'Barre EZ', description: 'Curl classique avec une barre EZ pour reduire la tension sur les poignets.' },
  { id: 15, nom: 'Triceps poulie', muscle: 'triceps', niveau: 'Debutant', materiel: 'Poulie', description: 'Coudes fixes contre le corps, etends les avant bras vers le bas en contractant les triceps.' },
  { id: 16, nom: 'Dips', muscle: 'triceps', niveau: 'Intermediaire', materiel: 'Barres', description: 'En appui sur deux barres paralleles, descends le corps puis remonte en poussant.' },
  { id: 17, nom: 'Extension triceps', muscle: 'triceps', niveau: 'Debutant', materiel: 'Haltere', description: 'Assis, tiens un haltere a deux mains derriere la tete et etends les bras vers le haut.' },
  { id: 18, nom: 'Squat', muscle: 'jambes', niveau: 'Debutant', materiel: 'Barre', description: 'Pieds largeur epaules, descends comme pour t asseoir puis remonte en poussant dans les talons.' },
  { id: 19, nom: 'Fente', muscle: 'jambes', niveau: 'Debutant', materiel: 'Halteres', description: 'Un pied en avant, descends le genou arriere vers le sol puis remonte.' },
  { id: 20, nom: 'Leg press', muscle: 'jambes', niveau: 'Debutant', materiel: 'Machine', description: 'Assis sur la machine, pousse la plateforme avec les pieds en etendant les jambes.' },
  { id: 21, nom: 'Curl femoral', muscle: 'jambes', niveau: 'Debutant', materiel: 'Machine', description: 'Allonge sur la machine, ramene les talons vers les fesses en contractant les ischio jambiers.' },
  { id: 22, nom: 'Mollets debout', muscle: 'jambes', niveau: 'Debutant', materiel: 'Machine', description: 'Monte sur la pointe des pieds en contractant les mollets, descends lentement.' },
  { id: 23, nom: 'Crunch', muscle: 'abdos', niveau: 'Debutant', materiel: 'Aucun', description: 'Allonge, mains derriere la tete, souleve le buste vers les genoux en contractant les abdos.' },
  { id: 24, nom: 'Planche', muscle: 'abdos', niveau: 'Debutant', materiel: 'Aucun', description: 'En appui sur les avant bras et les pieds, maintiens le corps droit comme une planche.' },
  { id: 25, nom: 'Relevé de jambes', muscle: 'abdos', niveau: 'Intermediaire', materiel: 'Barre fixe', description: 'Suspendu a une barre, leve les jambes tendues jusqu a la horizontale.' },
  { id: 26, nom: 'Russian twist', muscle: 'abdos', niveau: 'Intermediaire', materiel: 'Haltere', description: 'Assis, pieds leves, tourne le buste de droite a gauche avec un haltere.' },
  { id: 27, nom: 'Course a pied', muscle: 'cardio', niveau: 'Debutant', materiel: 'Aucun', description: 'Course continue a intensite moderee pour developper l endurance cardiovasculaire.' },
  { id: 28, nom: 'Burpees', muscle: 'cardio', niveau: 'Avance', materiel: 'Aucun', description: 'Enchainement saut, pompe et retour debout pour un exercice cardio intense.' },
  { id: 29, nom: 'Corde a sauter', muscle: 'cardio', niveau: 'Debutant', materiel: 'Corde', description: 'Sauts avec corde a sauter pour ameliorer la coordination et l endurance.' },
  { id: 30, nom: 'Velo elliptique', muscle: 'cardio', niveau: 'Debutant', materiel: 'Machine', description: 'Exercice cardio a faible impact articulaire, ideal pour les debutants.' },
];

const NIVEAUX_COLORS = {
  'Debutant': '#4caf50',
  'Intermediaire': '#ff9800',
  'Avance': '#E63946',
};

export default function Catalogue() {
  const { theme } = useTheme();
  const s = createStyles(theme);
  const [muscleSelectionne, setMuscleSelectionne] = useState('all');
  const [recherche, setRecherche] = useState('');
  const [exerciceOuvert, setExerciceOuvert] = useState(null);

  const exercicesFiltres = EXERCICES.filter(ex => {
    const matchMuscle = muscleSelectionne === 'all' || ex.muscle === muscleSelectionne;
    const matchRecherche = ex.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchMuscle && matchRecherche;
  });

  return (
    <View style={s.container}>
      <ScrollView>
        <Text style={s.brand}>NLT</Text>
        <Text style={s.titre}>Catalogue</Text>
        <Text style={s.sous}>Bibliotheque d exercices</Text>

        <View style={s.searchContainer}>
          <TextInput
            style={s.search}
            placeholder="Rechercher un exercice..."
            placeholderTextColor={theme.texteFaible}
            value={recherche}
            onChangeText={setRecherche}
            color={theme.texte}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtresScroll}>
          <View style={s.filtres}>
            {MUSCLES.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[s.filtreBtn, muscleSelectionne === m.id && s.filtreBtnActif]}
                onPress={() => setMuscleSelectionne(m.id)}
              >
                <Text style={[s.filtreBtnText, muscleSelectionne === m.id && s.filtreBtnTextActif]}>
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={s.compteur}>{exercicesFiltres.length} exercices</Text>

        {exercicesFiltres.map(ex => (
          <TouchableOpacity
            key={ex.id}
            style={s.card}
            onPress={() => setExerciceOuvert(exerciceOuvert === ex.id ? null : ex.id)}
          >
            <View style={s.cardHeader}>
              <View style={s.cardLeft}>
                <Text style={s.exNom}>{ex.nom}</Text>
                <Text style={s.exMuscle}>
                  {MUSCLES.find(m => m.id === ex.muscle)?.label}
                </Text>
              </View>
              <View style={s.cardRight}>
                <View style={[s.niveauBadge, { backgroundColor: NIVEAUX_COLORS[ex.niveau] + '22' }]}>
                  <Text style={[s.niveauText, { color: NIVEAUX_COLORS[ex.niveau] }]}>
                    {ex.niveau}
                  </Text>
                </View>
                <Text style={s.materiel}>{ex.materiel}</Text>
              </View>
            </View>

            {exerciceOuvert === ex.id && (
              <View style={s.description}>
                <View style={s.separateur} />
                <Text style={s.descriptionText}>{ex.description}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  brand: { color: theme.accent, fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4, paddingHorizontal: 24 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 8, paddingHorizontal: 24 },
  sous: { color: theme.texteSous, fontSize: 15, marginTop: 4, marginBottom: 24, paddingHorizontal: 24 },
  searchContainer: { paddingHorizontal: 24, marginBottom: 16 },
  search: {
    backgroundColor: theme.card, borderRadius: 12,
    padding: 14, fontSize: 15,
    borderWidth: 1, borderColor: theme.bordure,
  },
  filtresScroll: { marginBottom: 8 },
  filtres: { flexDirection: 'row', paddingHorizontal: 24, gap: 8, paddingBottom: 16 },
  filtreBtn: { backgroundColor: theme.card, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: theme.bordure },
  filtreBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  filtreBtnText: { color: theme.texteSous, fontSize: 13, fontWeight: '600' },
  filtreBtnTextActif: { color: '#fff' },
  compteur: { color: theme.texteFaible, fontSize: 13, paddingHorizontal: 24, marginBottom: 16 },
  card: {
    backgroundColor: theme.card, borderRadius: 14,
    padding: 16, marginHorizontal: 24, marginBottom: 10,
    borderLeftWidth: 3, borderLeftColor: theme.accent,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft: { flex: 1 },
  cardRight: { alignItems: 'flex-end', gap: 6 },
  exNom: { color: theme.texte, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  exMuscle: { color: theme.texteFaible, fontSize: 12 },
  niveauBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  niveauText: { fontSize: 11, fontWeight: 'bold' },
  materiel: { color: theme.texteFaible, fontSize: 11 },
  separateur: { height: 1, backgroundColor: theme.bordure, marginVertical: 12 },
  descriptionText: { color: theme.texteSous, fontSize: 14, lineHeight: 22 },
});