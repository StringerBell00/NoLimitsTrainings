import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const coaches = [
  { nom: 'Karim B.', specialite: 'Musculation & Force', experience: '8 ans', tarif: '60€/séance', dispo: true },
  { nom: 'Sofia M.', specialite: 'Cardio & Perte de poids', experience: '5 ans', tarif: '50€/séance', dispo: true },
  { nom: 'Lucas D.', specialite: 'Nutrition & Performance', experience: '10 ans', tarif: '75€/séance', dispo: false },
];

export default function Coaches() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.title}>Nos Coachs</Text>
      <Text style={styles.subtitle}>Des experts à ton service </Text>

      {coaches.map((c, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{c.nom[0]}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.nom}>{c.nom}</Text>
              <View style={[styles.badge, { backgroundColor: c.dispo ? '#1a3a1a' : '#2a1a1a' }]}>
                <Text style={[styles.badgeText, { color: c.dispo ? '#4caf50' : '#E63946' }]}>
                  {c.dispo ? 'Disponible' : 'Complet'}
                </Text>
              </View>
            </View>
            <Text style={styles.specialite}>{c.specialite}</Text>
            <Text style={styles.meta}> {c.experience} d'expérience • {c.tarif}</Text>
            {c.dispo && (
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Réserver une séance</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
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
    flexDirection: 'row',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  nom: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: 'bold' },
  specialite: { color: '#aaa', fontSize: 13, marginBottom: 6 },
  meta: { color: '#666', fontSize: 12, marginBottom: 12 },
  btn: { backgroundColor: '#E63946', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});