// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simüle edilmiş yükleme - gerçekte AsyncStorage'dan token kontrolü yapılacak
    setTimeout(() => {
      // Eğer kullanıcı giriş yapmışsa: router.replace('/(tabs)');
      // Değilse:
      router.replace('/login' as any);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="wallet" size={80} color="#FFF" />
      </View>
      <Text style={styles.title}>Akıllı Harcama Takip</Text>
      <Text style={styles.subtitle}>Finansal geleceğinizi yönetin</Text>
      <ActivityIndicator size="large" color="#FFF" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 40,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
});