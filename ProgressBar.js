import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress, color = '#4CAF50' }) {
  const validProgress = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${validProgress * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' },
  progress: { height: '100%', borderRadius: 4 },
});