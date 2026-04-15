import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from './ThemeContext';

const DONNEES = {
  exercices: [
    { id: 1, nom: 'Developpé couché', muscle: 'Pectoraux', niveau: 'Intermediaire', type: 'exercice' },
    { id: 2, nom: 'Pompes', muscle: 'Pectoraux', niveau: 'Debutant', type: 'exercice' },
    { id: 3, nom: 'Traction', muscle: 'Dos', niveau: 'Intermediaire', type: 'exercice' },
    { id: 4, nom: 'Squat', muscle: 'Jambes', niveau: 'Debutant', type: 'exercice' },
    { id: 5, nom: 'Curl biceps', muscle: 'Biceps', niveau: 'Debutant', type: 'exercice' },
    { id: 6, nom: 'Triceps poulie', muscle: 'Triceps', niveau: 'Debutant', type: 'exercice' },
    { id: 7, nom: 'Developpé militaire', muscle: 'Epaules', niveau: 'Intermediaire', type: 'exercice' },
    { id: 8, nom: 'Soulevé de terre', muscle: 'Dos', niveau: 'Avance', type: 'exercice' },
    { id: 9, nom: 'Fente', muscle: 'Jambes', niveau: 'Debutant', type: 'exercice' },
    { id: 10, nom: 'Planche', muscle: 'Abdos', niveau: 'Debutant', type: 'exercice' },
    { id: 11, nom: 'Crunch', muscle: 'Abdos', niveau: 'Debutant', type: 'exercice' },
    { id: 12, nom: 'Burpees', muscle: 'Full Body', niveau: 'Avance', type: 'exercice' },
    { id: 13, nom: 'Elevation laterale', muscle: 'Epaules', niveau: 'Debutant', type: 'exercice' },
    { id: 14, nom: 'Leg press', muscle: 'Jambes', niveau: 'Debutant', type: 'exercice' },
    { id: 15, nom: 'Dips', muscle: 'Triceps', niveau: 'Intermediaire', type: 'exercice' },
  ],
  programmes: [
    { id: '1', nom: 'Full Body', niveau: 'Debutant', duree: '45 min', type: 'programme' },
    { id: '2', nom: 'Push Pull Legs', niveau: 'Intermediaire', duree: '60 min', type: 'programme' },
    { id: '3', nom: 'HIIT Cardio', niveau: 'Avance', duree: '30 min', type: 'programme' },
    { id: '4', nom: 'Force et Puissance', niveau: 'Avance', duree: '75 min', type: 'programme' },
  ],
  coaches: [
    { id: '1', nom: 'Mohamed-Lamine S.', specialite: 'Musculation & Force', note: 5.0, type: 'coach' },
  ],
  nutrition: [
    { id: '1', nom: 'Plan Prise de masse', calories: '3000 kcal', type: 'nutrition' },
    { id: '2', nom: 'Plan Perte de poids', calories: '1800 kcal', type: 'nutrition' },
    { id: '3', nom: 'Plan Maintien', calories: '2200 kcal', type: 'nutrition' },
    { id: '4', nom: 'Plan Endurance', calories: '2600 kcal', type: 'nutrition' },
  ],
};

const CATEGORIES = [
  { id: 'tout', label: 'Tout' },
  { id: 'exercice', label: 'Exercices' },
  { id: 'programme', label: 'Programmes' },
  { id: 'coach', label: 'Coaches' },
  { id: 'nutrition', label: 'Nutrition' },
];

const RECHERCHES_RECENTES = [
  'Squat', 'Full Body', 'HIIT', 'Pectoraux', 'Mohamed-Lamine'
];

const TYPE_CONFIG = {
  exercice: { couleur: '#4fc3f7', label: 'Exercice' },
  programme: { couleur: '#E63946', label: 'Programme' },
  coach: { couleur: '#ff9800', label: 'Coach' },
  nutrition: { couleur: '#4caf50', label: 'Nutrition' },
};

