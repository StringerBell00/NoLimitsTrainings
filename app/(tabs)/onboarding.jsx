import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const STEPS = [
  {
    titre: 'No Limits Training',
    description: 'La plateforme fitness qui repousse tes limites. Programmes, nutrition, coaches et bien plus.',
    icon: '🏋',
    bg: '#1a0a0a',
  },
  {
    titre: 'Programmes sur mesure',
    description: 'HIIT, musculation, cardio, street workout. Adaptes a ton niveau et tes objectifs.',
    icon: '📋',
    bg: '#0a0a1a',
  },
  {
    titre: 'Coaches experts',
    description: 'Reserve une seance avec un coach certifie, en presentiel ou en visio, quand tu veux.',
    icon: '👤',
    bg: '#0a1a0a',
  },
  {
    titre: 'Trouve ta salle',
    description: 'Localise les structures sportives pres de toi : gyms, piscines, terrains et dojos.',
    icon: '📍',
    bg: '#1a1a0a',
  },
];

export default function Onboarding() {
  const [etape, setEtape] = useState(0);

  const suivant = () => {
    if (etape < STEPS.length - 1) {
      setEtape(etape + 1);
    } else {
      router.replace('/login');
    }
  };

  const passer = () => {
    router.replace('/login');
  };

  const step = STEPS[etape];

  return (
    <View style={[styles.container, { backgroundColor: step.bg }]}>

      <TouchableOpacity style={styles.passerBtn} onPress={passer}>
        <Text style={styles.passerText}>Passer</Text>
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.illustration}>
        <View style={styles.fond}>
          <View style={styles.cercleExterieur}>
            <View style={styles.cercleInterieur}>
              <Text style={styles.brand}>NLT</Text>
            </View>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeNum}>{etape + 1}</Text>
          <Text style={styles.badgeTotal}>/ {STEPS.length}</Text>
        </View>
      </View>

      {/* Contenu */}
      <View style={styles.contenu}>
        <View style={styles.ligne} />
        <Text style={styles.titre}>{step.titre}</Text>
        <Text style={styles.description}>{step.description}</Text>

        {/* Indicateurs */}
        <View style={styles.indicateurs}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[styles.point, i === etape && styles.pointActif]}
            />
          ))}
        </View>

        {/* Bouton */}
        <TouchableOpacity style={styles.btn} onPress={suivant}>
          <Text style={styles.btnText}>
            {etape === STEPS.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
        </TouchableOpacity>

        {etape === STEPS.length - 1 && (
          <TouchableOpacity style={styles.skipLogin} onPress={() => router.replace('/(tabs)/home')}>
            <Text style={styles.skipLoginText}>Continuer sans compte</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  passerBtn: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    backgroundColor: '#ffffff15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  passerText: {
    color: '#aaa',
    fontSize: 14,
  },
  illustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fond: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cercleExterieur: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: '#E6394630',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cercleInterieur: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 50,
    elevation: 20,
  },
  brand: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 24,
    gap: 4,
  },
  badgeNum: {
    color: '#E63946',
    fontSize: 32,
    fontWeight: 'bold',
  },
  badgeTotal: {
    color: '#666',
    fontSize: 18,
  },
  contenu: {
    paddingBottom: 60,
  },
  ligne: {
    width: 40,
    height: 3,
    backgroundColor: '#E63946',
    borderRadius: 2,
    marginBottom: 20,
  },
  titre: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  description: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 26,
    marginBottom: 36,
  },
  indicateurs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  pointActif: {
    width: 28,
    backgroundColor: '#E63946',
  },
  btn: {
    backgroundColor: '#E63946',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipLogin: {
    alignItems: 'center',
    padding: 10,
  },
  skipLoginText: {
    color: '#555',
    fontSize: 14,
  },
});