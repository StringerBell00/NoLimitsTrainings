import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <Text style={styles.nom}>Sidib</Text>
        <Text style={styles.email}>mohamedsidibenoisy7@gmail.com</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statVal}>12</Text>
          <Text style={styles.statLabel}>Séances</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statVal}>3</Text>
          <Text style={styles.statLabel}>Semaines</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statVal}>87%</Text>
          <Text style={styles.statLabel}>Assiduité</Text>
        </View>
      </View>

      {['Mon objectif', 'Mes programmes', 'Historique', 'Paramètres', 'Déconnexion'].map((item, i) => (
        <TouchableOpacity key={i} style={styles.menuItem}>
          <Text style={styles.menuText}>{item}</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  avatarSection: { alignItems: 'center', marginVertical: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  nom: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  email: { color: '#666', fontSize: 13, marginTop: 4 },
  statsRow: { flexDirection: 'row', backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20, marginBottom: 24, justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statVal: { color: '#E63946', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 18, marginBottom: 10 },
  menuText: { color: '#fff', fontSize: 15 },
  arrow: { color: '#E63946', fontSize: 16 },
});