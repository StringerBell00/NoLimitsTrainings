import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.title}>No Limits Training</Text>
      <Text style={styles.subtitle}>Repousse tes limites chaque jour </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Programme du jour</Text>
        <Text style={styles.cardText}>Full Body — Niveau intermédiaire</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Repas du jour</Text>
        <Text style={styles.cardText}>Objectif : Prise de masse</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}> Ton coach</Text>
        <Text style={styles.cardText}>Réserve une séance dès maintenant</Text>
      </View>
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
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  cardText: { color: '#aaa', fontSize: 14 },
});