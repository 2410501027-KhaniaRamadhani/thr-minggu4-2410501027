import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useHabits } from '../hooks/useHabits';
import HabitItem from '../components/HabitItem';
import ProgressBar from '../components/ProgressBar';

// PASTIKAN export default ada di paling bawah
export default function HomeScreen() {
  const { habits, stats, toggleHabit, resetDaily, addHabit, removeHabit } = useHabits();
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ibadah');
  const [activeTab, setActiveTab] = useState('today');

  const handleAddHabit = () => {
    if (!newHabitName.trim()) {
      Alert.alert('Peringatan', 'Nama kegiatan tidak boleh kosong');
      return;
    }
    const icons = { ibadah: '🕌', sosial: '🤝' };
    addHabit(newHabitName, icons[selectedCategory], selectedCategory);
    setNewHabitName('');
    setModalVisible(false);
    Alert.alert('Berhasil', 'Kegiatan baru ditambahkan');
  };

  const handleResetDay = () => {
    Alert.alert('Reset Hari', 'Yakin ingin mereset semua kegiatan?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Reset', onPress: resetDaily, style: 'destructive' },
    ]);
  };

  const handleRemoveHabit = (id, name) => {
    Alert.alert('Hapus Kegiatan', `Hapus "${name}"?`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', onPress: () => removeHabit(id), style: 'destructive' },
    ]);
  };

  const renderTodayTab = () => (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={styles.headerContainer}>
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>📊 Progress Hari Ini</Text>
            <Text style={styles.progressPercentage}>{stats.percentage}%</Text>
            <ProgressBar progress={stats.percentage / 100} />
            <Text style={styles.progressMessage}>{stats.message}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <Text style={styles.statsNumber}>{stats.completed}</Text>
                <Text style={styles.statsLabel}>Selesai</Text>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsItem}>
                <Text style={styles.statsNumber}>{stats.total - stats.completed}</Text>
                <Text style={styles.statsLabel}>Tersisa</Text>
              </View>
              <View style={styles.statsDivider} />
              <View style={styles.statsItem}>
                <Text style={styles.statsNumber}>{stats.total}</Text>
                <Text style={styles.statsLabel}>Total</Text>
              </View>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.resetButton} onPress={handleResetDay}>
              <Text style={styles.buttonText}>↻ Reset Hari</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>+ Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      renderItem={({ item }) => (
        <HabitItem
          habit={item}
          onToggle={() => toggleHabit(item.id)}
          onRemove={() => handleRemoveHabit(item.id, item.name)}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderStatsTab = () => {
    return (
      <ScrollView style={styles.statsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.statsHeader}>
          <Text style={styles.statsHeaderTitle}>📈 Statistik Ibadah</Text>
          <Text style={styles.statsHeaderSubtitle}>Syawal 1446 H</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Keseluruhan</Text>
          <View style={styles.overallStats}>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>{stats.completed}</Text>
              <Text style={styles.statLabel}>Selesai</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>{stats.total - stats.completed}</Text>
              <Text style={styles.statLabel}>Tersisa</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>{stats.percentage}%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Per Kategori</Text>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryIcon}>🕌 Ibadah</Text>
            <Text style={styles.categoryPercent}>{stats.ibadahPercentage}%</Text>
            <ProgressBar progress={stats.ibadahPercentage / 100} />
            <Text style={styles.categoryDetail}>{stats.completedIbadah} dari {stats.totalIbadah} selesai</Text>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryIcon}>🤝 Sosial</Text>
            <Text style={styles.categoryPercent}>{stats.sosialPercentage}%</Text>
            <ProgressBar progress={stats.sosialPercentage / 100} color="#FF9800" />
            <Text style={styles.categoryDetail}>{stats.completedSosial} dari {stats.totalSosial} selesai</Text>
          </View>
        </View>

        <View style={styles.motivationCard}>
          <Text style={styles.motivationEmoji}>🌟</Text>
          <Text style={styles.motivationText}>{stats.message}</Text>
          <Text style={styles.motivationVerse}>"Sesungguhnya shalat itu mencegah dari perbuatan keji dan mungkar"</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>📋 Hari Ini</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
          onPress={() => setActiveTab('stats')}
        >
          <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>📊 Statistik</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'today' ? renderTodayTab() : renderStatsTab()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>➕ Tambah Kegiatan</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama kegiatan..."
              placeholderTextColor="#999"
              value={newHabitName}
              onChangeText={setNewHabitName}
            />
            <Text style={styles.categoryLabel}>Kategori</Text>
            <View style={styles.categoryButtons}>
              <TouchableOpacity
                style={[styles.categoryBtn, selectedCategory === 'ibadah' && styles.categoryActive]}
                onPress={() => setSelectedCategory('ibadah')}
              >
                <Text>🕌 Ibadah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryBtn, selectedCategory === 'sosial' && styles.categoryActive]}
                onPress={() => setSelectedCategory('sosial')}
              >
                <Text>🤝 Sosial</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddHabit}>
                <Text style={{ color: '#fff' }}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#4CAF50' },
  tabText: { fontSize: 16, color: '#999' },
  activeTabText: { color: '#4CAF50', fontWeight: 'bold' },
  listContent: { paddingBottom: 20 },
  headerContainer: { padding: 16 },
  progressCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  progressTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  progressPercentage: { fontSize: 48, fontWeight: 'bold', color: '#4CAF50', marginBottom: 12 },
  progressMessage: { fontSize: 14, color: '#666', marginTop: 12, textAlign: 'center', fontStyle: 'italic' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  statsItem: { alignItems: 'center' },
  statsNumber: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50' },
  statsLabel: { fontSize: 11, color: '#999', marginTop: 4 },
  statsDivider: { width: 1, backgroundColor: '#eee' },
  actionButtons: { flexDirection: 'row', gap: 12 },
  resetButton: { flex: 1, backgroundColor: '#FF9800', padding: 14, borderRadius: 16, alignItems: 'center' },
  addButton: { flex: 1, backgroundColor: '#4CAF50', padding: 14, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 24, padding: 24, width: '85%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, fontSize: 16, marginBottom: 16 },
  categoryLabel: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
  categoryButtons: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  categoryBtn: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  categoryActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  modalButtons: { flexDirection: 'row', gap: 12 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: '#f0f0f0', alignItems: 'center' },
  saveBtn: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: '#4CAF50', alignItems: 'center' },
  statsContainer: { flex: 1 },
  statsHeader: { backgroundColor: '#4CAF50', padding: 32, alignItems: 'center' },
  statsHeaderTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statsHeaderSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, margin: 16, marginTop: 0 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  overallStats: { flexDirection: 'row', justifyContent: 'space-around' },
  statBlock: { alignItems: 'center' },
  categoryItem: { marginBottom: 20 },
  categoryIcon: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  categoryPercent: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50', marginBottom: 8 },
  categoryDetail: { fontSize: 12, color: '#999', marginTop: 8 },
  motivationCard: { backgroundColor: '#E8F5E9', borderRadius: 16, padding: 20, margin: 16, alignItems: 'center' },
  motivationEmoji: { fontSize: 40, marginBottom: 12 },
  motivationText: { fontSize: 16, fontWeight: '600', color: '#2E7D32', textAlign: 'center', marginBottom: 12 },
  motivationVerse: { fontSize: 12, color: '#666', textAlign: 'center', fontStyle: 'italic' },
});