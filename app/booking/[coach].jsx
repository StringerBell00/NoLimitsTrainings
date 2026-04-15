import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../ThemeContext';

const COACHES = {
  'Mohamed-Lamine S.': { specialite: 'Musculation & Force', tarif: '60/seance', experience: '3 ans' },
};

const HORAIRES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const JOURS = [
  { label: 'Lun', date: '14 Avr' },
  { label: 'Mar', date: '15 Avr' },
  { label: 'Mer', date: '16 Avr' },
  { label: 'Jeu', date: '17 Avr' },
  { label: 'Ven', date: '18 Avr' },
  { label: 'Sam', date: '19 Avr' },
];

export default function Booking() {
  const { coach } = useLocalSearchParams();
  const { theme } = useTheme();
  const s = createStyles(theme);
  const coachData = COACHES[coach] || { specialite: 'Coach sportif', tarif: '60/seance', experience: '5 ans' };

  const [jourSelectionne, setJourSelectionne] = useState(null);
  const [heureSelectionnee, setHeureSelectionnee] = useState(null);
  const [typeSeance, setTypeSeance] = useState('presentiel');

  const confirmer = () => {
    if (!jourSelectionne || !heureSelectionnee) {
      Alert.alert('Incomplet', 'Choisis un jour et un horaire');
      return;
    }
    Alert.alert(
      'Reservation confirmee !',
      `Seance avec ${coach}\n${jourSelectionne.label} ${jourSelectionne.date} a ${heureSelectionnee}\nMode : ${typeSeance === 'presentiel' ? 'Presentiel' : 'Visio'}`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>Retour</Text>
      </TouchableOpacity>

      {/* Coach info */}
      <View style={s.coachCard}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>{coach[0]}</Text>
        </View>
        <View>
          <Text style={s.coachNom}>{coach}</Text>
          <Text style={s.coachSpecialite}>{coachData.specialite}</Text>
          <Text style={s.coachTarif}>{coachData.tarif} • {coachData.experience}</Text>
        </View>
      </View>

      {/* Type de seance */}
      <Text style={s.sectionTitle}>TYPE DE SEANCE</Text>
      <View style={s.typeRow}>
        <TouchableOpacity
          style={[s.typeBtn, typeSeance === 'presentiel' && s.typeBtnActif]}
          onPress={() => setTypeSeance('presentiel')}
        >
          <Text style={[s.typeBtnText, typeSeance === 'presentiel' && s.typeBtnTextActif]}>
            Presentiel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.typeBtn, typeSeance === 'visio' && s.typeBtnActif]}
          onPress={() => setTypeSeance('visio')}
        >
          <Text style={[s.typeBtnText, typeSeance === 'visio' && s.typeBtnTextActif]}>
            Visio
          </Text>
        </TouchableOpacity>
      </View>

      {/* Jours */}
      <Text style={s.sectionTitle}>CHOISIS UN JOUR</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.joursScroll}>
        {JOURS.map((jour, i) => (
          <TouchableOpacity
            key={i}
            style={[s.jourBtn, jourSelectionne?.label === jour.label && s.jourBtnActif]}
            onPress={() => setJourSelectionne(jour)}
          >
            <Text style={[s.jourLabel, jourSelectionne?.label === jour.label && s.jourLabelActif]}>
              {jour.label}
            </Text>
            <Text style={[s.jourDate, jourSelectionne?.label === jour.label && s.jourLabelActif]}>
              {jour.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Horaires */}
      <Text style={s.sectionTitle}>CHOISIS UN HORAIRE</Text>
      <View style={s.horairesGrid}>
        {HORAIRES.map((h, i) => (
          <TouchableOpacity
            key={i}
            style={[s.horaireBtn, heureSelectionnee === h && s.horaireBtnActif]}
            onPress={() => setHeureSelectionnee(h)}
          >
            <Text style={[s.horaireText, heureSelectionnee === h && s.horaireTextActif]}>
              {h}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recap */}
      {jourSelectionne && heureSelectionnee && (
        <View style={s.recap}>
          <Text style={s.recapText}>
            {jourSelectionne.label} {jourSelectionne.date} a {heureSelectionnee}
          </Text>
          <Text style={s.recapText}>{coachData.tarif}</Text>
        </View>
      )}

      {/* Bouton confirmer */}
      <TouchableOpacity style={s.confirmBtn} onPress={confirmer}>
        <Text style={s.confirmBtnText}>Confirmer la reservation</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, padding: 24 },
  back: { marginTop: 60, marginBottom: 24 },
  backText: { color: theme.accent, fontSize: 16 },
  coachCard: {
    backgroundColor: theme.card, borderRadius: 16,
    padding: 20, flexDirection: 'row', alignItems: 'center',
    gap: 16, marginBottom: 32,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  coachNom: { color: theme.texte, fontSize: 18, fontWeight: 'bold' },
  coachSpecialite: { color: theme.texteSous, fontSize: 13, marginTop: 2 },
  coachTarif: { color: theme.accent, fontSize: 12, marginTop: 4 },
  sectionTitle: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14 },
  typeRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  typeBtn: {
    flex: 1, backgroundColor: theme.card, borderRadius: 12,
    padding: 14, alignItems: 'center', borderWidth: 1, borderColor: theme.bordure,
  },
  typeBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  typeBtnText: { color: theme.texteSous, fontSize: 14, fontWeight: '600' },
  typeBtnTextActif: { color: '#fff' },
  joursScroll: { marginBottom: 32 },
  jourBtn: {
    backgroundColor: theme.card, borderRadius: 12,
    padding: 14, alignItems: 'center', marginRight: 10,
    minWidth: 64, borderWidth: 1, borderColor: theme.bordure,
  },
  jourBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  jourLabel: { color: theme.texteSous, fontSize: 13, fontWeight: 'bold' },
  jourDate: { color: theme.texteFaible, fontSize: 11, marginTop: 4 },
  jourLabelActif: { color: '#fff' },
  horairesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  horaireBtn: {
    backgroundColor: theme.card, borderRadius: 10,
    paddingVertical: 12, paddingHorizontal: 16,
    borderWidth: 1, borderColor: theme.bordure,
  },
  horaireBtnActif: { backgroundColor: theme.accent, borderColor: theme.accent },
  horaireText: { color: theme.texteSous, fontSize: 14 },
  horaireTextActif: { color: '#fff', fontWeight: 'bold' },
  recap: {
    backgroundColor: theme.card, borderRadius: 12,
    padding: 16, marginBottom: 24, gap: 8,
    borderLeftWidth: 4, borderLeftColor: theme.accent,
  },
  recapText: { color: theme.texte, fontSize: 14 },
  confirmBtn: {
    backgroundColor: theme.accent, borderRadius: 14,
    padding: 18, alignItems: 'center', marginBottom: 40,
  },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});