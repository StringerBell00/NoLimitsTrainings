import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

const PLANS = [
  {
    id: 'mensuel',
    titre: 'Mensuel',
    prix: '4.99',
    periode: 'mois',
    economie: null,
    populaire: false,
    detail: '4.99 EUR / mois',
  },
  {
    id: 'trimestriel',
    titre: 'Trimestriel',
    prix: '11.99',
    periode: '3 mois',
    economie: '20%',
    populaire: true,
    detail: '3.99 EUR / mois',
  },
  {
    id: 'annuel',
    titre: 'Annuel',
    prix: '34.99',
    periode: 'an',
    economie: '42%',
    populaire: false,
    detail: '2.91 EUR / mois',
  },
];

const AVANTAGES_FREE = [
  { label: '4 programmes de base', inclus: true },
  { label: 'Catalogue 30 exercices', inclus: true },
  { label: 'Plan nutrition basique', inclus: true },
  { label: 'Carte des salles', inclus: true },
  { label: 'Communaute NLT', inclus: true },
  { label: 'Programmes avances', inclus: false },
  { label: 'Seances avec coach', inclus: false },
  { label: 'Plans nutrition personnalises', inclus: false },
  { label: 'Suivi coach illimite', inclus: false },
  { label: 'Contenu exclusif', inclus: false },
  { label: 'Acces prioritaire', inclus: false },
];

const AVANTAGES_PREMIUM = [
  { label: '4 programmes de base', inclus: true },
  { label: 'Catalogue 30 exercices', inclus: true },
  { label: 'Plan nutrition basique', inclus: true },
  { label: 'Carte des salles', inclus: true },
  { label: 'Communaute NLT', inclus: true },
  { label: '20+ programmes avances', inclus: true },
  { label: 'Seances avec coach incluses', inclus: true },
  { label: 'Plans nutrition personnalises', inclus: true },
  { label: 'Suivi coach illimite', inclus: true },
  { label: 'Contenu exclusif NLT', inclus: true },
  { label: 'Acces prioritaire nouveautes', inclus: true },
];

const TEMOIGNAGES = [
  { nom: 'Thomas R.', texte: 'Le premium vaut vraiment le coup. Les programmes avances m ont transforme en 3 mois.', note: 5 },
  { nom: 'Sarah M.', texte: 'Le suivi coach inclus est incroyable. Mohamed-Lamine repond toujours rapidement.', note: 5 },
  { nom: 'Kevin L.', texte: 'Les plans nutrition personnalises ont completement change mon alimentation.', note: 5 },
];

export function BadgePremium({ taille = 20 }) {
  return (
    <View style={[badgeStyles.container, { width: taille, height: taille, borderRadius: taille / 2 }]}>
      <Text style={[badgeStyles.texte, { fontSize: taille * 0.55 }]}>+</Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  texte: { color: '#fff', fontWeight: 'bold', lineHeight: undefined },
});

