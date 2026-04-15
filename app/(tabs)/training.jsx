import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext';

const programmes = [
  { id: '1', titre: 'Full Body', niveau: 'Debutant', duree: '45 min', objectif: 'Forme generale' },
  { id: '2', titre: 'Push Pull Legs', niveau: 'Intermediaire', duree: '60 min', objectif: 'Masse musculaire' },
  { id: '3', titre: 'HIIT Cardio', niveau: 'Avance', duree: '30 min', objectif: 'Perte de poids' },
  { id: '4', titre: 'Force et Puissance', niveau: 'Avance', duree: '75 min', objectif: 'Force maximale' },
];

export default function Training() {
  const router = useRouter();
  const { theme } = useTheme();
  const s = createStyles(theme);

  return (
    <ScrollView style={s.container}>
      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>Programmes</Text>
      <Text style={s.sous}>Choisis ton programme</Text>

      {programmes.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={s.card}
          onPress={() => router.push(`/programme/${p.id}`)}
        >
          <View style={s.cardHeader}>
            <Text style={s.cardTitre}>{p.titre}</Text>
            <Text style={s.niveau}>{p.niveau}</Text>
          </View>
          <View style={s.cardBody}>
            <Text style={s.info}>{p.duree}</Text>
            <Text style={s.info}>{p.objectif}</Text>
          </View>
          <Text style={s.cta}>Voir le programme →</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, padding: 24 },
  brand: { color: theme.accent, fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  sous: { color: theme.texteSous, fontSize: 15, marginTop: 8, marginBottom: 32 },
  card: {
    backgroundColor: theme.card, borderRadius: 16,
    padding: 20, marginBottom: 16,
    borderLeftWidth: 4, borderLeftColor: theme.accent,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitre: { color: theme.texte, fontSize: 18, fontWeight: 'bold' },
  niveau: { color: theme.accent, fontSize: 12, fontWeight: 'bold', backgroundColor: theme.card2, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  cardBody: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  info: { color: theme.texteSous, fontSize: 13 },
  cta: { color: theme.accent, fontSize: 13, fontWeight: 'bold' },
});