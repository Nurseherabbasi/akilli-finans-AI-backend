// app/(tabs)/explore.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="analytics" size={40} color="#6366F1" />
        <Text style={styles.title}>Raporlar ve Analizler</Text>
        <Text style={styles.subtitle}>Detaylı finansal raporlarınız</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Aylık Rapor</Text>
        <Text style={styles.cardText}>Bu ay toplam 1,920₺ harcama yaptınız.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📈 Trend Analizi</Text>
        <Text style={styles.cardText}>Harcamalarınız geçen aya göre %12 arttı.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Öneri</Text>
        <Text style={styles.cardText}>Yemek kategorisinde tasarruf yapabilirsiniz.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#6366F1',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
}); 