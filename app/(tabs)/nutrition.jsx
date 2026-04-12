import { View, Text, StyleSheet, ScrollView } from 'react-native';

const repas = [
  { moment: 'Petit-déjeuner', plat: 'Flocons d\'avoine + œufs', calories: '520 kcal', macros: 'P: 32g • G: 58g • L: 14g' },
  { moment: 'Déjeuner', plat: 'Riz + poulet + légumes', calories: '680 kcal', macros: 'P: 52g • G: 72g • L: 12g' },
  { moment: 'Collation', plat: 'Yaourt grec + fruits', calories: '280 kcal', macros: 'P: 18g • G: 34g • L: 6g' },
  { moment: 'Dîner', plat: 'Saumon + patate douce', calories: '620 kcal', macros: 'P: 44g • G: 56g • L: 18g' },
];

export default function Nutrition() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.title}>Nutrition</Text>
      <Text style={styles.subtitle}>Plan alimentaire du jour </Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total journalier</Text>
        <Text style={styles.totalKcal}>2 100 kcal</Text>
        <Text style={styles.totalMacros}>Protéines: 146g • Glucides: 220g • Lipides: 50g</Text>
      </View>

      {repas.map((r, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.moment}>{r.moment}</Text>
            <Text style={styles.calories}>{r.calories}</Text>
          </View>
          <Text style={styles.plat}>{r.plat}</Text>
          <Text style={styles.macros}>{r.macros}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  subtitle: { color: '#aaa', fontSize: 15, marginTop: 8, marginBottom: 24 },
  totalCard: {
    backgroundColor: '#E63946',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  totalLabel: { color: '#fff', fontSize: 13, opacity: 0.8 },
  totalKcal: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 4 },
  totalMacros: { color: '#fff', fontSize: 12, opacity: 0.9 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E63946',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  moment: { color: '#E63946', fontSize: 13, fontWeight: 'bold' },
  calories: { color: '#aaa', fontSize: 13 },
  plat: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  macros: { color: '#666', fontSize: 12 },
});