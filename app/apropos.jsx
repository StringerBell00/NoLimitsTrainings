import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from './ThemeContext';

const EQUIPE = [
  {
    nom: 'Mohamed-Lamine S.',
    role: 'Fondateur & Coach Principal',
    description: 'Passione de musculation et de coaching depuis 3 ans. Vision : rendre le fitness accessible a tous.',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
  },
];

const FONCTIONNALITES = [
  { titre: 'Programmes', description: 'Full Body, HIIT, Force, PPL et plus' },
  { titre: 'Nutrition', description: 'Plans alimentaires personnalises par objectif' },
  { titre: 'Coaches', description: 'Reservation et suivi avec des experts certifies' },
  { titre: 'Carte', description: 'Localisation des structures sportives proches' },
  { titre: 'Communaute', description: 'Partage et classement entre membres' },
  { titre: 'Timer', description: 'Tabata, HIIT et minuteur personnalise' },
  { titre: 'Boutique', description: 'Programmes, accessoires et vetements NLT' },
];

const CONTACTS = [
  { label: 'Email', valeur: 'contact@nolimitstraining.com', action: 'mailto:contact@nolimitstraining.com' },
  { label: 'Instagram', valeur: '@nolimitstraining', action: 'https://instagram.com/nolimitstraining' },
  { label: 'Site web', valeur: 'www.nolimitstraining.com', action: 'https://nolimitstraining.com' },
];

