import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SpinCardProps {
  winner: string;
  lat: number;
  lon: number;
}

const SpinCard: React.FC<SpinCardProps> = ({ winner, lat, lon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Winner: {winner}</Text>
      <Text style={styles.coordinates}>Latitude: {lat}</Text>
      <Text style={styles.coordinates}>Longitude: {lon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coordinates: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default SpinCard;