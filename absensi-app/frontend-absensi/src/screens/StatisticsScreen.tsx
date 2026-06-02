import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StudentCard } from '../components/StudentCard';
import { SortButton } from '../components/SortButton';
import { getMahasiswaSorted, getAllMahasiswa } from '../services/api';
import { Mahasiswa, SortAlgorithm, SortOrder } from '../types';
import { theme } from '../constants/theme';

export const StatisticsScreen: React.FC = () => {
  const [students, setStudents] = useState<Mahasiswa[]>([]);
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>('selection');
  const [order, setOrder] = useState<SortOrder>('desc');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUnsortedStudents();
  }, []);

  const loadUnsortedStudents = async () => {
    setLoading(true);
    try {
      const data = await getAllMahasiswa();
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async () => {
    setLoading(true);
    try {
      const sorted = await getMahasiswaSorted(algorithm, order);
      setStudents(sorted);
    } catch (error) {
      Alert.alert('Error', 'Failed to sort students');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.formTitle}>Attendance Manager</Text>

        <View style={styles.sortSection}>
          <Text style={styles.sortLabel}>Sort & Filters</Text>
          <View style={styles.orderContainer}>
            <TouchableOpacity
              style={[styles.orderButton, order === 'asc' && styles.activeOrder]}
              onPress={() => setOrder('asc')}
            >
              <Text style={[styles.orderText, order === 'asc' && styles.activeOrderText]}>
                Ascending ⬆
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.orderButton, order === 'desc' && styles.activeOrder]}
              onPress={() => setOrder('desc')}
            >
              <Text style={[styles.orderText, order === 'desc' && styles.activeOrderText]}>
                Descending ⬇
              </Text>
            </TouchableOpacity>
          </View>

          <SortButton
            algorithm="selection"
            isActive={algorithm === 'selection'}
            onPress={() => setAlgorithm('selection')}
          />
          <SortButton
            algorithm="insertion"
            isActive={algorithm === 'insertion'}
            onPress={() => setAlgorithm('insertion')}
          />

          <TouchableOpacity style={styles.executeButton} onPress={handleSort}>
            <Text style={styles.executeButtonText}>
              Sort by Attendance % ({algorithm === 'selection' ? 'Selection' : 'Insertion'} Sort)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rankedSection}>
          <Text style={styles.rankedTitle}>Ranked Students</Text>
          <Text style={styles.totalText}>Total {students.length}</Text>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <StudentCard mahasiswa={item} index={index} onPress={() => {}} />
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxxxl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.typography.display,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  formTitle: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  sortSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sortLabel: {
    fontSize: theme.typography.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  orderContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  orderButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeOrder: {
    backgroundColor: `${theme.colors.primary}20`,
    borderColor: theme.colors.primary,
  },
  orderText: {
    color: theme.colors.textSecondary,
  },
  activeOrderText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  executeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  executeButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.md,
    fontWeight: 'bold',
  },
  rankedSection: {
    flex: 1,
  },
  rankedTitle: {
    fontSize: theme.typography.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  totalText: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
});