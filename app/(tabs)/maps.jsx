import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Linking, Platform, ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../ThemeContext';

const CATEGORIES = [
  { id: 'all', label: 'Tout' },
  { id: 'gym', label: 'Salles de sport' },
  { id: 'street_workout', label: 'Street Workout' },
  { id: 'swimming_pool', label: 'Piscines' },
  { id: 'basketball', label: 'Basket' },
  { id: 'football', label: 'Football' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'dojo', label: 'Dojos' },
];

const COLORS = {
  gym: '#E63946',
  street_workout: '#f4a261',
  swimming_pool: '#4fc3f7',
  basketball: '#ff9800',
  football: '#4caf50',
  tennis: '#cddc39',
  dojo: '#9c27b0',
  all: '#E63946',
};

export default function Maps() {
  const { theme } = useTheme();
  const s = createStyles(theme);

  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => { getLocation(); }, []);
  useEffect(() => { if (location) fetchPlaces(selected); }, [location, selected]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission de localisation refusee');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      }).catch(async () => {
        return await Location.getLastKnownPositionAsync();
      });
      if (loc) {
        setLocation(loc.coords);
      } else {
        setLocation({ latitude: 48.8566, longitude: 2.3522 });
      }
    } catch (e) {
      setLocation({ latitude: 48.8566, longitude: 2.3522 });
    }
  };

  const fetchPlaces = async (categoryId) => {
    setLoading(true);
    setPlaces([]);
    setSelectedPlace(null);
    const { latitude, longitude } = location;
    const radius = 3000;

    const query = `
      [out:json];
      (
        node["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
        node["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
        node["leisure"="swimming_pool"](around:${radius},${latitude},${longitude});
        node["leisure"="pitch"](around:${radius},${latitude},${longitude});
        node["sport"](around:${radius},${latitude},${longitude});
        way["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
        way["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
        way["leisure"="swimming_pool"](around:${radius},${latitude},${longitude});
        way["leisure"="pitch"](around:${radius},${latitude},${longitude});
      );
      out center;
    `;

    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });
      const data = await res.json();
      const filtered = data.elements
        .filter(el => el.lat || el.center?.lat)
        .map(el => ({
          id: el.id,
          name: el.tags?.name || 'Structure sportive',
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
          type: detectType(el.tags),
        }))
        .filter(el => categoryId === 'all' || el.type === categoryId)
        .slice(0, 40);
      setPlaces(filtered);
    } catch (e) {
      setError('Erreur de chargement des lieux');
    }
    setLoading(false);
  };

  const detectType = (tags) => {
    if (!tags) return 'all';
    const sport = tags.sport || '';
    const leisure = tags.leisure || '';
    const name = (tags.name || '').toLowerCase();
    if (sport.includes('swimming') || leisure === 'swimming_pool' || name.includes('piscine')) return 'swimming_pool';
    if (sport.includes('basketball') || name.includes('basket')) return 'basketball';
    if (sport.includes('soccer') || sport.includes('football') || name.includes('foot')) return 'football';
    if (sport.includes('tennis') || name.includes('tennis')) return 'tennis';
    if (sport.includes('martial') || name.includes('dojo') || name.includes('judo')) return 'dojo';
    if (name.includes('street workout') || name.includes('calisthen')) return 'street_workout';
    if (leisure === 'fitness_centre' || name.includes('gym') || name.includes('fitness')) return 'gym';
    return 'all';
  };

  const openItinerary = (place) => {
    const url = Platform.OS === 'ios'
      ? `maps://?daddr=${place.lat},${place.lon}`
      : `google.navigation:q=${place.lat},${place.lon}`;
    Linking.openURL(url).catch(() =>
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`)
    );
  };

  if (error) return (
    <View style={s.center}>
      <Text style={s.errorText}>{error}</Text>
    </View>
  );

  if (!location) return (
    <View style={s.center}>
      <ActivityIndicator color={theme.accent} size="large" />
      <Text style={s.loadingText}>Localisation en cours...</Text>
    </View>
  );

  return (
    <View style={s.container}>
      <MapView
        ref={mapRef}
        style={s.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {places.map(place => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.lat, longitude: place.lon }}
            title={place.name}
            pinColor={COLORS[place.type] || theme.accent}
            onPress={() => setSelectedPlace(place)}
          />
        ))}
      </MapView>

      <View style={s.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filters}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[s.filterBtn, selected === cat.id && s.filterBtnActive]}
              onPress={() => setSelected(cat.id)}
            >
              <Text style={[s.filterLabel, selected === cat.id && s.filterLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading && (
        <View style={s.loadingOverlay}>
          <ActivityIndicator color={theme.accent} size="small" />
          <Text style={s.loadingText}>  Recherche en cours...</Text>
        </View>
      )}

      {selectedPlace && (
        <View style={s.placeCard}>
          <View style={s.placeInfo}>
            <Text style={s.placeName}>{selectedPlace.name}</Text>
            <Text style={s.placeType}>
              {CATEGORIES.find(c => c.id === selectedPlace.type)?.label || 'Sport'}
            </Text>
          </View>
          <TouchableOpacity style={s.itineraryBtn} onPress={() => openItinerary(selectedPlace)}>
            <Text style={s.itineraryText}>Itineraire</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && (
        <View style={s.counter}>
          <Text style={s.counterText}>{places.length} lieux trouves</Text>
        </View>
      )}
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  map: { flex: 1 },
  center: { flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' },
  errorText: { color: theme.accent, fontSize: 16, textAlign: 'center', padding: 24 },
  loadingText: { color: theme.texteSous, marginTop: 12, fontSize: 14 },
  filtersContainer: { position: 'absolute', top: 60, left: 0, right: 0 },
  filters: { paddingHorizontal: 16, gap: 8 },
  filterBtn: {
    alignItems: 'center',
    backgroundColor: theme.id === 'dark' ? 'rgba(17,17,17,0.9)' : 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: theme.bordure,
  },
  filterBtnActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  filterLabel: { color: theme.texteSous, fontSize: 12, fontWeight: '600' },
  filterLabelActive: { color: '#fff' },
  loadingOverlay: {
    position: 'absolute', bottom: 100, alignSelf: 'center',
    backgroundColor: theme.card, borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center',
  },
  placeCard: {
    position: 'absolute', bottom: 90, left: 16, right: 16,
    backgroundColor: theme.card, borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 4, borderLeftColor: theme.accent,
  },
  placeInfo: { flex: 1, marginRight: 12 },
  placeName: { color: theme.texte, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  placeType: { color: theme.texteSous, fontSize: 13 },
  itineraryBtn: { backgroundColor: theme.accent, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  itineraryText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  counter: {
    position: 'absolute', top: 110, alignSelf: 'center',
    backgroundColor: theme.card, borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  counterText: { color: theme.texteSous, fontSize: 11 },
});