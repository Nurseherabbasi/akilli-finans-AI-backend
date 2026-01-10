// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface NewExpense {
  category: string;
  amount: string;
  date: string;
  description: string;
}

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'Yemek', amount: 450, date: '2025-10-20', description: 'Market alışverişi' },
    { id: 2, category: 'Ulaşım', amount: 120, date: '2025-10-20', description: 'Taksi' },
    { id: 3, category: 'Eğlence', amount: 300, date: '2025-10-19', description: 'Sinema' },
    { id: 4, category: 'Faturalar', amount: 800, date: '2025-10-18', description: 'Elektrik faturası' },
    { id: 5, category: 'Yemek', amount: 250, date: '2025-10-17', description: 'Restoran' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newExpense, setNewExpense] = useState<NewExpense>({
    category: 'Yemek',
    amount: '',
    date: '2025-10-22',
    description: ''
  });

  const categories = ['Yemek', 'Ulaşım', 'Eğlence', 'Faturalar', 'Alışveriş', 'Sağlık', 'Eğitim', 'Diğer'];
  
  const categoryColors: Record<string, string> = {
    'Yemek': '#F97316',
    'Ulaşım': '#3B82F6',
    'Eğlence': '#A855F7',
    'Faturalar': '#EF4444',
    'Alışveriş': '#EC4899',
    'Sağlık': '#10B981',
    'Eğitim': '#6366F1',
    'Diğer': '#6B7280'
  };

  const categoryIcons: Record<string, any> = {
    'Yemek': 'restaurant',
    'Ulaşım': 'car',
    'Eğlence': 'game-controller',
    'Faturalar': 'receipt',
    'Alışveriş': 'cart',
    'Sağlık': 'fitness',
    'Eğitim': 'school',
    'Diğer': 'ellipsis-horizontal'
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const categoryTotals = expenses.reduce((acc: Record<string, number>, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const addExpense = () => {
    if (newExpense.amount && newExpense.description) {
      setExpenses([
        {
          id: expenses.length + 1,
          ...newExpense,
          amount: parseFloat(newExpense.amount)
        },
        ...expenses
      ]);
      setNewExpense({
        category: 'Yemek',
        amount: '',
        date: '2025-10-22',
        description: ''
      });
      setShowAddModal(false);
    }
  };

  const maxCategory = Object.entries(categoryTotals).reduce((max, [cat, amount]) => 
    amount > (max[1] || 0) ? [cat, amount] : max, ['', 0]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Akıllı Harcama Takip</Text>
          <Text style={styles.headerSubtitle}>Finansal geleceğinizi yönetin</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add-circle" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderLeftColor: '#6366F1' }]}>
            <View style={styles.statHeader}>
              <Ionicons name="wallet" size={24} color="#6366F1" />
              <Ionicons name="trending-up" size={20} color="#EF4444" />
            </View>
            <Text style={styles.statLabel}>Toplam Harcama</Text>
            <Text style={styles.statValue}>₺{totalExpense.toFixed(2)}</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: '#A855F7' }]}>
            <View style={styles.statHeader}>
              <Ionicons name="pie-chart" size={24} color="#A855F7" />
              <Ionicons name="sparkles" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statLabel}>En Çok Harcanan</Text>
            <Text style={styles.statValue}>{maxCategory[0]}</Text>
            <Text style={styles.statSubvalue}>₺{maxCategory[1]?.toFixed(2)}</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: '#10B981' }]}>
            <View style={styles.statHeader}>
              <Ionicons name="stats-chart" size={24} color="#10B981" />
              <Ionicons name="alert-circle" size={20} color="#F97316" />
            </View>
            <Text style={styles.statLabel}>Kategori Sayısı</Text>
            <Text style={styles.statValue}>{Object.keys(categoryTotals).length}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Genel Bakış
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'expenses' && styles.activeTab]}
            onPress={() => setActiveTab('expenses')}
          >
            <Text style={[styles.tabText, activeTab === 'expenses' && styles.activeTabText]}>
              Harcamalar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
            onPress={() => setActiveTab('analytics')}
          >
            <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
              Analizler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <View>
            {/* AI Öneriler */}
            <View style={styles.aiCard}>
              <View style={styles.aiHeader}>
                <Ionicons name="sparkles" size={24} color="#FFF" />
                <Text style={styles.aiTitle}>Yapay Zeka Önerileri</Text>
              </View>
              <View style={styles.aiContent}>
                <Text style={styles.aiText}>
                  • {maxCategory[0]} kategorisinde harcamalarınız yüksek. Bu alanda %15 tasarruf hedefleyebilirsiniz.
                </Text>
                <Text style={styles.aiText}>
                  • Gelecek ay tahmini harcamanız: ₺{(totalExpense * 1.1).toFixed(2)}
                </Text>
                <Text style={styles.aiText}>
                  • Hafta sonu harcamalarınızda artış gözlemlendi.
                </Text>
              </View>
            </View>

            {/* Son Harcamalar */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Son Harcamalar</Text>
              {expenses.slice(0, 5).map(exp => (
                <View key={exp.id} style={styles.expenseItem}>
                  <View style={styles.expenseLeft}>
                    <View style={[styles.categoryIcon, { backgroundColor: categoryColors[exp.category] }]}>
                      <Ionicons name={categoryIcons[exp.category]} size={24} color="#FFF" />
                    </View>
                    <View style={styles.expenseInfo}>
                      <Text style={styles.expenseDescription}>{exp.description}</Text>
                      <Text style={styles.expenseDetails}>{exp.category} • {exp.date}</Text>
                    </View>
                  </View>
                  <Text style={styles.expenseAmount}>₺{exp.amount.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'expenses' && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Tüm Harcamalar</Text>
            {expenses.map(exp => (
              <View key={exp.id} style={styles.expenseItem}>
                <View style={styles.expenseLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: categoryColors[exp.category] }]}>
                    <Ionicons name={categoryIcons[exp.category]} size={24} color="#FFF" />
                  </View>
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseDescription}>{exp.description}</Text>
                    <Text style={styles.expenseDetails}>{exp.category} • {exp.date}</Text>
                  </View>
                </View>
                <Text style={styles.expenseAmount}>₺{exp.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'analytics' && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Kategori Bazlı Analiz</Text>
            {Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => {
                const percentage = (amount / totalExpense * 100).toFixed(1);
                return (
                  <View key={category} style={styles.analyticsItem}>
                    <View style={styles.analyticsHeader}>
                      <View style={styles.analyticsLeft}>
                        <View style={[styles.colorDot, { backgroundColor: categoryColors[category] }]} />
                        <Text style={styles.analyticsCategory}>{category}</Text>
                      </View>
                      <Text style={styles.analyticsAmount}>₺{amount.toFixed(2)} ({percentage}%)</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { 
                            width: `${percentage}%` as any,
                            backgroundColor: categoryColors[category] 
                          }
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        )}
        
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Add Expense Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Harcama Ekle</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Kategori</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      newExpense.category === cat && { backgroundColor: categoryColors[cat] }
                    ]}
                    onPress={() => setNewExpense({ ...newExpense, category: cat })}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      newExpense.category === cat && styles.categoryChipTextActive
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tutar (₺)</Text>
              <TextInput
                style={styles.input}
                value={newExpense.amount}
                onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Açıklama</Text>
              <TextInput
                style={styles.input}
                value={newExpense.description}
                onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
                placeholder="Harcama detayı..."
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButtonModal]}
                onPress={addExpense}
              >
                <Text style={styles.addButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#6366F1',
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E0E7FF',
    fontSize: 14,
    marginTop: 4,
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#1F2937',
    fontSize: 28,
    fontWeight: 'bold',
  },
  statSubvalue: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6366F1',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFF',
  },
  aiCard: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  aiContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
  },
  aiText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  expenseDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  analyticsItem: {
    marginBottom: 20,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  analyticsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  analyticsCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  analyticsAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoryChipTextActive: {
    color: '#FFF',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonModal: {
    backgroundColor: '#6366F1',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});