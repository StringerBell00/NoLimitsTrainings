import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const COACHES_INFO = {
  'Mohamed-Lamine S.': {
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
    specialite: 'Musculation & Force',
    statut: 'En ligne',
  },
};

const MESSAGES_INITIAUX = [
  {
    id: 1,
    auteur: 'coach',
    texte: 'Bonjour ! Je suis Mohamed-Lamine, ton coach NLT. Comment puis-je t aider aujourd hui ?',
    heure: '09:00',
    lu: true,
  },
  {
    id: 2,
    auteur: 'coach',
    texte: 'N hesite pas a me poser des questions sur tes programmes, ta nutrition ou tes objectifs.',
    heure: '09:01',
    lu: true,
  },
];

const REPONSES_AUTO = [
  'Super question ! Je te conseille de commencer par un programme Full Body 3 fois par semaine.',
  'Pour la prise de masse, assure-toi de manger en surplus calorique avec suffisamment de proteines.',
  'La recuperation est aussi importante que l entrainement. Dors au moins 7-8h par nuit.',
  'Pour la perte de poids, combine cardio et musculation pour de meilleurs resultats.',
  'N oublie pas de t echauffer avant chaque seance pour eviter les blessures.',
  'Je te recommande de suivre tes progres chaque semaine pour rester motive.',
  'La regularite est la cle du succes. Mieux vaut 3 seances par semaine pendant 6 mois qu une periode intensive.',
  'Pour tes proteines, vise 1.6 a 2g par kg de poids de corps par jour.',
];

const SUGGESTIONS = [
  'Comment progresser rapidement ?',
  'Quel programme me conseilles-tu ?',
  'Comment manger pour la prise de masse ?',
  'Comment perdre du gras efficacement ?',
  'Combien de seances par semaine ?',
];

export default function Chat() {
  const { coach } = useLocalSearchParams();
  const coachInfo = COACHES_INFO[coach] || COACHES_INFO['Mohamed-Lamine S.'];
  const [messages, setMessages] = useState(MESSAGES_INITIAUX);
  const [texte, setTexte] = useState('');
  const [enTrain, setEnTrain] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const envoyerMessage = async (messageTexte) => {
    if (!messageTexte.trim()) return;

    const nouveauMessage = {
      id: Date.now(),
      auteur: 'user',
      texte: messageTexte.trim(),
      heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      lu: true,
    };

    setMessages(prev => [...prev, nouveauMessage]);
    setTexte('');
    setEnTrain(true);

    setTimeout(() => {
      const reponse = REPONSES_AUTO[Math.floor(Math.random() * REPONSES_AUTO.length)];
      const messageCoach = {
        id: Date.now() + 1,
        auteur: 'coach',
        texte: reponse,
        heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        lu: false,
      };
      setMessages(prev => [...prev, messageCoach]);
      setEnTrain(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.retour}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={{ uri: coachInfo.photo }} style={styles.headerPhoto} />
          <View>
            <Text style={styles.headerNom}>{coach}</Text>
            <Text style={styles.headerStatut}>{coachInfo.statut}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.reserverBtn}
          onPress={() => router.push(`/booking/${coach}`)}
        >
          <Text style={styles.reserverBtnText}>Reserver</Text>
        </TouchableOpacity>
      </View>

      {/* Infos coach */}
      <View style={styles.coachBanner}>
        <Text style={styles.coachBannerText}>
          {coachInfo.specialite} • Repond generalement en moins d 1h
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, i) => (
          <View
            key={m.id}
            style={[
              styles.messageWrapper,
              m.auteur === 'user' ? styles.messageWrapperUser : styles.messageWrapperCoach,
            ]}
          >
            {m.auteur === 'coach' && (
              <Image source={{ uri: coachInfo.photo }} style={styles.messageAvatar} />
            )}
            <View style={[
              styles.messageBulle,
              m.auteur === 'user' ? styles.messageBulleUser : styles.messageBulleCoach,
            ]}>
              <Text style={[
                styles.messageTexte,
                m.auteur === 'user' ? styles.messageTexteUser : styles.messageTexteCoach,
              ]}>
                {m.texte}
              </Text>
              <Text style={[
                styles.messageHeure,
                m.auteur === 'user' ? styles.messageHeureUser : styles.messageHeureCoach,
              ]}>
                {m.heure}
              </Text>
            </View>
          </View>
        ))}

        {/* Indicateur en train d ecrire */}
        {enTrain && (
          <View style={styles.messageWrapper}>
            <Image source={{ uri: coachInfo.photo }} style={styles.messageAvatar} />
            <View style={styles.typingBulle}>
              <Text style={styles.typingTexte}>...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggestions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.suggestionsScroll}
        contentContainerStyle={styles.suggestionsContent}
      >
        {SUGGESTIONS.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={styles.suggestionBadge}
            onPress={() => envoyerMessage(s)}
          >
            <Text style={styles.suggestionTexte}>{s}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ecris un message..."
          placeholderTextColor="#444"
          value={texte}
          onChangeText={setTexte}
          multiline
          maxLength={500}
          color="#fff"
        />
        <TouchableOpacity
          style={[styles.sendBtn, !texte.trim() && styles.sendBtnDisabled]}
          onPress={() => envoyerMessage(texte)}
          disabled={!texte.trim()}
        >
          <Text style={styles.sendBtnText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  retour: { color: '#E63946', fontSize: 24, fontWeight: 'bold' },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, marginLeft: 16 },
  headerPhoto: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#2a2a2a' },
  headerNom: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  headerStatut: { color: '#4caf50', fontSize: 12, marginTop: 2 },
  reserverBtn: { backgroundColor: '#E63946', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  reserverBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  coachBanner: { backgroundColor: '#1a1a1a', padding: 10, alignItems: 'center' },
  coachBannerText: { color: '#555', fontSize: 12 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  messageWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  messageWrapperUser: { flexDirection: 'row-reverse' },
  messageWrapperCoach: { flexDirection: 'row' },
  messageAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2a2a2a' },
  messageBulle: { maxWidth: '75%', borderRadius: 18, padding: 12 },
  messageBulleUser: { backgroundColor: '#E63946', borderBottomRightRadius: 4 },
  messageBulleCoach: { backgroundColor: '#1a1a1a', borderBottomLeftRadius: 4 },
  messageTexte: { fontSize: 15, lineHeight: 22 },
  messageTexteUser: { color: '#fff' },
  messageTexteCoach: { color: '#fff' },
  messageHeure: { fontSize: 10, marginTop: 4 },
  messageHeureUser: { color: '#ffffff88', textAlign: 'right' },
  messageHeureCoach: { color: '#555' },
  typingBulle: { backgroundColor: '#1a1a1a', borderRadius: 18, padding: 12, borderBottomLeftRadius: 4 },
  typingTexte: { color: '#555', fontSize: 20, letterSpacing: 4 },
  suggestionsScroll: { maxHeight: 50 },
  suggestionsContent: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  suggestionBadge: {
    backgroundColor: '#1a1a1a', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: '#E63946',
  },
  suggestionTexte: { color: '#E63946', fontSize: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  sendBtn: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: '#E63946',
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#2a2a2a' },
  sendBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});