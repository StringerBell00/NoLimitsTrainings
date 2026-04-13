import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const OBJECTIFS = [
  { id: 'prise_masse', label: 'Prise de masse' },
  { id: 'perte_poids', label: 'Perte de poids' },
  { id: 'maintien', label: 'Maintien' },
  { id: 'endurance', label: 'Endurance' },
];

const PLANS = {
  prise_masse: {
    calories: 3000,
    proteines: 180,
    glucides: 350,
    lipides: 80,
    repas: [
      {
        moment: 'Petit-dejeuner',
        heure: '07:30',
        plat: 'Flocons d avoine + oeufs + banane',
        calories: 680,
        proteines: 40,
        glucides: 90,
        lipides: 14,
        image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&q=80',
      },
      {
        moment: 'Collation matin',
        heure: '10:00',
        plat: 'Yaourt grec + fruits secs + miel',
        calories: 380,
        proteines: 22,
        glucides: 48,
        lipides: 10,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
      },
      {
        moment: 'Dejeuner',
        heure: '13:00',
        plat: 'Riz basmati + poulet + legumes roties',
        calories: 780,
        proteines: 55,
        glucides: 95,
        lipides: 14,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80',
      },
      {
        moment: 'Collation apres sport',
        heure: '16:30',
        plat: 'Shake proteines + pain complet + beurre de cacahuete',
        calories: 520,
        proteines: 40,
        glucides: 55,
        lipides: 16,
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80',
      },
      {
        moment: 'Diner',
        heure: '19:30',
        plat: 'Saumon + quinoa + brocolis',
        calories: 640,
        proteines: 48,
        glucides: 62,
        lipides: 18,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
      },
    ],
  },
  perte_poids: {
    calories: 1800,
    proteines: 150,
    glucides: 180,
    lipides: 55,
    repas: [
      {
        moment: 'Petit-dejeuner',
        heure: '07:30',
        plat: 'Oeufs brouilles + avocat + pain complet',
        calories: 420,
        proteines: 28,
        glucides: 32,
        lipides: 18,
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80',
      },
      {
        moment: 'Collation matin',
        heure: '10:00',
        plat: 'Pomme + amandes',
        calories: 200,
        proteines: 5,
        glucides: 28,
        lipides: 10,
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
      },
      {
        moment: 'Dejeuner',
        heure: '13:00',
        plat: 'Salade de poulet grille + legumes + vinaigrette',
        calories: 480,
        proteines: 45,
        glucides: 38,
        lipides: 14,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
      },
      {
        moment: 'Collation apres sport',
        heure: '16:30',
        plat: 'Yaourt grec nature + baies',
        calories: 180,
        proteines: 18,
        glucides: 20,
        lipides: 3,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
      },
      {
        moment: 'Diner',
        heure: '19:30',
        plat: 'Cabillaud + patate douce + haricots verts',
        calories: 520,
        proteines: 48,
        glucides: 52,
        lipides: 8,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
      },
    ],
  },
  maintien: {
    calories: 2200,
    proteines: 160,
    glucides: 260,
    lipides: 65,
    repas: [
      {
        moment: 'Petit-dejeuner',
        heure: '07:30',
        plat: 'Porridge + fruits frais + graines de chia',
        calories: 520,
        proteines: 18,
        glucides: 80,
        lipides: 12,
        image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80',
      },
      {
        moment: 'Collation matin',
        heure: '10:00',
        plat: 'Fromage blanc + noix',
        calories: 280,
        proteines: 20,
        glucides: 18,
        lipides: 14,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
      },
      {
        moment: 'Dejeuner',
        heure: '13:00',
        plat: 'Pates completes + thon + sauce tomate',
        calories: 620,
        proteines: 42,
        glucides: 82,
        lipides: 12,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
      },
      {
        moment: 'Collation',
        heure: '16:30',
        plat: 'Banane + beurre d amande',
        calories: 280,
        proteines: 8,
        glucides: 38,
        lipides: 10,
        image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&q=80',
      },
      {
        moment: 'Diner',
        heure: '19:30',
        plat: 'Poulet roti + riz + salade verte',
        calories: 580,
        proteines: 48,
        glucides: 62,
        lipides: 14,
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&q=80',
      },
    ],
  },
  endurance: {
    calories: 2600,
    proteines: 140,
    glucides: 380,
    lipides: 60,
    repas: [
      {
        moment: 'Petit-dejeuner',
        heure: '07:00',
        plat: 'Pain complet + confiture + jus d orange + oeufs',
        calories: 620,
        proteines: 22,
        glucides: 110,
        lipides: 10,
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80',
      },
      {
        moment: 'Avant sport',
        heure: '09:30',
        plat: 'Barre energetique + banane',
        calories: 320,
        proteines: 8,
        glucides: 65,
        lipides: 5,
        image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&q=80',
      },
      {
        moment: 'Dejeuner',
        heure: '13:00',
        plat: 'Riz + lentilles + legumes + huile d olive',
        calories: 720,
        proteines: 32,
        glucides: 110,
        lipides: 16,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80',
      },
      {
        moment: 'Collation',
        heure: '16:00',
        plat: 'Smoothie fruits + avoine + lait',
        calories: 380,
        proteines: 18,
        glucides: 62,
        lipides: 8,
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80',
      },
      {
        moment: 'Diner',
        heure: '19:30',
        plat: 'Spaghetti complets + viande hachee + sauce bolognese',
        calories: 680,
        proteines: 42,
        glucides: 88,
        lipides: 16,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
      },
    ],
  },
};

