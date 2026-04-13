import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const programmes = [
  { id: '1', titre: 'Full Body', niveau: 'Débutant', duree: '45 min', objectif: 'Forme générale' },
  { id: '2', titre: 'Push Pull Legs', niveau: 'Intermédiaire', duree: '60 min', objectif: 'Masse musculaire' },
  { id: '3', titre: 'HIIT Cardio', niveau: 'Avancé', duree: '30 min', objectif: 'Perte de poids' },
  { id: '4', titre: 'Force & Puissance', niveau: 'Avancé', duree: '75 min', objectif: 'Force maximale' },
];

export default function Training() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.title}>Programmes</Text>
      <Text style={styles.subtitle}>Choisis ton programme </Text>

      {programmes.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={styles.card}
          onPress={() => router.push(`/programme/${p.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitre}>{p.titre}</Text>
            <Text style={styles.niveau}>{p.niveau}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.info}> {p.duree}</Text>
            <Text style={styles.info}> {p.objectif}</Text>
          </View>
          <Text style={styles.cta}>Voir le programme →</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  subtitle: { color: '#aaa', fontSize: 15, marginTop: 8, marginBottom: 32 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E63946',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitre: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  niveau: { color: '#E63946', fontSize: 12, fontWeight: 'bold', backgroundColor: '#2a0a0c', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  cardBody: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  info: { color: '#aaa', fontSize: 13 },
  cta: { color: '#E63946', fontSize: 13, fontWeight: 'bold' },
});