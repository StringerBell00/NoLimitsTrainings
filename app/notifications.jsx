import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from './ThemeContext';

const RAPPELS = [
  { id: 1, titre: 'Seance du matin', heure: '07:00', jours: ['L', 'M', 'J', 'V'], actif: true },
  { id: 2, titre: 'Collation post-sport', heure: '16:30', jours: ['L', 'M', 'J', 'V'], actif: true },
  { id: 3, titre: 'Rappel hydratation', heure: '12:00', jours: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], actif: false },
];

const NOTIFICATIONS_RECENTES = [
  { id: 1, titre: 'Seance du jour', message: 'Ta seance Full Body t attend ! C est l heure de s entrainer.', heure: 'Il y a 2h', lu: false, type: 'seance' },
  { id: 2, titre: 'Message de Mohamed-Lamine', message: 'Super progression cette semaine ! Continue comme ca.', heure: 'Il y a 4h', lu: false, type: 'coach' },
  { id: 3, titre: 'Nouveau defi disponible', message: 'Le defi "7 jours de suite" commence aujourd hui. Tu releves le defi ?', heure: 'Il y a 6h', lu: true, type: 'defi' },
  { id: 4, titre: 'Rappel nutrition', message: 'N oublie pas ta collation post-entrainement pour optimiser ta recuperation.', heure: 'Hier', lu: true, type: 'nutrition' },
  { id: 5, titre: 'Objectif atteint', message: 'Felicitations ! Tu as complete 5 seances ce mois. Continue sur cette lancee.', heure: 'Il y a 2j', lu: true, type: 'objectif' },
];

const TYPE_COULEURS = {
  seance: '#E63946',
  coach: '#ff9800',
  defi: '#9c27b0',
  nutrition: '#4caf50',
  objectif: '#4fc3f7',
};

const TYPE_ICONES = {
  seance: 'S',
  coach: 'C',
  defi: 'D',
  nutrition: 'N',
  objectif: 'O',
};

