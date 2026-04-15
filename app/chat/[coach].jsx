import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../ThemeContext';

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
  'La regularite est la cle du succes. Mieux vaut 3 seances par semaine pendant 6 mois.',
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
  const { theme } = useTheme();
  const s = createStyles(theme);
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
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.retour}>←</Text>
        </TouchableOpacity>
        <View style={s.headerInfo}>
          <Image source={{ uri: coachInfo.photo }} style={s.headerPhoto} />
          <View>
            <Text style={s.headerNom}>{coach}</Text>
            <Text style={s.headerStatut}>{coachInfo.statut}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={s.reserverBtn}
          onPress={() => router.push(`/booking/${coach}`)}
        >
          <Text style={s.reserverBtnText}>Reserver</Text>
        </TouchableOpacity>
      </View>

      <View style={s.coachBanner}>
        <Text style={s.coachBannerText}>
          {coachInfo.specialite} • Repond generalement en moins d 1h
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={s.messagesContainer}
        contentContainerStyle={s.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m) => (
          <View
            key={m.id}
            style={[
              s.messageWrapper,
              m.auteur === 'user' ? s.messageWrapperUser : s.messageWrapperCoach,
            ]}
          >
            {m.auteur === 'coach' && (
              <Image source={{ uri: coachInfo.photo }} style={s.messageAvatar} />
            )}
            <View style={[
              s.messageBulle,
              m.auteur === 'user' ? s.messageBulleUser : s.messageBulleCoach,
            ]}>
              <Text style={[
                s.messageTexte,
                m.auteur === 'user' ? s.messageTexteUser : s.messageTexteCoach,
              ]}>
                {m.texte}
              </Text>
              <Text style={[
                s.messageHeure,
                m.auteur === 'user' ? s.messageHeureUser : s.messageHeureCoach,
              ]}>
                {m.heure}
              </Text>
            </View>
          </View>
        ))}

        {enTrain && (
          <View style={s.messageWrapper}>
            <Image source={{ uri: coachInfo.photo }} style={s.messageAvatar} />
            <View style={s.typingBulle}>
              <Text style={s.typingTexte}>...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.suggestionsScroll}
        contentContainerStyle={s.suggestionsContent}
      >
        {SUGGESTIONS.map((su, i) => (
          <TouchableOpacity
            key={i}
            style={s.suggestionBadge}
            onPress={() => envoyerMessage(su)}
          >
            <Text style={s.suggestionTexte}>{su}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={s.inputContainer}>
        <TextInput
          style={s.input}
          placeholder="Ecris un message..."
          placeholderTextColor={theme.texteFaible}
          value={texte}
          onChangeText={setTexte}
          multiline
          maxLength={500}
          color={theme.texte}
        />
        <TouchableOpacity
          style={[s.sendBtn, !texte.trim() && s.sendBtnDisabled]}
          onPress={() => envoyerMessage(texte)}
          disabled={!texte.trim()}
        >
          <Text style={s.sendBtnText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: theme.bordure,
  },
  retour: { color: theme.accent, fontSize: 24, fontWeight: 'bold' },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, marginLeft: 16 },
  headerPhoto: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.card2 },
  headerNom: { color: theme.texte, fontSize: 15, fontWeight: 'bold' },
  headerStatut: { color: '#4caf50', fontSize: 12, marginTop: 2 },
  reserverBtn: { backgroundColor: theme.accent, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  reserverBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  coachBanner: { backgroundColor: theme.card, padding: 10, alignItems: 'center' },
  coachBannerText: { color: theme.texteFaible, fontSize: 12 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  messageWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  messageWrapperUser: { flexDirection: 'row-reverse' },
  messageWrapperCoach: { flexDirection: 'row' },
  messageAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.card2 },
  messageBulle: { maxWidth: '75%', borderRadius: 18, padding: 12 },
  messageBulleUser: { backgroundColor: theme.accent, borderBottomRightRadius: 4 },
  messageBulleCoach: { backgroundColor: theme.card, borderBottomLeftRadius: 4 },
  messageTexte: { fontSize: 15, lineHeight: 22 },
  messageTexteUser: { color: '#fff' },
  messageTexteCoach: { color: theme.texte },
  messageHeure: { fontSize: 10, marginTop: 4 },
  messageHeureUser: { color: '#ffffff88', textAlign: 'right' },
  messageHeureCoach: { color: theme.texteFaible },
  typingBulle: { backgroundColor: theme.card, borderRadius: 18, padding: 12, borderBottomLeftRadius: 4 },
  typingTexte: { color: theme.texteFaible, fontSize: 20, letterSpacing: 4 },
  suggestionsScroll: { maxHeight: 50 },
  suggestionsContent: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  suggestionBadge: { backgroundColor: theme.card, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: theme.accent },
  suggestionTexte: { color: theme.accent, fontSize: 12 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 12,
    padding: 16, borderTopWidth: 1, borderTopColor: theme.bordure,
  },
  input: {
    flex: 1, backgroundColor: theme.card, borderRadius: 24,
    paddingHorizontal: 18, paddingVertical: 12,
    fontSize: 15, maxHeight: 120,
    borderWidth: 1, borderColor: theme.bordure,
  },
  sendBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: theme.card2 },
  sendBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});