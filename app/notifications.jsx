import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const RAPPELS = [
  { id: 'seance_matin', label: 'Rappel seance matin', heure: '08:00', description: 'Demarre ta journee avec une seance' },
  { id: 'seance_soir', label: 'Rappel seance soir', heure: '18:00', description: 'Ta seance du soir t attend' },
  { id: 'nutrition', label: 'Rappel nutrition', heure: '12:00', description: 'N oublie pas ton repas du midi' },
  { id: 'hydratation', label: 'Rappel hydratation', heure: '10:00', description: 'Bois suffisamment d eau' },
  { id: 'progression', label: 'Bilan hebdomadaire', heure: 'Dim 20:00', description: 'Consulte ta progression de la semaine' },
];

export default function NotificationsScreen() {
  const [permission, setPermission] = useState(false);
  const [actifs, setActifs] = useState({
    seance_matin: true,
    seance_soir: true,
    nutrition: false,
    hydratation: false,
    progression: true,
  });

  useEffect(() => {
    verifierPermission();
  }, []);

  const verifierPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermission(status === 'granted');
  };

  const demanderPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert(
        'Permission refusee',
        'Active les notifications dans les parametres de ton telephone pour recevoir des rappels.'
      );
    }
  };

  const toggleRappel = (id) => {
    if (!permission) {
      demanderPermission();
      return;
    }
    setActifs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const testerNotification = async () => {
    if (!permission) {
      demanderPermission();
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'No Limits Training',
        body: 'Ta seance du jour t attend. Repousse tes limites !',
      },
      trigger: { seconds: 3 },
    });
    Alert.alert('Notification envoyee', 'Tu recevras une notification dans 3 secondes.');
  };

  const nbActifs = Object.values(actifs).filter(Boolean).length;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>Notifications</Text>
      <Text style={styles.sous}>Gere tes rappels</Text>

      {/* Statut permission */}
      <View style={[styles.permissionCard, { borderLeftColor: permission ? '#4caf50' : '#E63946' }]}>
        <View style={styles.permissionInfo}>
          <Text style={styles.permissionTitre}>
            {permission ? 'Notifications activees' : 'Notifications desactivees'}
          </Text>
          <Text style={styles.permissionSous}>
            {permission
              ? `${nbActifs} rappel(s) actif(s)`
              : 'Active les notifications pour recevoir des rappels'}
          </Text>
        </View>
        {!permission && (
          <TouchableOpacity style={styles.activerBtn} onPress={demanderPermission}>
            <Text style={styles.activerBtnText}>Activer</Text>
          </TouchableOpacity>
        )}
        {permission && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkText}>OK</Text>
          </View>
        )}
      </View>

      {/* Liste rappels */}
      <Text style={styles.sectionTitle}>MES RAPPELS</Text>

      {RAPPELS.map(rappel => (
        <View key={rappel.id} style={styles.rappelCard}>
          <View style={styles.rappelInfo}>
            <View style={styles.rappelHeader}>
              <Text style={styles.rappelLabel}>{rappel.label}</Text>
              <Text style={styles.rappelHeure}>{rappel.heure}</Text>
            </View>
            <Text style={styles.rappelDesc}>{rappel.description}</Text>
          </View>
          <Switch
            value={actifs[rappel.id]}
            onValueChange={() => toggleRappel(rappel.id)}
            trackColor={{ false: '#2a2a2a', true: '#E63946' }}
            thumbColor={actifs[rappel.id] ? '#fff' : '#666'}
          />
        </View>
      ))}

      {/* Bouton test */}
      <Text style={styles.sectionTitle}>TEST</Text>
      <TouchableOpacity style={styles.testBtn} onPress={testerNotification}>
        <Text style={styles.testBtnText}>Envoyer une notification test</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Les notifications fonctionnent uniquement sur l application finale installee sur ton telephone.
      </Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: '#E63946', fontSize: 16 },
  brand: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  sous: { color: '#aaa', fontSize: 15, marginTop: 4, marginBottom: 24 },
  permissionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderLeftWidth: 4,
  },
  permissionInfo: { flex: 1 },
  permissionTitre: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  permissionSous: { color: '#aaa', fontSize: 13 },
  activerBtn: {
    backgroundColor: '#E63946',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activerBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  checkBadge: {
    backgroundColor: '#1a3a1a',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  checkText: { color: '#4caf50', fontWeight: 'bold', fontSize: 13 },
  sectionTitle: {
    color: '#E63946',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 14,
    marginTop: 8,
  },
  rappelCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rappelInfo: { flex: 1 },
  rappelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rappelLabel: { color: '#fff', fontSize: 14, fontWeight: '600' },
  rappelHeure: { color: '#E63946', fontSize: 12, fontWeight: 'bold' },
  rappelDesc: { color: '#555', fontSize: 12 },
  testBtn: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E63946',
    marginBottom: 16,
  },
  testBtnText: { color: '#E63946', fontSize: 15, fontWeight: 'bold' },
  note: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
});