export default function Premium() {
  const [planSelectionne, setPlanSelectionne] = useState('annuel');
  const [estPremium, setEstPremium] = useState(false);

  const souscrire = () => {
    const plan = PLANS.find(p => p.id === planSelectionne);
    Alert.alert(
      'Abonnement Premium',
      `Tu vas souscrire au plan ${plan.titre} pour ${plan.prix} euros / ${plan.periode}.\n\nSoit ${plan.detail}.\n\nNote : Le paiement reel sera integre avec Stripe prochainement.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            setEstPremium(true);
            Alert.alert('Bienvenue dans NLT Premium !', 'Tu as maintenant acces a tous les avantages premium. Le badge + apparait sur ton profil.');
          }
        },
      ]
    );
  };

  if (estPremium) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <View style={styles.premiumActifHeader}>
          <View style={styles.premiumActifAvatarContainer}>
            <View style={styles.premiumActifAvatar}>
              <Text style={styles.premiumActifAvatarTexte}>S</Text>
            </View>
            <View style={styles.premiumBadgeGrand}>
              <Text style={styles.premiumBadgeGrandTexte}>+</Text>
            </View>
          </View>
          <Text style={styles.premiumActifTitre}>Tu es Premium !</Text>
          <View style={styles.premiumLabelRow}>
            <View style={styles.premiumLabel}>
              <Text style={styles.premiumLabelTexte}>NLT</Text>
            </View>
            <BadgePremium taille={22} />
            <Text style={styles.premiumLabelSuite}>Membre Premium</Text>
          </View>
          <Text style={styles.premiumActifSous}>Profite de tous les avantages NLT Premium</Text>
        </View>

        <View style={styles.premiumActifCard}>
          {AVANTAGES_PREMIUM.map((a, i) => (
            <View key={i} style={[styles.avantageItem, i < AVANTAGES_PREMIUM.length - 1 && styles.avantageItemBorder]}>
              <Text style={styles.avantageCheck}>✓</Text>
              <Text style={styles.avantageLabel}>{a.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.gererBtn}>
          <Text style={styles.gererBtnText}>Gerer mon abonnement</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.brand}>NLT</Text>

      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <View style={styles.premiumIcone}>
            <Text style={styles.premiumIconeTexte}>NLT</Text>
          </View>
          <View style={styles.premiumBadgeGrand}>
            <Text style={styles.premiumBadgeGrandTexte}>+</Text>
          </View>
        </View>
        <Text style={styles.titre}>NLT Premium</Text>
        <Text style={styles.sous}>Debloque tout le potentiel de NLT</Text>
      </View>

      <Text style={styles.sectionTitle}>CHOISIS TON PLAN</Text>
      {PLANS.map(p => (
        <TouchableOpacity
          key={p.id}
          style={[styles.planCard, planSelectionne === p.id && styles.planCardActif]}
          onPress={() => setPlanSelectionne(p.id)}
        >
          {p.populaire && (
            <View style={styles.populaireBadge}>
              <Text style={styles.populaireTexte}>Le plus populaire</Text>
            </View>
          )}
          <View style={styles.planRow}>
            <View style={styles.planInfo}>
              <View>
                <Text style={styles.planTitre}>{p.titre}</Text>
                <Text style={styles.planDetail}>{p.detail}</Text>
              </View>
              {p.economie && (
                <View style={styles.economieBadge}>
                  <Text style={styles.economieTexte}>-{p.economie}</Text>
                </View>
              )}
            </View>
            <View style={styles.planPrix}>
              <Text style={styles.planPrixVal}>{p.prix} EUR</Text>
              <Text style={styles.planPeriode}>/ {p.periode}</Text>
            </View>
            <View style={[styles.radio, planSelectionne === p.id && styles.radioActif]}>
              {planSelectionne === p.id && <View style={styles.radioDot} />}
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.meilleureOffre}>
        <Text style={styles.meilleureOffreTexte}>
          Le plan annuel te fait economiser 24.89 EUR par rapport au mensuel !
        </Text>
      </View>

      <Text style={styles.sectionTitle}>FREE VS PREMIUM</Text>
      <View style={styles.comparaisonCard}>
        <View style={styles.comparaisonHeader}>
          <Text style={styles.comparaisonCol}>Fonctionnalite</Text>
          <Text style={styles.comparaisonColFree}>Free</Text>
          <Text style={styles.comparaisonColPremium}>Premium</Text>
        </View>
        {AVANTAGES_FREE.map((a, i) => (
          <View key={i} style={[styles.comparaisonRow, i < AVANTAGES_FREE.length - 1 && styles.comparaisonRowBorder]}>
            <Text style={styles.comparaisonLabel}>{a.label}</Text>
            <Text style={[styles.comparaisonCheck, { color: a.inclus ? '#4caf50' : '#E63946' }]}>
              {a.inclus ? '✓' : '✗'}
            </Text>
            <Text style={[styles.comparaisonCheck, { color: '#4caf50' }]}>✓</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>ILS SONT PASSES PREMIUM</Text>
      {TEMOIGNAGES.map((t, i) => (
        <View key={i} style={styles.temoignageCard}>
          <View style={styles.temoignageHeader}>
            <View style={styles.temoignageAvatar}>
              <Text style={styles.temoignageAvatarText}>{t.nom[0]}</Text>
            </View>
            <View style={styles.temoignageInfo}>
              <Text style={styles.temoignageNom}>{t.nom}</Text>
              <Text style={styles.temoignageEtoiles}>{'★'.repeat(t.note)}</Text>
            </View>
          </View>
          <Text style={styles.temoignageTexte}>{t.texte}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.souscrireBtn} onPress={souscrire}>
        <View style={styles.souscrirebtnInner}>
          <Text style={styles.souscrirebtnText}>
            Passer Premium — {PLANS.find(p => p.id === planSelectionne)?.prix} EUR / {PLANS.find(p => p.id === planSelectionne)?.periode}
          </Text>
          <BadgePremium taille={24} />
        </View>
        <Text style={styles.souscrireBtnDetail}>
          {PLANS.find(p => p.id === planSelectionne)?.detail}
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Resiliation possible a tout moment. Sans engagement.
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
  headerSection: { alignItems: 'center', marginBottom: 32, marginTop: 8 },
  logoContainer: { position: 'relative', marginBottom: 16 },
  premiumIcone: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#E63946',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  premiumIconeTexte: { color: '#fff', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  premiumBadgeGrand: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#111',
  },
  premiumBadgeGrandTexte: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  sous: { color: '#aaa', fontSize: 15, textAlign: 'center' },
  sectionTitle: { color: '#E63946', fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14, marginTop: 8 },
  planCard: {
    backgroundColor: '#1a1a1a', borderRadius: 16,
    padding: 18, marginBottom: 12,
    borderWidth: 1, borderColor: '#2a2a2a',
  },
  planCardActif: { borderColor: '#E63946', backgroundColor: '#1a0505' },
  populaireBadge: { backgroundColor: '#E63946', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 10 },
  populaireTexte: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  planRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  planInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  planTitre: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  planDetail: { color: '#555', fontSize: 12, marginTop: 2 },
  economieBadge: { backgroundColor: '#1a3a1a', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  economieTexte: { color: '#4caf50', fontSize: 11, fontWeight: 'bold' },
  planPrix: { alignItems: 'flex-end', marginRight: 14 },
  planPrixVal: { color: '#E63946', fontSize: 18, fontWeight: 'bold' },
  planPeriode: { color: '#555', fontSize: 12 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#444', alignItems: 'center', justifyContent: 'center' },
  radioActif: { borderColor: '#E63946' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E63946' },
  meilleureOffre: {
    backgroundColor: '#1a3a1a', borderRadius: 12,
    padding: 14, marginBottom: 24,
    borderLeftWidth: 3, borderLeftColor: '#4caf50',
  },
  meilleureOffreTexte: { color: '#4caf50', fontSize: 13, fontWeight: '600' },
  comparaisonCard: { backgroundColor: '#1a1a1a', borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  comparaisonHeader: { flexDirection: 'row', padding: 14, borderBottomWidth: 1, borderBottomColor: '#2a2a2a', backgroundColor: '#111' },
  comparaisonCol: { flex: 1, color: '#555', fontSize: 12, fontWeight: 'bold' },
  comparaisonColFree: { width: 50, color: '#555', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  comparaisonColPremium: { width: 70, color: '#E63946', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  comparaisonRow: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  comparaisonRowBorder: { borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  comparaisonLabel: { flex: 1, color: '#aaa', fontSize: 13 },
  comparaisonCheck: { width: 50, fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  temoignageCard: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16, marginBottom: 12 },
  temoignageHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  temoignageAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  temoignageAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  temoignageInfo: {},
  temoignageNom: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  temoignageEtoiles: { color: '#ff9800', fontSize: 12, marginTop: 2 },
  temoignageTexte: { color: '#aaa', fontSize: 13, lineHeight: 20 },
  souscrireBtn: {
    backgroundColor: '#E63946', borderRadius: 16,
    padding: 18, alignItems: 'center', marginTop: 24, marginBottom: 12,
  },
  souscrirebtnInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  souscrirebtnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  souscrireBtnDetail: { color: '#ffffff88', fontSize: 12, marginTop: 4 },
  note: { color: '#555', fontSize: 12, textAlign: 'center', marginBottom: 8 },
  premiumActifHeader: { alignItems: 'center', marginTop: 40, marginBottom: 32 },
  premiumActifAvatarContainer: { position: 'relative', marginBottom: 16 },
  premiumActifAvatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#E63946',
    alignItems: 'center', justifyContent: 'center',
  },
  premiumActifAvatarTexte: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  premiumActifTitre: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  premiumLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  premiumLabel: { backgroundColor: '#E63946', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  premiumLabelTexte: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  premiumLabelSuite: { color: '#aaa', fontSize: 14 },
  premiumActifSous: { color: '#aaa', fontSize: 15, textAlign: 'center' },
  premiumActifCard: { backgroundColor: '#1a1a1a', borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  avantageItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  avantageItemBorder: { borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  avantageCheck: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  avantageLabel: { color: '#fff', fontSize: 14 },
  gererBtn: { borderWidth: 1, borderColor: '#E63946', borderRadius: 14, padding: 16, alignItems: 'center' },
  gererBtnText: { color: '#E63946', fontWeight: 'bold', fontSize: 15 },
});