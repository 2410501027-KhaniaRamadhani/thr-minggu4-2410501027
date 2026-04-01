import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HabitProvider } from './src/context/HabitContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
          <View style={styles.content}>
            <HomeScreen />
          </View>
        </SafeAreaView>
      </HabitProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});