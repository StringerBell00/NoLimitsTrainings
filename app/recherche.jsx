import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput
} from 'react-native';
import { router } from 'expo-router';

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
  const [query, setQuery] = useState('');
  const [categorie, setCategorie] = useState('tout');
  const [focus, setFocus] = useState(false);

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
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.retour}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>Recherche</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Exercice, programme, coach..."
          placeholderTextColor="#444"
          value={query}
          onChangeText={setQuery}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoFocus
          color="#fff"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Recherches recentes */}
      {query.length === 0 && (
        <View style={styles.recentesSection}>
          <Text style={styles.recentesLabel}>RECHERCHES RECENTES</Text>
          <View style={styles.recentesRow}>
            {RECHERCHES_RECENTES.map((r, i) => (
              <TouchableOpacity
                key={i}
                style={styles.recenteBadge}
                onPress={() => setQuery(r)}
              >
                <Text style={styles.recenteText}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Filtres categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        <View style={styles.categoriesRow}>
          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[styles.categorieBtn, categorie === c.id && styles.categorieBtnActif]}
              onPress={() => setCategorie(c.id)}
            >
              <Text style={[styles.categorieBtnText, categorie === c.id && styles.categorieBtnTextActif]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Compteur resultats */}
      {query.length > 0 && (
        <Text style={styles.compteur}>
          {resultats.length} resultat{resultats.length > 1 ? 's' : ''} pour "{query}"
        </Text>
      )}

      {/* Resultats */}
      <ScrollView style={styles.resultats} showsVerticalScrollIndicator={false}>
        {query.length === 0 && categorie === 'tout' ? (
          <View>
            {/* Suggestions par categorie */}
            {Object.entries(DONNEES).map(([key, items]) => (
              <View key={key} style={styles.categorieSection}>
                <Text style={styles.categorieSectionLabel}>
                  {key === 'exercices' ? 'EXERCICES' :
                   key === 'programmes' ? 'PROGRAMMES' :
                   key === 'coaches' ? 'COACHES' : 'NUTRITION'}
                </Text>
                {items.slice(0, 3).map((el, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.resultCard}
                    onPress={() => naviguer(el)}
                  >
                    <View style={[styles.typeDot, { backgroundColor: TYPE_CONFIG[el.type].couleur }]} />
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultNom}>{el.nom}</Text>
                      <Text style={styles.resultSous}>
                        {el.muscle || el.niveau || el.specialite || el.calories || ''}
                      </Text>
                    </View>
                    <View style={[styles.typeBadge, { backgroundColor: TYPE_CONFIG[el.type].couleur + '22' }]}>
                      <Text style={[styles.typeBadgeText, { color: TYPE_CONFIG[el.type].couleur }]}>
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
              <View style={styles.vide}>
                <Text style={styles.videTexte}>Aucun resultat pour "{query}"</Text>
                <Text style={styles.videConseils}>Essaie avec un autre mot cle</Text>
              </View>
            ) : (
              resultats.map((el, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.resultCard}
                  onPress={() => naviguer(el)}
                >
                  <View style={[styles.typeDot, { backgroundColor: TYPE_CONFIG[el.type].couleur }]} />
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultNom}>{el.nom}</Text>
                    <Text style={styles.resultSous}>
                      {el.muscle || el.niveau || el.specialite || el.calories || ''}
                    </Text>
                  </View>
                  <View style={[styles.typeBadge, { backgroundColor: TYPE_CONFIG[el.type].couleur + '22' }]}>
                    <Text style={[styles.typeBadgeText, { color: TYPE_CONFIG[el.type].couleur }]}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  retour: { color: '#E63946', fontSize: 16 },
  titre: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    gap: 10,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 16, color: '#fff' },
  clearBtn: { color: '#555', fontSize: 16 },
  recentesSection: { paddingHorizontal: 24, marginBottom: 16 },
  recentesLabel: { color: '#555', fontSize: 11, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 },
  recentesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  recenteBadge: { backgroundColor: '#1a1a1a', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: '#2a2a2a' },
  recenteText: { color: '#aaa', fontSize: 13 },
  categoriesScroll: { marginBottom: 12 },
  categoriesRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 8 },
  categorieBtn: { backgroundColor: '#1a1a1a', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: '#2a2a2a' },
  categorieBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  categorieBtnText: { color: '#aaa', fontSize: 13, fontWeight: '600' },
  categorieBtnTextActif: { color: '#fff' },
  compteur: { color: '#555', fontSize: 13, paddingHorizontal: 24, marginBottom: 12 },
  resultats: { flex: 1, paddingHorizontal: 24 },
  categorieSection: { marginBottom: 24 },
  categorieSectionLabel: { color: '#E63946', fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 12 },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  typeDot: { width: 10, height: 10, borderRadius: 5 },
  resultInfo: { flex: 1 },
  resultNom: { color: '#fff', fontSize: 15, fontWeight: '600', marginBottom: 2 },
  resultSous: { color: '#555', fontSize: 12 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  typeBadgeText: { fontSize: 11, fontWeight: 'bold' },
  vide: { alignItems: 'center', paddingTop: 60 },
  videTexte: { color: '#aaa', fontSize: 16, marginBottom: 8 },
  videConseils: { color: '#555', fontSize: 13 },
});