export default function Apropos() {
  const { theme } = useTheme();
  const s = createStyles(theme);

  const ouvrir = (url) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <Text style={s.backText}>Retour</Text>
      </TouchableOpacity>

      <Text style={s.brand}>NLT</Text>

      {/* Header */}
      <View style={s.headerSection}>
        <View style={s.logoContainer}>
          <View style={s.logo}>
            <Text style={s.logoTexte}>NLT</Text>
          </View>
        </View>
        <Text style={s.titre}>No Limits Training</Text>
        <Text style={s.version}>Version 1.0.0</Text>
        <Text style={s.slogan}>Repousse tes limites, chaque jour</Text>
      </View>

      {/* Mission */}
      <Text style={s.sectionTitle}>NOTRE MISSION</Text>
      <View style={s.missionCard}>
        <Text style={s.missionTexte}>
          No Limits Training est ne d une passion pour le fitness et d une conviction : tout le monde merite un accompagnement de qualite pour atteindre ses objectifs sportifs.
        </Text>
        <Text style={s.missionTexte}>
          Notre mission est de democratiser le coaching sportif en offrant des programmes personnalises, une nutrition adaptee et un acces facile aux meilleures structures sportives, directement depuis ton smartphone.
        </Text>
      </View>

      {/* Equipe */}
      <Text style={s.sectionTitle}>L EQUIPE</Text>
      {EQUIPE.map((m, i) => (
        <View key={i} style={s.membreCard}>
          <Image source={{ uri: m.photo }} style={s.membrePhoto} />
          <View style={s.membreInfo}>
            <Text style={s.membreNom}>{m.nom}</Text>
            <Text style={s.membreRole}>{m.role}</Text>
            <Text style={s.membreDescription}>{m.description}</Text>
          </View>
        </View>
      ))}

      {/* Fonctionnalites */}
      <Text style={s.sectionTitle}>FONCTIONNALITES</Text>
      <View style={s.fonctionnalitesCard}>
        {FONCTIONNALITES.map((f, i) => (
          <View key={i} style={[s.fonctionnaliteItem, i < FONCTIONNALITES.length - 1 && s.fonctionnaliteItemBorder]}>
            <View style={s.fonctionnalitePoint} />
            <View style={s.fonctionnaliteInfo}>
              <Text style={s.fonctionnaliteTitre}>{f.titre}</Text>
              <Text style={s.fonctionnaliteDesc}>{f.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Stats */}
      <Text style={s.sectionTitle}>NLT EN CHIFFRES</Text>
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={s.statVal}>500+</Text>
          <Text style={s.statLabel}>Membres</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>30+</Text>
          <Text style={s.statLabel}>Exercices</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statVal}>4</Text>
          <Text style={s.statLabel}>Programmes</Text>
        </View>
      </View>

      {/* Contact */}
      <Text style={s.sectionTitle}>NOUS CONTACTER</Text>
      <View style={s.contactCard}>
        {CONTACTS.map((c, i) => (
          <TouchableOpacity
            key={i}
            style={[s.contactItem, i < CONTACTS.length - 1 && s.contactItemBorder]}
            onPress={() => ouvrir(c.action)}
          >
            <View style={s.contactInfo}>
              <Text style={s.contactLabel}>{c.label}</Text>
              <Text style={s.contactValeur}>{c.valeur}</Text>
            </View>
            <Text style={s.contactArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Legal */}
      <Text style={s.sectionTitle}>LEGAL</Text>
      <View style={s.legalCard}>
        <TouchableOpacity style={[s.legalItem, s.legalItemBorder]}>
          <Text style={s.legalTexte}>Conditions generales d utilisation</Text>
          <Text style={s.contactArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.legalItem, s.legalItemBorder]}>
          <Text style={s.legalTexte}>Politique de confidentialite</Text>
          <Text style={s.contactArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.legalItem}>
          <Text style={s.legalTexte}>Mentions legales</Text>
          <Text style={s.contactArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerTexte}>No Limits Training</Text>
        <Text style={s.footerSous}>Fait avec passion par Mohamed-Lamine S.</Text>
        <Text style={s.footerCopyright}>2026 NLT. Tous droits reserves.</Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: theme.accent, fontSize: 16 },
  brand: { color: theme.accent, fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  headerSection: { alignItems: 'center', marginBottom: 32, marginTop: 8 },
  logoContainer: { marginBottom: 16 },
  logo: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: theme.accent,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: theme.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  logoTexte: { color: '#fff', fontSize: 28, fontWeight: 'bold', letterSpacing: 3 },
  titre: { color: theme.texte, fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  version: { color: theme.texteFaible, fontSize: 13, marginBottom: 8 },
  slogan: { color: theme.texteSous, fontSize: 14, fontStyle: 'italic' },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 14, marginTop: 8 },
  missionCard: { backgroundColor: theme.card, borderRadius: 16, padding: 20, marginBottom: 24, gap: 12 },
  missionTexte: { color: theme.texteSous, fontSize: 14, lineHeight: 24 },
  membreCard: {
    backgroundColor: theme.card, borderRadius: 20,
    padding: 20, marginBottom: 16,
    flexDirection: 'row', gap: 16,
  },
  membrePhoto: { width: 80, height: 80, borderRadius: 40, backgroundColor: theme.card2, borderWidth: 2, borderColor: theme.accent },
  membreInfo: { flex: 1 },
  membreNom: { color: theme.texte, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  membreRole: { color: theme.accent, fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  membreDescription: { color: theme.texteSous, fontSize: 13, lineHeight: 20 },
  fonctionnalitesCard: { backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  fonctionnaliteItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  fonctionnaliteItemBorder: { borderBottomWidth: 1, borderBottomColor: theme.bordure },
  fonctionnalitePoint: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.accent },
  fonctionnaliteInfo: { flex: 1 },
  fonctionnaliteTitre: { color: theme.texte, fontSize: 14, fontWeight: 'bold' },
  fonctionnaliteDesc: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1, backgroundColor: theme.card,
    borderRadius: 14, padding: 16,
    alignItems: 'center', borderLeftWidth: 3, borderLeftColor: theme.accent,
  },
  statVal: { color: theme.accent, fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: theme.texteSous, fontSize: 12, marginTop: 4 },
  contactCard: { backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  contactItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  contactItemBorder: { borderBottomWidth: 1, borderBottomColor: theme.bordure },
  contactInfo: {},
  contactLabel: { color: theme.texteFaible, fontSize: 12, marginBottom: 2 },
  contactValeur: { color: theme.texte, fontSize: 14, fontWeight: '600' },
  contactArrow: { color: theme.texteFaible, fontSize: 16 },
  legalCard: { backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', marginBottom: 24 },
  legalItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  legalItemBorder: { borderBottomWidth: 1, borderBottomColor: theme.bordure },
  legalTexte: { color: theme.texte, fontSize: 14 },
  footer: { alignItems: 'center', paddingVertical: 24 },
  footerTexte: { color: theme.texte, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  footerSous: { color: theme.texteSous, fontSize: 13, marginBottom: 8 },
  footerCopyright: { color: theme.texteFaible, fontSize: 12 },
});