export default function Nutrition() {
  const [objectifSelectionne, setObjectifSelectionne] = useState('prise_masse');
  const [repasOuvert, setRepasOuvert] = useState(null);

  const plan = PLANS[objectifSelectionne];

  const macrosPourcentage = {
    proteines: Math.round((plan.proteines * 4 / plan.calories) * 100),
    glucides: Math.round((plan.glucides * 4 / plan.calories) * 100),
    lipides: Math.round((plan.lipides * 9 / plan.calories) * 100),
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>NLT</Text>
      <Text style={styles.titre}>Nutrition</Text>
      <Text style={styles.sous}>Plan alimentaire personnalise</Text>

      <Text style={styles.sectionTitle}>TON OBJECTIF</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.objectifsScroll}>
        <View style={styles.objectifsRow}>
          {OBJECTIFS.map(o => (
            <TouchableOpacity
              key={o.id}
              style={[styles.objectifBtn, objectifSelectionne === o.id && styles.objectifBtnActif]}
              onPress={() => setObjectifSelectionne(o.id)}
            >
              <Text style={[styles.objectifText, objectifSelectionne === o.id && styles.objectifTextActif]}>
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.caloriesCard}>
        <Text style={styles.caloriesVal}>{plan.calories}</Text>
        <Text style={styles.caloriesLabel}>kcal par jour</Text>
        <View style={styles.macrosRow}>
          <View style={styles.macro}>
            <View style={[styles.macroBarre, { backgroundColor: '#E63946', width: `${macrosPourcentage.proteines}%` }]} />
            <Text style={styles.macroVal}>{plan.proteines}g</Text>
            <Text style={styles.macroLabel}>Proteines</Text>
            <Text style={styles.macroPct}>{macrosPourcentage.proteines}%</Text>
          </View>
          <View style={styles.macro}>
            <View style={[styles.macroBarre, { backgroundColor: '#ff9800', width: `${macrosPourcentage.glucides}%` }]} />
            <Text style={styles.macroVal}>{plan.glucides}g</Text>
            <Text style={styles.macroLabel}>Glucides</Text>
            <Text style={styles.macroPct}>{macrosPourcentage.glucides}%</Text>
          </View>
          <View style={styles.macro}>
            <View style={[styles.macroBarre, { backgroundColor: '#4fc3f7', width: `${macrosPourcentage.lipides}%` }]} />
            <Text style={styles.macroVal}>{plan.lipides}g</Text>
            <Text style={styles.macroLabel}>Lipides</Text>
            <Text style={styles.macroPct}>{macrosPourcentage.lipides}%</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>REPAS DU JOUR</Text>

      {plan.repas.map((repas, i) => (
        <TouchableOpacity
          key={i}
          style={styles.repasCard}
          onPress={() => setRepasOuvert(repasOuvert === i ? null : i)}
        >
          <Image
            source={{ uri: repas.image }}
            style={styles.repasImage}
            resizeMode="cover"
          />

          <View style={styles.repasContenu}>
            <View style={styles.repasHeader}>
              <View>
                <Text style={styles.repasMoment}>{repas.moment}</Text>
                <Text style={styles.repasHeure}>{repas.heure}</Text>
              </View>
              <Text style={styles.repasCalories}>{repas.calories} kcal</Text>
            </View>

            <Text style={styles.repasPlat}>{repas.plat}</Text>

            {repasOuvert === i && (
              <View style={styles.repasMacros}>
                <View style={styles.separateur} />
                <View style={styles.repasMacrosRow}>
                  <View style={styles.repasMacro}>
                    <Text style={[styles.repasMacroVal, { color: '#E63946' }]}>{repas.proteines}g</Text>
                    <Text style={styles.repasMacroLabel}>Proteines</Text>
                  </View>
                  <View style={styles.repasMacro}>
                    <Text style={[styles.repasMacroVal, { color: '#ff9800' }]}>{repas.glucides}g</Text>
                    <Text style={styles.repasMacroLabel}>Glucides</Text>
                  </View>
                  <View style={styles.repasMacro}>
                    <Text style={[styles.repasMacroVal, { color: '#4fc3f7' }]}>{repas.lipides}g</Text>
                    <Text style={styles.repasMacroLabel}>Lipides</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingHorizontal: 24 },
  brand: { color: '#E63946', fontSize: 14, fontWeight: 'bold', marginTop: 60, letterSpacing: 4 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  sous: { color: '#aaa', fontSize: 15, marginTop: 4, marginBottom: 24 },
  sectionTitle: {
    color: '#E63946',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 14,
    marginTop: 8,
  },
  objectifsScroll: { marginBottom: 20 },
  objectifsRow: { flexDirection: 'row', gap: 10 },
  objectifBtn: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  objectifBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  objectifText: { color: '#aaa', fontSize: 13, fontWeight: '600' },
  objectifTextActif: { color: '#fff' },
  caloriesCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  caloriesVal: { color: '#E63946', fontSize: 52, fontWeight: 'bold' },
  caloriesLabel: { color: '#aaa', fontSize: 14, marginBottom: 24 },
  macrosRow: { flexDirection: 'row', gap: 12, width: '100%' },
  macro: { flex: 1, alignItems: 'center', gap: 6 },
  macroBarre: { height: 4, borderRadius: 2, alignSelf: 'stretch' },
  macroVal: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  macroLabel: { color: '#666', fontSize: 11 },
  macroPct: { color: '#aaa', fontSize: 11 },
  repasCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  repasImage: {
    width: '100%',
    height: 160,
  },
  repasContenu: {
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#E63946',
  },
  repasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  repasMoment: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  repasHeure: { color: '#555', fontSize: 11, marginTop: 2 },
  repasCalories: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  repasPlat: { color: '#fff', fontSize: 14, lineHeight: 20 },
  repasMacros: {},
  separateur: { height: 1, backgroundColor: '#2a2a2a', marginVertical: 12 },
  repasMacrosRow: { flexDirection: 'row', justifyContent: 'space-around' },
  repasMacro: { alignItems: 'center', gap: 4 },
  repasMacroVal: { fontSize: 16, fontWeight: 'bold' },
  repasMacroLabel: { color: '#666', fontSize: 11 },
});