export default function Recherche() {
  const { theme } = useTheme();
  const s = createStyles(theme);
  const [query, setQuery] = useState('');
  const [categorie, setCategorie] = useState('tout');

  const tousLesElements = [
    ...DONNEES.exercices,
    ...DONNEES.programmes,
    ...DONNEES.coaches,
    ...DONNEES.nutrition,
  ];

  const resultats = tousLesElements.filter(el => {
    const matchQuery = query.length === 0 || el.nom.toLowerCase().includes(query.toLowerCase());
    const matchCategorie = categorie === 'tout' || el.type === categorie;
    return matchQuery && matchCategorie;
  });

  const naviguer = (el) => {
    if (el.type === 'exercice') router.push('/(tabs)/catalogue');
    if (el.type === 'programme') router.push(`/programme/${el.id}`);
    if (el.type === 'coach') router.push('/(tabs)/coaches');
    if (el.type === 'nutrition') router.push('/(tabs)/nutrition');
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.retour}>Retour</Text>
        </TouchableOpacity>
        <Text style={s.titre}>Recherche</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={s.searchContainer}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Exercice, programme, coach..."
          placeholderTextColor={theme.texteFaible}
          value={query}
          onChangeText={setQuery}
          autoFocus
          color={theme.texte}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={s.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {query.length === 0 && (
        <View style={s.recentesSection}>
          <Text style={s.recentesLabel}>RECHERCHES RECENTES</Text>
          <View style={s.recentesRow}>
            {RECHERCHES_RECENTES.map((r, i) => (
              <TouchableOpacity
                key={i}
                style={s.recenteBadge}
                onPress={() => setQuery(r)}
              >
                <Text style={s.recenteText}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.categoriesScroll}
      >
        <View style={s.categoriesRow}>
          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[s.categorieBtn, categorie === c.id && s.categorieBtnActif]}
              onPress={() => setCategorie(c.id)}
            >
              <Text style={[s.categorieBtnText, categorie === c.id && s.categorieBtnTextActif]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {query.length > 0 && (
        <Text style={s.compteur}>
          {resultats.length} resultat{resultats.length > 1 ? 's' : ''} pour "{query}"
        </Text>
      )}

      <ScrollView style={s.resultats} showsVerticalScrollIndicator={false}>
        {query.length === 0 && categorie === 'tout' ? (
          <View>
            {Object.entries(DONNEES).map(([key, items]) => (
              <View key={key} style={s.categorieSection}>
                <Text style={s.categorieSectionLabel}>
                  {key === 'exercices' ? 'EXERCICES' :
                   key === 'programmes' ? 'PROGRAMMES' :
                   key === 'coaches' ? 'COACHES' : 'NUTRITION'}
                </Text>
                {items.slice(0, 3).map((el, i) => (
                  <TouchableOpacity
                    key={i}
                    style={s.resultCard}
                    onPress={() => naviguer(el)}
                  >
                    <View style={[s.typeDot, { backgroundColor: TYPE_CONFIG[el.type].couleur }]} />
                    <View style={s.resultInfo}>
                      <Text style={s.resultNom}>{el.nom}</Text>
                      <Text style={s.resultSous}>
                        {el.muscle || el.niveau || el.specialite || el.calories || ''}
                      </Text>
                    </View>
                    <View style={[s.typeBadge, { backgroundColor: TYPE_CONFIG[el.type].couleur + '22' }]}>
                      <Text style={[s.typeBadgeText, { color: TYPE_CONFIG[el.type].couleur }]}>
                        {TYPE_CONFIG[el.type].label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        ) : (
          <View>
            {resultats.length === 0 ? (
              <View style={s.vide}>
                <Text style={s.videTexte}>Aucun resultat pour "{query}"</Text>
                <Text style={s.videConseils}>Essaie avec un autre mot cle</Text>
              </View>
            ) : (
              resultats.map((el, i) => (
                <TouchableOpacity
                  key={i}
                  style={s.resultCard}
                  onPress={() => naviguer(el)}
                >
                  <View style={[s.typeDot, { backgroundColor: TYPE_CONFIG[el.type].couleur }]} />
                  <View style={s.resultInfo}>
                    <Text style={s.resultNom}>{el.nom}</Text>
                    <Text style={s.resultSous}>
                      {el.muscle || el.niveau || el.specialite || el.calories || ''}
                    </Text>
                  </View>
                  <View style={[s.typeBadge, { backgroundColor: TYPE_CONFIG[el.type].couleur + '22' }]}>
                    <Text style={[s.typeBadgeText, { color: TYPE_CONFIG[el.type].couleur }]}>
                      {TYPE_CONFIG[el.type].label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16,
  },
  retour: { color: theme.accent, fontSize: 16 },
  titre: { color: theme.texte, fontSize: 18, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.card, borderRadius: 14,
    marginHorizontal: 24, paddingHorizontal: 16, paddingVertical: 12,
    marginBottom: 16, borderWidth: 1, borderColor: theme.bordure, gap: 10,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 16 },
  clearBtn: { color: theme.texteFaible, fontSize: 16 },
  recentesSection: { paddingHorizontal: 24, marginBottom: 16 },
  recentesLabel: { color: theme.texteFaible, fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  recentesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  recenteBadge: { backgroundColor: theme.card, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: theme.bordure },
  recenteText: { color: theme.texteSous, fontSize: 13 },
  categoriesScroll: { marginBottom: 12 },
  categoriesRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 8 },
  categorieBtn: { backgroundColor: theme.card, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: theme.bordure },
  categorieBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  categorieBtnText: { color: theme.texteSous, fontSize: 13, fontWeight: '600' },
  categorieBtnTextActif: { color: '#fff' },
  compteur: { color: theme.texteFaible, fontSize: 13, paddingHorizontal: 24, marginBottom: 12 },
  resultats: { flex: 1, paddingHorizontal: 24 },
  categorieSection: { marginBottom: 24 },
  categorieSectionLabel: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 12 },
  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.card, borderRadius: 14,
    padding: 14, marginBottom: 8, gap: 12,
  },
  typeDot: { width: 10, height: 10, borderRadius: 5 },
  resultInfo: { flex: 1 },
  resultNom: { color: theme.texte, fontSize: 15, fontWeight: '600', marginBottom: 2 },
  resultSous: { color: theme.texteFaible, fontSize: 12 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  typeBadgeText: { fontSize: 11, fontWeight: 'bold' },
  vide: { alignItems: 'center', paddingTop: 60 },
  videTexte: { color: theme.texteSous, fontSize: 16, marginBottom: 8 },
  videConseils: { color: theme.texteFaible, fontSize: 13 },
});