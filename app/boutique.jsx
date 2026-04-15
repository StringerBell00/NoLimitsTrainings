import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';

const CATEGORIES = [
  { id: 'tout', label: 'Tout' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'accessoires', label: 'Accessoires' },
  { id: 'vetements', label: 'Vetements' },
];

const PRODUITS = [
  {
    id: 1,
    nom: 'Programme Prise de Masse Elite',
    description: 'Programme 12 semaines concu par Mohamed-Lamine pour une prise de masse optimale. Inclut plan nutrition et suivi.',
    prix: '29.99',
    categorie: 'programmes',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    badge: 'Bestseller',
    badgeCouleur: '#E63946',
    note: 4.9,
    avis: 89,
  },
  {
    id: 2,
    nom: 'Guide Nutrition Complet',
    description: 'Guide PDF de 80 pages sur la nutrition sportive. Macros, timing des repas, supplements et recettes.',
    prix: '14.99',
    categorie: 'nutrition',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
    badge: 'Nouveau',
    badgeCouleur: '#4caf50',
    note: 4.8,
    avis: 56,
  },
  {
    id: 3,
    nom: 'Programme Perte de Poids Rapide',
    description: 'Programme 8 semaines combine cardio et musculation pour une perte de poids efficace et durable.',
    prix: '24.99',
    categorie: 'programmes',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    badge: null,
    note: 4.7,
    avis: 43,
  },
  {
    id: 4,
    nom: 'T-Shirt NLT Pro',
    description: 'T-shirt technique respirant avec logo NLT. Ideal pour l entrainement. 100% polyester recycle.',
    prix: '34.99',
    categorie: 'vetements',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    badge: 'Nouveau',
    badgeCouleur: '#4caf50',
    note: 4.6,
    avis: 28,
  },
  {
    id: 5,
    nom: 'Bandes de Resistance NLT',
    description: 'Set de 5 bandes de resistance de differentes intensites. Ideal pour le home workout et l echauffement.',
    prix: '19.99',
    categorie: 'accessoires',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80',
    badge: null,
    note: 4.5,
    avis: 67,
  },
  {
    id: 6,
    nom: 'Programme Force Maximale',
    description: 'Programme powerlifting 16 semaines base sur la methode de periodisation lineaire pour maximiser la force.',
    prix: '34.99',
    categorie: 'programmes',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
    badge: 'Pro',
    badgeCouleur: '#9c27b0',
    note: 5.0,
    avis: 34,
  },
  {
    id: 7,
    nom: 'Shaker NLT Premium',
    description: 'Shaker 700ml avec grille anti-grumeaux et compartiment pour supplements. Logo NLT grave.',
    prix: '24.99',
    categorie: 'accessoires',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80',
    badge: null,
    note: 4.4,
    avis: 112,
  },
  {
    id: 8,
    nom: 'Hoodie NLT No Limits',
    description: 'Hoodie premium avec capuche. Broderie NLT sur la poitrine. Coton bio 350g/m2.',
    prix: '59.99',
    categorie: 'vetements',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
    badge: 'Limited',
    badgeCouleur: '#ff9800',
    note: 4.8,
    avis: 19,
  },
];

