import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useLangue } from '../LangueContext';
import { useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext';

const PUBLICATIONS = [
  {
    id: 1,
    auteur: 'Mohamed-Lamine S.',
    avatar: 'M',
    temps: 'Il y a 2h',
    type: 'seance',
    contenu: 'Seance Full Body terminee ! 52 minutes d effort total. Programme intense mais les resultats sont la.',
    programme: 'Full Body',
    duree: '52 min',
    calories: 380,
    likes: 24,
    commentaires: 8,
    liked: false,
  },
  {
    id: 2,
    auteur: 'Thomas R.',
    avatar: 'T',
    temps: 'Il y a 4h',
    type: 'objectif',
    contenu: 'Objectif atteint ! -12kg en 5 mois grace au programme NLT. Merci a toute la communaute pour le soutien.',
    likes: 67,
    commentaires: 21,
    liked: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  },
  {
    id: 3,
    auteur: 'Sarah M.',
    avatar: 'S',
    temps: 'Il y a 6h',
    type: 'seance',
    contenu: 'HIIT Cardio completed ! Session brulante de 30 minutes. Le tabata c est la vie.',
    programme: 'HIIT Cardio',
    duree: '30 min',
    calories: 420,
    likes: 18,
    commentaires: 5,
    liked: false,
  },
  {
    id: 4,
    auteur: 'Kevin L.',
    avatar: 'K',
    temps: 'Il y a 1j',
    type: 'record',
    contenu: 'Nouveau record personnel au squat : 120kg ! 6 mois de travail pour en arriver la. La progression est reelle.',
    likes: 89,
    commentaires: 34,
    liked: false,
  },
  {
    id: 5,
    auteur: 'Amina D.',
    avatar: 'A',
    temps: 'Il y a 1j',
    type: 'seance',
    contenu: 'Force et Puissance ce matin. Seance difficile mais satisfaisante. Le corps s adapte progressivement.',
    programme: 'Force et Puissance',
    duree: '75 min',
    calories: 290,
    likes: 31,
    commentaires: 12,
    liked: true,
  },
];

const CLASSEMENT = [
  { rang: 1, nom: 'Thomas R.', avatar: 'T', seances: 28, points: 2840 },
  { rang: 2, nom: 'Kevin L.', avatar: 'K', seances: 25, points: 2650 },
  { rang: 3, nom: 'Mohamed-Lamine S.', avatar: 'M', seances: 24, points: 2480 },
  { rang: 4, nom: 'Sarah M.', avatar: 'S', seances: 22, points: 2200 },
  { rang: 5, nom: 'Amina D.', avatar: 'A', seances: 19, points: 1950 },
  { rang: 6, nom: 'Lucas B.', avatar: 'L', seances: 17, points: 1720 },
  { rang: 7, nom: 'Emma T.', avatar: 'E', seances: 15, points: 1500 },
];

const COULEURS_TYPE = {
  seance: { bg: '#1a1a2e', text: '#4fc3f7', label: 'Seance' },
  objectif: { bg: '#1a3a1a', text: '#4caf50', label: 'Objectif' },
  record: { bg: '#3a1a05', text: '#ff9800', label: 'Record' },
};

const RANG_COULEURS = {
  1: '#ffd700',
  2: '#c0c0c0',
  3: '#cd7f32',
};

export default function Communaute() {
  const { t } = useLangue();
  const router = useRouter();
  const { theme } = useTheme();
  const s = createStyles(theme);

  const [onglet, setOnglet] = useState('fil');
  const [publications, setPublications] = useState(PUBLICATIONS);
  const [nouveauPost, setNouveauPost] = useState('');
  const [afficherForm, setAfficherForm] = useState(false);

  const toggleLike = (id) => {
    setPublications(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const publier = () => {
    if (!nouveauPost.trim()) {
      Alert.alert('Message vide', 'Ecris quelque chose avant de publier.');
      return;
    }
    const nouvellePublication = {
      id: Date.now(),
      auteur: 'Mohamed-Lamine S.',
      avatar: 'M',
      temps: 'A l instant',
      type: 'seance',
      contenu: nouveauPost,
      likes: 0,
      commentaires: 0,
      liked: false,
    };
    setPublications(prev => [nouvellePublication, ...prev]);
    setNouveauPost('');
    setAfficherForm(false);
  };

  return (
    <ScrollView style={s.container}>
      <Text style={s.brand}>NLT</Text>

      <View style={s.header}>
        <View>
          <Text style={s.titre}>Communaute</Text>
          <Text style={s.sous}>Partage et progresse ensemble</Text>
        </View>
        <TouchableOpacity
          style={s.defisBtn}
          onPress={() => router.push('/defis')}
        >
          <Text style={s.defisBtnText}>Defis</Text>
        </TouchableOpacity>
      </View>

      <View style={s.onglets}>
        <TouchableOpacity
          style={[s.onglet, onglet === 'fil' && s.ongletActif]}
          onPress={() => setOnglet('fil')}
        >
          <Text style={[s.ongletText, onglet === 'fil' && s.ongletTextActif]}>
            Fil d actualite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.onglet, onglet === 'classement' && s.ongletActif]}
          onPress={() => setOnglet('classement')}
        >
          <Text style={[s.ongletText, onglet === 'classement' && s.ongletTextActif]}>
            Classement
          </Text>
        </TouchableOpacity>
      </View>

      {onglet === 'fil' && (
        <View>
          <TouchableOpacity
            style={s.publierBtn}
            onPress={() => setAfficherForm(!afficherForm)}
          >
            <View style={s.publierAvatar}>
              <Text style={s.publierAvatarText}>M</Text>
            </View>
            <Text style={s.publierPlaceholder}>Partage ta seance ou ton objectif...</Text>
          </TouchableOpacity>

          {afficherForm && (
            <View style={s.formCard}>
              <TextInput
                style={s.formInput}
                placeholder="Qu as-tu accompli aujourd hui ?"
                placeholderTextColor={theme.texteFaible}
                value={nouveauPost}
                onChangeText={setNouveauPost}
                multiline
                numberOfLines={4}
                color={theme.texte}
              />
              <View style={s.formBtns}>
                <TouchableOpacity
                  style={s.formBtnAnnuler}
                  onPress={() => { setAfficherForm(false); setNouveauPost(''); }}
                >
                  <Text style={s.formBtnAnnulerText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.formBtnPublier} onPress={publier}>
                  <Text style={s.formBtnPublierText}>Publier</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {publications.map(p => (
            <View key={p.id} style={s.postCard}>
              <View style={s.postHeader}>
                <View style={s.postAvatar}>
                  <Text style={s.postAvatarText}>{p.avatar}</Text>
                </View>
                <View style={s.postInfo}>
                  <Text style={s.postAuteur}>{p.auteur}</Text>
                  <Text style={s.postTemps}>{p.temps}</Text>
                </View>
                <View style={[s.typeBadge, { backgroundColor: COULEURS_TYPE[p.type]?.bg }]}>
                  <Text style={[s.typeBadgeText, { color: COULEURS_TYPE[p.type]?.text }]}>
                    {COULEURS_TYPE[p.type]?.label}
                  </Text>
                </View>
              </View>

              <Text style={s.postContenu}>{p.contenu}</Text>

              {p.image && (
                <Image source={{ uri: p.image }} style={s.postImage} resizeMode="cover" />
              )}

              {p.programme && (
                <View style={s.seanceStats}>
                  <View style={s.seanceStat}>
                    <Text style={s.seanceStatVal}>{p.programme}</Text>
                    <Text style={s.seanceStatLabel}>Programme</Text>
                  </View>
                  <View style={s.seanceStatDivider} />
                  <View style={s.seanceStat}>
                    <Text style={s.seanceStatVal}>{p.duree}</Text>
                    <Text style={s.seanceStatLabel}>Duree</Text>
                  </View>
                  <View style={s.seanceStatDivider} />
                  <View style={s.seanceStat}>
                    <Text style={s.seanceStatVal}>{p.calories} kcal</Text>
                    <Text style={s.seanceStatLabel}>Calories</Text>
                  </View>
                </View>
              )}

              <View style={s.postActions}>
                <TouchableOpacity style={s.actionBtn} onPress={() => toggleLike(p.id)}>
                  <Text style={[s.actionIcon, p.liked && { color: theme.accent }]}>
                    {p.liked ? '♥' : '♡'}
                  </Text>
                  <Text style={[s.actionCount, p.liked && { color: theme.accent }]}>
                    {p.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.actionBtn}>
                  <Text style={s.actionIcon}>💬</Text>
                  <Text style={s.actionCount}>{p.commentaires}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.actionBtn}>
                  <Text style={s.actionIcon}>↗</Text>
                  <Text style={s.actionCount}>Partager</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {onglet === 'classement' && (
        <View>
          <Text style={s.sectionTitle}>CLASSEMENT DU MOIS</Text>

          <View style={s.podium}>
            {CLASSEMENT.slice(0, 3).map((u, i) => (
              <View key={i} style={[s.podiumItem, i === 0 && s.podiumPremier]}>
                <Text style={[s.podiumRang, { color: RANG_COULEURS[u.rang] }]}>
                  {u.rang === 1 ? '1' : u.rang === 2 ? '2' : '3'}
                </Text>
                <View style={[s.podiumAvatar, { borderColor: RANG_COULEURS[u.rang] }]}>
                  <Text style={s.podiumAvatarText}>{u.avatar}</Text>
                </View>
                <Text style={s.podiumNom}>{u.nom.split(' ')[0]}</Text>
                <Text style={s.podiumPoints}>{u.points} pts</Text>
                <Text style={s.podiumSeances}>{u.seances} seances</Text>
              </View>
            ))}
          </View>

          <Text style={s.sectionTitle}>CLASSEMENT COMPLET</Text>
          {CLASSEMENT.map((u, i) => (
            <View
              key={i}
              style={[s.classementItem, u.nom === 'Mohamed-Lamine S.' && s.classementItemMoi]}
            >
              <Text style={[s.classementRang, { color: RANG_COULEURS[u.rang] || theme.texteFaible }]}>
                {u.rang}
              </Text>
              <View style={s.classementAvatar}>
                <Text style={s.classementAvatarText}>{u.avatar}</Text>
              </View>
              <View style={s.classementInfo}>
                <Text style={s.classementNom}>
                  {u.nom} {u.nom === 'Mohamed-Lamine S.' ? '(Moi)' : ''}
                </Text>
                <Text style={s.classementSeances}>{u.seances} seances</Text>
              </View>
              <Text style={s.classementPoints}>{u.points} pts</Text>
            </View>
          ))}

          <Text style={s.sectionTitle}>COMMENT GAGNER DES POINTS</Text>
          <View style={s.pointsCard}>
            {[
              { action: 'Seance completee', points: '+100 pts' },
              { action: 'Objectif atteint', points: '+250 pts' },
              { action: 'Publication', points: '+20 pts' },
              { action: 'Like recu', points: '+5 pts' },
              { action: 'Seance avec coach', points: '+150 pts' },
            ].map((item, i) => (
              <View key={i} style={[s.pointsItem, i < 4 && s.pointsItemBorder]}>
                <Text style={s.pointsAction}>{item.action}</Text>
                <Text style={s.pointsVal}>{item.points}</Text>
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
  brand: { color: theme.accent, fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  titre: { color: theme.texte, fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  sous: { color: theme.texteSous, fontSize: 15, marginTop: 4 },
  defisBtn: { backgroundColor: theme.accent, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 },
  defisBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  onglets: { flexDirection: 'row', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: theme.bordure },
  onglet: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  ongletActif: { borderBottomWidth: 2, borderBottomColor: theme.accent },
  ongletText: { color: theme.texteFaible, fontSize: 14, fontWeight: '600' },
  ongletTextActif: { color: theme.accent },
  publierBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 16, padding: 16, gap: 12, marginBottom: 16 },
  publierAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  publierAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  publierPlaceholder: { color: theme.texteFaible, fontSize: 14 },
  formCard: { backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 16 },
  formInput: { backgroundColor: theme.bg, borderRadius: 12, padding: 14, fontSize: 14, minHeight: 100, textAlignVertical: 'top', marginBottom: 12 },
  formBtns: { flexDirection: 'row', gap: 12 },
  formBtnAnnuler: { flex: 1, backgroundColor: theme.card2, borderRadius: 10, padding: 12, alignItems: 'center' },
  formBtnAnnulerText: { color: theme.texteSous, fontWeight: 'bold' },
  formBtnPublier: { flex: 1, backgroundColor: theme.accent, borderRadius: 10, padding: 12, alignItems: 'center' },
  formBtnPublierText: { color: '#fff', fontWeight: 'bold' },
  postCard: { backgroundColor: theme.card, borderRadius: 20, padding: 16, marginBottom: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  postAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  postAvatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  postInfo: { flex: 1 },
  postAuteur: { color: theme.texte, fontSize: 15, fontWeight: 'bold' },
  postTemps: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  typeBadgeText: { fontSize: 11, fontWeight: 'bold' },
  postContenu: { color: theme.texteSous, fontSize: 14, lineHeight: 22, marginBottom: 12 },
  postImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  seanceStats: { flexDirection: 'row', backgroundColor: theme.bg, borderRadius: 12, padding: 14, marginBottom: 12, justifyContent: 'space-around' },
  seanceStat: { alignItems: 'center' },
  seanceStatVal: { color: theme.accent, fontSize: 13, fontWeight: 'bold' },
  seanceStatLabel: { color: theme.texteFaible, fontSize: 11, marginTop: 2 },
  seanceStatDivider: { width: 1, backgroundColor: theme.bordure },
  postActions: { flexDirection: 'row', gap: 24, paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.bordure },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionIcon: { color: theme.texteFaible, fontSize: 18 },
  actionCount: { color: theme.texteFaible, fontSize: 13 },
  sectionTitle: { color: theme.accent, fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16, marginTop: 8 },
  podium: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24, alignItems: 'flex-end' },
  podiumItem: { alignItems: 'center', flex: 1 },
  podiumPremier: { marginBottom: 16 },
  podiumRang: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  podiumAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.card, alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginBottom: 8 },
  podiumAvatarText: { color: theme.texte, fontSize: 22, fontWeight: 'bold' },
  podiumNom: { color: theme.texte, fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  podiumPoints: { color: theme.accent, fontSize: 13, fontWeight: 'bold' },
  podiumSeances: { color: theme.texteFaible, fontSize: 11 },
  classementItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 14, padding: 14, marginBottom: 8, gap: 12 },
  classementItemMoi: { borderWidth: 1, borderColor: theme.accent },
  classementRang: { fontSize: 18, fontWeight: 'bold', width: 28, textAlign: 'center' },
  classementAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  classementAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  classementInfo: { flex: 1 },
  classementNom: { color: theme.texte, fontSize: 14, fontWeight: 'bold' },
  classementSeances: { color: theme.texteFaible, fontSize: 12, marginTop: 2 },
  classementPoints: { color: theme.accent, fontSize: 15, fontWeight: 'bold' },
  pointsCard: { backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  pointsItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  pointsItemBorder: { borderBottomWidth: 1, borderBottomColor: theme.bordure },
  pointsAction: { color: theme.texte, fontSize: 14 },
  pointsVal: { color: theme.accent, fontSize: 14, fontWeight: 'bold' },
});