export default function Notifications() {
  const { theme } = useTheme();
  const s = createStyles(theme);
  const [onglet, setOnglet] = useState('recentes');
  const [rappels, setRappels] = useState(RAPPELS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_RECENTES);

  const toggleRappel = (id) => {
    setRappels(prev => prev.map(r => r.id === id ? { ...r, actif: !r.actif } : r));
  };

  const marquerLu = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, lu: true } : n));
  };

  const toutMarquerLu = () => {
    setNotifications(prev => prev.map(n => ({ ...n, lu: true })));
  };

  const ajouterRappel = () => {
    Alert.alert('Bientot disponible', 'La creation de rappels personnalises sera disponible prochainement.');
  };

  const nonLus = notifications.filter(n => !n.lu).length;

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={s.brand}>NLT</Text>
      <Text style={s.titre}>Notifications</Text>

      <View style={s.onglets}>
        <TouchableOpacity
          style={[s.onglet, onglet === 'recentes' && s.ongletActif]}
          onPress={() => setOnglet('recentes')}
        >
          <Text style={[s.ongletText, onglet === 'recentes' && s.ongletTextActif]}>
            Recentes {nonLus > 0 ? `(${nonLus})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.onglet, onglet === 'rappels' && s.ongletActif]}
          onPress={() => setOnglet('rappels')}
        >
          <Text style={[s.ongletText, onglet === 'rappels' && s.ongletTextActif]}>
            Rappels
          </Text>
        </TouchableOpacity>
      </View>

      {onglet === 'recentes' && (
        <View>
          {nonLus > 0 && (
            <TouchableOpacity style={s.toutLuBtn} onPress={toutMarquerLu}>
              <Text style={s.toutLuBtnText}>Tout marquer comme lu</Text>
            </TouchableOpacity>
          )}

          {notifications.map(n => (
            <TouchableOpacity
              key={n.id}
              style={[s.notifCard, !n.lu && s.notifCardNonLu]}
              onPress={() => marquerLu(n.id)}
            >
              <View style={[s.notifIcone, { backgroundColor: TYPE_COULEURS[n.type] }]}>
                <Text style={s.notifIconeTexte}>{TYPE_ICONES[n.type]}</Text>
              </View>
              <View style={s.notifContenu}>
                <View style={s.notifHeader}>
                  <Text style={s.notifTitre}>{n.titre}</Text>
                  <Text style={s.notifHeure}>{n.heure}</Text>
                </View>
                <Text style={s.notifMessage} numberOfLines={2}>{n.message}</Text>
              </View>
              {!n.lu && <View style={s.notifPoint} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {onglet === 'rappels' && (
        <View>
          <Text style={s.sectionTitle}>MES RAPPELS</Text>

          {rappels.map(r => (
            <View key={r.id} style={s.rappelCard}>
              <View style={s.rappelHeader}>
                <View>
                  <Text style={s.rappelTitre}>{r.titre}</Text>
                  <Text style={s.rappelHeure}>{r.heure}</Text>
                </View>
                <Switch
                  value={r.actif}
                  onValueChange={() => toggleRappel(r.id)}
                  trackColor={{ false: theme.card2, true: theme.accent }}
                  thumbColor={r.actif ? '#fff' : theme.texteFaible}
                />
              </View>
              <View style={s.joursRow}>
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((j, i) => (
                  <View
                    key={i}
                    style={[
                      s.jourBadge,
                      r.jours.includes(j) && s.jourBadgeActif,
                    ]}
                  >
                    <Text style={[
                      s.jourBadgeText,
                      r.jours.includes(j) && s.jourBadgeTextActif,
                    ]}>
                      {j}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity style={s.ajouterBtn} onPress={ajouterRappel}>
            <Text style={s.ajouterBtnText}>Ajouter un rappel</Text>
          </TouchableOpacity>

          <Text style={s.sectionTitle}>PREFERENCES</Text>
          <View style={s.prefsCard}>
            {[
              { label: 'Notifications de seances', desc: 'Rappels avant tes seances programmees' },
              { label: 'Messages des coaches', desc: 'Alertes quand ton coach t ecrit' },
              { label: 'Defis et challenges', desc: 'Nouveaux defis et resultats' },
              { label: 'Conseils nutrition', desc: 'Rappels repas et hydratation' },
            ].map((p, i) => (
              <View key={i} style={[s.prefItem, i < 3 && s.prefItemBorder]}>
                <View style={s.prefInfo}>
                  <Text style={s.prefLabel}>{p.label}</Text>
                  <Text style={s.prefDesc}>{p.desc}</Text>
                </View>
                <Switch
                  value={true}
                  trackColor={{ false: theme.card2, true: theme.accent }}
                  thumbColor="#fff"
                />
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: theme.accent, fontSize: 16 },
  brand: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 4, marginBottom: 24 },
  onglets: { flexDirection: 'row', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: theme.bordure },
  onglet: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  ongletActif: { borderBottomWidth: 2, borderBottomColor: theme.accent },
  ongletText: { color: theme.texteFaible, fontSize: 14, fontWeight: '600' },
  ongletTextActif: { color: theme.accent },
  toutLuBtn: { alignSelf: 'flex-end', marginBottom: 16 },
  toutLuBtnText: { color: theme.accent, fontSize: 13, fontWeight: '600' },
  notifCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: theme.card, borderRadius: 16,
    padding: 16, marginBottom: 10, gap: 12,
  },
  notifCardNonLu: { borderLeftWidth: 3, borderLeftColor: theme.accent },
  notifIcone: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  notifIconeTexte: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  notifContenu: { flex: 1 },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  notifTitre: { color: theme.texte, fontSize: 14, fontWeight: 'bold', flex: 1 },
  notifHeure: { color: theme.texteFaible, fontSize: 11 },
  notifMessage: { color: theme.texteSous, fontSize: 13, lineHeight: 18 },
  notifPoint: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.accent, marginTop: 4 },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14, marginTop: 8 },
  rappelCard: { backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 12 },
  rappelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  rappelTitre: { color: theme.texte, fontSize: 15, fontWeight: 'bold' },
  rappelHeure: { color: theme.accent, fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  joursRow: { flexDirection: 'row', gap: 8 },
  jourBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.card2, alignItems: 'center', justifyContent: 'center' },
  jourBadgeActif: { backgroundColor: theme.accent },
  jourBadgeText: { color: theme.texteFaible, fontSize: 12, fontWeight: 'bold' },
  jourBadgeTextActif: { color: '#fff' },
  ajouterBtn: { borderWidth: 1, borderColor: theme.accent, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 24 },
  ajouterBtnText: { color: theme.accent, fontWeight: 'bold', fontSize: 15 },
  prefsCard: { backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  prefItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  prefItemBorder: { borderBottomWidth: 1, borderBottomColor: theme.bordure },
  prefInfo: { flex: 1, marginRight: 12 },
  prefLabel: { color: theme.texte, fontSize: 14, fontWeight: '600' },
  prefDesc: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
});