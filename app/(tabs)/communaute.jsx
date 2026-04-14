import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useLangue } from '../LangueContext';

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
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>Communaute</Text>
      <Text style={styles.sous}>Partage et progresse ensemble</Text>

      {/* Onglets */}
      <View style={styles.onglets}>
        <TouchableOpacity
          style={[styles.onglet, onglet === 'fil' && styles.ongletActif]}
          onPress={() => setOnglet('fil')}
        >
          <Text style={[styles.ongletText, onglet === 'fil' && styles.ongletTextActif]}>
            Fil d actualite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.onglet, onglet === 'classement' && styles.ongletActif]}
          onPress={() => setOnglet('classement')}
        >
          <Text style={[styles.ongletText, onglet === 'classement' && styles.ongletTextActif]}>
            Classement
          </Text>
        </TouchableOpacity>
      </View>

      {/* Fil d actualite */}
      {onglet === 'fil' && (
        <View>
          {/* Bouton publier */}
          <TouchableOpacity
            style={styles.publierBtn}
            onPress={() => setAfficherForm(!afficherForm)}
          >
            <View style={styles.publierAvatar}>
              <Text style={styles.publierAvatarText}>M</Text>
            </View>
            <Text style={styles.publierPlaceholder}>Partage ta seance ou ton objectif...</Text>
          </TouchableOpacity>

          {/* Formulaire publication */}
          {afficherForm && (
            <View style={styles.formCard}>
              <TextInput
                style={styles.formInput}
                placeholder="Qu as-tu accompli aujourd hui ?"
                placeholderTextColor="#444"
                value={nouveauPost}
                onChangeText={setNouveauPost}
                multiline
                numberOfLines={4}
                color="#fff"
              />
              <View style={styles.formBtns}>
                <TouchableOpacity
                  style={styles.formBtnAnnuler}
                  onPress={() => { setAfficherForm(false); setNouveauPost(''); }}
                >
                  <Text style={styles.formBtnAnnulerText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.formBtnPublier} onPress={publier}>
                  <Text style={styles.formBtnPublierText}>Publier</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Publications */}
          {publications.map(p => (
            <View key={p.id} style={styles.postCard}>
              {/* Header post */}
              <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                  <Text style={styles.postAvatarText}>{p.avatar}</Text>
                </View>
                <View style={styles.postInfo}>
                  <Text style={styles.postAuteur}>{p.auteur}</Text>
                  <Text style={styles.postTemps}>{p.temps}</Text>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: COULEURS_TYPE[p.type]?.bg }]}>
                  <Text style={[styles.typeBadgeText, { color: COULEURS_TYPE[p.type]?.text }]}>
                    {COULEURS_TYPE[p.type]?.label}
                  </Text>
                </View>
              </View>

              {/* Contenu */}
              <Text style={styles.postContenu}>{p.contenu}</Text>

              {/* Image si presente */}
              {p.image && (
                <Image source={{ uri: p.image }} style={styles.postImage} resizeMode="cover" />
              )}

              {/* Stats seance */}
              {p.programme && (
                <View style={styles.seanceStats}>
                  <View style={styles.seanceStat}>
                    <Text style={styles.seanceStatVal}>{p.programme}</Text>
                    <Text style={styles.seanceStatLabel}>Programme</Text>
                  </View>
                  <View style={styles.seanceStatDivider} />
                  <View style={styles.seanceStat}>
                    <Text style={styles.seanceStatVal}>{p.duree}</Text>
                    <Text style={styles.seanceStatLabel}>Duree</Text>
                  </View>
                  <View style={styles.seanceStatDivider} />
                  <View style={styles.seanceStat}>
                    <Text style={styles.seanceStatVal}>{p.calories} kcal</Text>
                    <Text style={styles.seanceStatLabel}>Calories</Text>
                  </View>
                </View>
              )}

              {/* Actions */}
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => toggleLike(p.id)}
                >
                  <Text style={[styles.actionIcon, p.liked && { color: '#E63946' }]}>
                    {p.liked ? '♥' : '♡'}
                  </Text>
                  <Text style={[styles.actionCount, p.liked && { color: '#E63946' }]}>
                    {p.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionCount}>{p.commentaires}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionIcon}>↗</Text>
                  <Text style={styles.actionCount}>Partager</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Classement */}
      {onglet === 'classement' && (
        <View>
          <Text style={styles.sectionTitle}>CLASSEMENT DU MOIS</Text>

          {/* Top 3 */}
          <View style={styles.podium}>
            {CLASSEMENT.slice(0, 3).map((u, i) => (
              <View key={i} style={[styles.podiumItem, i === 0 && styles.podiumPremier]}>
                <Text style={[styles.podiumRang, { color: RANG_COULEURS[u.rang] }]}>
                  {u.rang === 1 ? '🥇' : u.rang === 2 ? '🥈' : '🥉'}
                </Text>
                <View style={[styles.podiumAvatar, { borderColor: RANG_COULEURS[u.rang] }]}>
                  <Text style={styles.podiumAvatarText}>{u.avatar}</Text>
                </View>
                <Text style={styles.podiumNom}>{u.nom.split(' ')[0]}</Text>
                <Text style={styles.podiumPoints}>{u.points} pts</Text>
                <Text style={styles.podiumSeances}>{u.seances} seances</Text>
              </View>
            ))}
          </View>

          {/* Liste complete */}
          <Text style={styles.sectionTitle}>CLASSEMENT COMPLET</Text>
          {CLASSEMENT.map((u, i) => (
            <View
              key={i}
              style={[
                styles.classementItem,
                u.nom === 'Mohamed-Lamine S.' && styles.classementItemMoi,
              ]}
            >
              <Text style={[styles.classementRang, { color: RANG_COULEURS[u.rang] || '#555' }]}>
                {u.rang}
              </Text>
              <View style={styles.classementAvatar}>
                <Text style={styles.classementAvatarText}>{u.avatar}</Text>
              </View>
              <View style={styles.classementInfo}>
                <Text style={styles.classementNom}>
                  {u.nom} {u.nom === 'Mohamed-Lamine S.' ? '(Moi)' : ''}
                </Text>
                <Text style={styles.classementSeances}>{u.seances} seances</Text>
              </View>
              <Text style={styles.classementPoints}>{u.points} pts</Text>
            </View>
          ))}

          {/* Comment gagner des points */}
          <Text style={styles.sectionTitle}>COMMENT GAGNER DES POINTS</Text>
          <View style={styles.pointsCard}>
            {[
              { action: 'Seance completee', points: '+100 pts' },
              { action: 'Objectif atteint', points: '+250 pts' },
              { action: 'Publication', points: '+20 pts' },
              { action: 'Like recu', points: '+5 pts' },
              { action: 'Seance avec coach', points: '+150 pts' },
            ].map((item, i) => (
              <View key={i} style={[styles.pointsItem, i < 4 && styles.pointsItemBorder]}>
                <Text style={styles.pointsAction}>{item.action}</Text>
                <Text style={styles.pointsVal}>{item.points}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  sous: { color: '#aaa', fontSize: 15, marginTop: 4, marginBottom: 24 },
  onglets: { flexDirection: 'row', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  onglet: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  ongletActif: { borderBottomWidth: 2, borderBottomColor: '#E63946' },
  ongletText: { color: '#555', fontSize: 14, fontWeight: '600' },
  ongletTextActif: { color: '#E63946' },
  publierBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  publierAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  publierAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  publierPlaceholder: { color: '#444', fontSize: 14 },
  formCard: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16, marginBottom: 16 },
  formInput: { backgroundColor: '#111', borderRadius: 12, padding: 14, fontSize: 14, minHeight: 100, textAlignVertical: 'top', marginBottom: 12 },
  formBtns: { flexDirection: 'row', gap: 12 },
  formBtnAnnuler: { flex: 1, backgroundColor: '#2a2a2a', borderRadius: 10, padding: 12, alignItems: 'center' },
  formBtnAnnulerText: { color: '#aaa', fontWeight: 'bold' },
  formBtnPublier: { flex: 1, backgroundColor: '#E63946', borderRadius: 10, padding: 12, alignItems: 'center' },
  formBtnPublierText: { color: '#fff', fontWeight: 'bold' },
  postCard: { backgroundColor: '#1a1a1a', borderRadius: 20, padding: 16, marginBottom: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  postAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  postAvatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  postInfo: { flex: 1 },
  postAuteur: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  postTemps: { color: '#555', fontSize: 12, marginTop: 2 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  typeBadgeText: { fontSize: 11, fontWeight: 'bold' },
  postContenu: { color: '#aaa', fontSize: 14, lineHeight: 22, marginBottom: 12 },
  postImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  seanceStats: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    justifyContent: 'space-around',
  },
  seanceStat: { alignItems: 'center' },
  seanceStatVal: { color: '#E63946', fontSize: 13, fontWeight: 'bold' },
  seanceStatLabel: { color: '#555', fontSize: 11, marginTop: 2 },
  seanceStatDivider: { width: 1, backgroundColor: '#2a2a2a' },
  postActions: { flexDirection: 'row', gap: 24, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#2a2a2a' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionIcon: { color: '#555', fontSize: 18 },
  actionCount: { color: '#555', fontSize: 13 },
  sectionTitle: { color: '#E63946', fontSize: 11, fontWeight: 'bold', letterSpacing: 3, marginBottom: 16, marginTop: 8 },
  podium: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24, alignItems: 'flex-end' },
  podiumItem: { alignItems: 'center', flex: 1 },
  podiumPremier: { marginBottom: 16 },
  podiumRang: { fontSize: 28, marginBottom: 8 },
  podiumAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginBottom: 8 },
  podiumAvatarText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  podiumNom: { color: '#fff', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  podiumPoints: { color: '#E63946', fontSize: 13, fontWeight: 'bold' },
  podiumSeances: { color: '#555', fontSize: 11 },
  classementItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 14, padding: 14, marginBottom: 8, gap: 12 },
  classementItemMoi: { borderWidth: 1, borderColor: '#E63946' },
  classementRang: { fontSize: 18, fontWeight: 'bold', width: 28, textAlign: 'center' },
  classementAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  classementAvatarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  classementInfo: { flex: 1 },
  classementNom: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  classementSeances: { color: '#555', fontSize: 12, marginTop: 2 },
  classementPoints: { color: '#E63946', fontSize: 15, fontWeight: 'bold' },
  pointsCard: { backgroundColor: '#1a1a1a', borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  pointsItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  pointsItemBorder: { borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  pointsAction: { color: '#fff', fontSize: 14 },
  pointsVal: { color: '#E63946', fontSize: 14, fontWeight: 'bold' },
});