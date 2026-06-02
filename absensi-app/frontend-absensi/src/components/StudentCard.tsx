import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mahasiswa } from '../types';
import { StatusBadge } from './StatusBadge';
import { theme } from '../constants/theme';

interface StudentCardProps { mahasiswa: Mahasiswa; index?: number; onPress: () => void; showRank?: boolean; }

export const StudentCard: React.FC<StudentCardProps> = ({ mahasiswa, index, onPress, showRank = true }) => {
  const borderColor = mahasiswa.status === 'Good' ? theme.colors.success : mahasiswa.status === 'Warning' ? theme.colors.warning : theme.colors.danger;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, { borderLeftColor: borderColor }]}>
        <View style={styles.leftSection}>
          {showRank && index !== undefined && <View style={styles.rankContainer}><Text style={styles.rank}>{(index + 1).toString().padStart(3, '0')}</Text></View>}
          <View style={styles.infoContainer}><Text style={styles.name}>{mahasiswa.nama}</Text><Text style={styles.nim}>ID: {mahasiswa.nim}</Text></View>
        </View>
        <StatusBadge status={mahasiswa.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.lg, marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4 },
  leftSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rankContainer: { width: 50, marginRight: theme.spacing.md },
  rank: { fontSize: theme.typography.lg, fontWeight: 'bold', color: theme.colors.primary },
  infoContainer: { flex: 1 },
  name: { fontSize: theme.typography.md, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: theme.spacing.xs },
  nim: { fontSize: theme.typography.sm, color: theme.colors.textSecondary },
});