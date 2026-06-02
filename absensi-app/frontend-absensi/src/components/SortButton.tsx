import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SortAlgorithm } from '../types';
import { theme } from '../constants/theme';

interface SortButtonProps { algorithm: SortAlgorithm; isActive: boolean; onPress: () => void; }

export const SortButton: React.FC<SortButtonProps> = ({ algorithm, isActive, onPress }) => {
  const label = algorithm === 'selection' ? '% Sort by Attendance % (Selection Sort)' : 'AZ Sort by Name (Insertion Sort)';
  return (
    <TouchableOpacity style={[styles.container, isActive && styles.activeContainer]} onPress={onPress}>
      <Text style={[styles.text, isActive && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md, borderRadius: theme.borderRadius.md, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, marginVertical: theme.spacing.xs },
  activeContainer: { backgroundColor: `${theme.colors.primary}20`, borderColor: theme.colors.primary },
  text: { fontSize: theme.typography.sm, color: theme.colors.textSecondary, fontWeight: '500', textAlign: 'center' },
  activeText: { color: theme.colors.primary },
});