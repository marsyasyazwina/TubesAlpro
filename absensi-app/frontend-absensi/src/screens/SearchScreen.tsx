import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { AttendanceRecord } from '../components/AttendanceRecord';
import { searchSequential, searchBinary } from '../services/api';
import { Absensi, SearchAlgorithm } from '../types';
import { theme } from '../constants/theme';

export const SearchScreen: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>('sequential');
  const [nim, setNim] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [results, setResults] = useState<Absensi[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!nim) {
      Alert.alert('Error', 'Please enter Student Identity');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      let data;
      if (algorithm === 'sequential') {
        data = await searchSequential(nim, tanggal || undefined);
      } else {
        data = await searchBinary(nim, tanggal || undefined);
      }
      setResults(data);
    } catch (error) {
      Alert.alert('Error', 'Search failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Attendance</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.formTitle}>Attendance Manager</Text>

        <View style={styles.algorithmContainer}>
          <TouchableOpacity
            style={[styles.algorithmButton, algorithm === 'sequential' && styles.activeAlgorithm]}
            onPress={() => setAlgorithm('sequential')}
          >
            <Text style={[styles.algorithmText, algorithm === 'sequential' && styles.activeText]}>
              Sequential Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.algorithmButton, algorithm === 'binary' && styles.activeAlgorithm]}
            onPress={() => setAlgorithm('binary')}
          >
            <Text style={[styles.algorithmText, algorithm === 'binary' && styles.activeText]}>
              Binary Search
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Student Identity</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ID or Name"
            placeholderTextColor={theme.colors.textMuted}
            value={nim}
            onChangeText={setNim}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Attendance Date</Text>
          <TextInput
            style={styles.input}
            placeholder="mm/dd/yyyy"
            placeholderTextColor={theme.colors.textMuted}
            value={tanggal}
            onChangeText={setTanggal}
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchText}>Execute Search</Text>
        </TouchableOpacity>

        {searched && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              {results.length} Result{results.length !== 1 ? 's' : ''} Found
            </Text>

            {loading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : results.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No attendance records found</Text>
              </View>
            ) : (
              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AttendanceRecord record={item} />}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        )}
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
    marginBottom: theme.spacing.xl,
  },
  algorithmContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  algorithmButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeAlgorithm: {
    backgroundColor: `${theme.colors.primary}20`,
    borderColor: theme.colors.primary,
  },
  algorithmText: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  activeText: {
    color: theme.colors.primary,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.base,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  searchText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.md,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: theme.spacing.xl,
  },
  resultsTitle: {
    fontSize: theme.typography.lg,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
  },
});