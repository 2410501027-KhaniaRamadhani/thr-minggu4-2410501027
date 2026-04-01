import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HabitItem({ habit, onToggle, onRemove }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.icon}>{habit.icon}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.name, habit.completed && styles.completed]}>
            {habit.name}
          </Text>
          <Text style={styles.category}>
            {habit.category === 'ibadah' ? '🕌 Ibadah' : '🤝 Sosial'}
          </Text>
        </View>
        <View style={styles.actions}>
          <View style={[styles.checkbox, habit.completed && styles.checked]}>
            {habit.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: { fontSize: 28, marginRight: 14 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500', color: '#1a1a2e' },
  completed: { textDecorationLine: 'line-through', color: '#aaa' },
  category: { fontSize: 11, color: '#999', marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 2,
    borderColor: '#4CAF50', alignItems: 'center', justifyContent: 'center',
  },
  checked: { backgroundColor: '#4CAF50' },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  deleteButton: { padding: 4 },
  deleteText: { fontSize: 18 },
});