export default function Boutique() {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tout');
  const [panier, setPanier] = useState([]);

  const produitsFiltres = PRODUITS.filter(p =>
    categorieSelectionnee === 'tout' || p.categorie === categorieSelectionnee
  );

  const ajouterAuPanier = (produit) => {
    const existe = panier.find(p => p.id === produit.id);
    if (existe) {
      Alert.alert('Deja dans le panier', 'Ce produit est deja dans ton panier.');
      return;
    }
    setPanier(prev => [...prev, produit]);
    Alert.alert('Ajoute au panier', `${produit.nom} a ete ajoute a ton panier.`);
  };

  const totalPanier = panier.reduce((acc, p) => acc + parseFloat(p.prix), 0);

  const commander = () => {
    if (panier.length === 0) {
      Alert.alert('Panier vide', 'Ajoute des produits avant de commander.');
      return;
    }
    Alert.alert(
      'Commande',
      `Total : ${totalPanier.toFixed(2)} EUR\n\nNote : Le paiement reel sera integre avec Stripe prochainement.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Commander',
          onPress: () => {
            setPanier([]);
            Alert.alert('Commande confirmee !', 'Tu recevras une confirmation par email.');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.containerGlobal}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>

        <Text style={styles.brand}>NLT</Text>
        <Text style={styles.titre}>Boutique</Text>
        <Text style={styles.sous}>Programmes, accessoires et plus</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <View style={styles.categoriesRow}>
            {CATEGORIES.map(c => (
              <TouchableOpacity
                key={c.id}
                style={[styles.categorieBtn, categorieSelectionnee === c.id && styles.categorieBtnActif]}
                onPress={() => setCategorieSelectionnee(c.id)}
              >
                <Text style={[styles.categorieBtnText, categorieSelectionnee === c.id && styles.categorieBtnTextActif]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.compteur}>{produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''}</Text>

        <View style={styles.grille}>
          {produitsFiltres.map(p => (
            <View key={p.id} style={styles.produitCard}>
              <View style={styles.produitImageContainer}>
                <Image source={{ uri: p.image }} style={styles.produitImage} resizeMode="cover" />
                {p.badge && (
                  <View style={[styles.badgeProduit, { backgroundColor: p.badgeCouleur }]}>
                    <Text style={styles.badgeProduitText}>{p.badge}</Text>
                  </View>
                )}
              </View>

              <View style={styles.produitInfo}>
                <Text style={styles.produitNom} numberOfLines={2}>{p.nom}</Text>
                <Text style={styles.produitDescription} numberOfLines={2}>{p.description}</Text>

                <View style={styles.produitNoteRow}>
                  <Text style={styles.produitEtoiles}>{'★'.repeat(Math.floor(p.note))}</Text>
                  <Text style={styles.produitNote}>{p.note.toFixed(1)}</Text>
                  <Text style={styles.produitAvis}>({p.avis})</Text>
                </View>

                <View style={styles.produitFooter}>
                  <Text style={styles.produitPrix}>{p.prix} EUR</Text>
                  <TouchableOpacity
                    style={[styles.ajouterBtn, panier.find(item => item.id === p.id) && styles.ajouterBtnActif]}
                    onPress={() => ajouterAuPanier(p)}
                  >
                    <Text style={styles.ajouterBtnText}>
                      {panier.find(item => item.id === p.id) ? 'Ajoute' : 'Ajouter'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {panier.length > 0 && (
        <View style={styles.panierFlottant}>
          <View style={styles.panierInfo}>
            <View style={styles.panierBadge}>
              <Text style={styles.panierBadgeText}>{panier.length}</Text>
            </View>
            <Text style={styles.panierTexte}>article{panier.length > 1 ? 's' : ''} dans le panier</Text>
            <Text style={styles.panierTotal}>{totalPanier.toFixed(2)} EUR</Text>
          </View>
          <TouchableOpacity style={styles.commanderBtn} onPress={commander}>
            <Text style={styles.commanderBtnText}>Commander</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerGlobal: { flex: 1, backgroundColor: '#111' },
  container: { flex: 1, paddingHorizontal: 24 },
  back: { marginTop: 60, marginBottom: 8 },
  backText: { color: '#E63946', fontSize: 16 },
  brand: { color: '#E63946', fontSize: 12, fontWeight: 'bold', letterSpacing: 4, marginBottom: 8 },
  titre: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  sous: { color: '#aaa', fontSize: 15, marginTop: 4, marginBottom: 20 },
  categoriesScroll: { marginBottom: 16 },
  categoriesRow: { flexDirection: 'row', gap: 8 },
  categorieBtn: {
    backgroundColor: '#1a1a1a', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
    borderWidth: 1, borderColor: '#2a2a2a',
  },
  categorieBtnActif: { backgroundColor: '#E63946', borderColor: '#E63946' },
  categorieBtnText: { color: '#aaa', fontSize: 13, fontWeight: '600' },
  categorieBtnTextActif: { color: '#fff' },
  compteur: { color: '#555', fontSize: 13, marginBottom: 16 },
  grille: { gap: 16 },
  produitCard: { backgroundColor: '#1a1a1a', borderRadius: 20, overflow: 'hidden' },
  produitImageContainer: { position: 'relative' },
  produitImage: { width: '100%', height: 180 },
  badgeProduit: { position: 'absolute', top: 12, left: 12, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  badgeProduitText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  produitInfo: { padding: 16 },
  produitNom: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  produitDescription: { color: '#666', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  produitNoteRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  produitEtoiles: { color: '#ff9800', fontSize: 13 },
  produitNote: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  produitAvis: { color: '#555', fontSize: 12 },
  produitFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  produitPrix: { color: '#E63946', fontSize: 20, fontWeight: 'bold' },
  ajouterBtn: { backgroundColor: '#E63946', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  ajouterBtnActif: { backgroundColor: '#1a3a1a' },
  ajouterBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  panierFlottant: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#1a1a1a', padding: 16,
    borderTopWidth: 1, borderTopColor: '#2a2a2a',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  panierInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  panierBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E63946', alignItems: 'center', justifyContent: 'center' },
  panierBadgeText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  panierTexte: { color: '#aaa', fontSize: 13 },
  panierTotal: { color: '#E63946', fontSize: 15, fontWeight: 'bold' },
  commanderBtn: { backgroundColor: '#E63946', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
  commanderBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});