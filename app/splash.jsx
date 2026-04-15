import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Splash() {
  const opaciteLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.3)).current;
  const opaciteTexte = useRef(new Animated.Value(0)).current;
  const translateTexte = useRef(new Animated.Value(30)).current;
  const opaciteSlogan = useRef(new Animated.Value(0)).current;
  const scalePoint1 = useRef(new Animated.Value(0)).current;
  const scalePoint2 = useRef(new Animated.Value(0)).current;
  const scalePoint3 = useRef(new Animated.Value(0)).current;
  const opaciteFond = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    lancerAnimation();
  }, []);

  const lancerAnimation = () => {
    Animated.sequence([
      // Apparition du cercle exterieur
      Animated.parallel([
        Animated.spring(scaleLogo, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opaciteLogo, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      // Pulse du logo
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),

      // Apparition du texte NLT
      Animated.parallel([
        Animated.timing(opaciteTexte, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(translateTexte, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // Apparition du slogan
      Animated.timing(opaciteSlogan, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      // Points de chargement
      Animated.stagger(150, [
        Animated.spring(scalePoint1, { toValue: 1, tension: 80, friction: 6, useNativeDriver: true }),
        Animated.spring(scalePoint2, { toValue: 1, tension: 80, friction: 6, useNativeDriver: true }),
        Animated.spring(scalePoint3, { toValue: 1, tension: 80, friction: 6, useNativeDriver: true }),
      ]),

      // Attente
      Animated.delay(800),

      // Fondu final
      Animated.timing(opaciteFond, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/onboarding');
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: opaciteFond }]}>

      {/* Cercles de fond */}
      <Animated.View
        style={[
          styles.cercleFond1,
          { transform: [{ scale: scaleLogo }], opacity: opaciteLogo },
        ]}
      />
      <Animated.View
        style={[
          styles.cercleFond2,
          { transform: [{ scale: scaleLogo }], opacity: opaciteLogo },
        ]}
      />

      {/* Logo principal */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opaciteLogo,
            transform: [{ scale: Animated.multiply(scaleLogo, pulseAnim) }],
          },
        ]}
      >
        <View style={styles.cercleExterieur}>
          <View style={styles.cercleInterieur}>
            <Text style={styles.logoTexte}>NLT</Text>
          </View>
        </View>
      </Animated.View>

      {/* Nom application */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: opaciteTexte,
            transform: [{ translateY: translateTexte }],
          },
        ]}
      >
        <Text style={styles.appNom}>No Limits Training</Text>
      </Animated.View>

      {/* Slogan */}
      <Animated.View style={{ opacity: opaciteSlogan }}>
        <Text style={styles.slogan}>Repousse tes limites</Text>
      </Animated.View>

      {/* Points de chargement */}
      <View style={styles.pointsContainer}>
        <Animated.View style={[styles.point, { transform: [{ scale: scalePoint1 }] }]} />
        <Animated.View style={[styles.point, styles.pointMilieu, { transform: [{ scale: scalePoint2 }] }]} />
        <Animated.View style={[styles.point, { transform: [{ scale: scalePoint3 }] }]} />
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cercleFond1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#E6394608',
    top: height / 2 - 150,
    left: width / 2 - 150,
  },
  cercleFond2: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: '#E6394604',
    top: height / 2 - 210,
    left: width / 2 - 210,
  },
  logoContainer: {
    marginBottom: 32,
  },
  cercleExterieur: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#E6394630',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cercleInterieur: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  logoTexte: {
    color: '#fff',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 6,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  appNom: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  slogan: {
    color: '#555',
    fontSize: 14,
    letterSpacing: 3,
    marginBottom: 60,
  },
  pointsContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E63946',
  },
  pointMilieu: {
    marginHorizontal: 8,
  },
});