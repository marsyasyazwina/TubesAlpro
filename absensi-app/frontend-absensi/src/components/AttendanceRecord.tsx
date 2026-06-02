import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Absensi } from '../types';
import { StatusBadge } from './StatusBadge';
import { theme } from '../constants/theme';

interface AttendanceRecordProps { record: Absensi; }

export const AttendanceRecord: React.FC<AttendanceRecordProps> = ({ record }) => {
  const initials = record.nama.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const avatarColor = record.status === 'present' ? theme.colors.success : record.status === 'absent' ? theme.colors.danger : record.status === 'excused' ? theme.colors.excused : theme.colors.warning;
  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: `${avatarColor}20` }]}><Text style={[styles.initials, { color: avatarColor }]}>{initials}</Text></View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View><Text style={styles.name}>{record.nama}</Text><Text style={styles.nim}>ID: {record.nim}</Text></View>
          <StatusBadge status={record.status} />
        </View>
        <View style={styles.details}><Text style={styles.detailText}>⏰ {record.waktu}</Text>{record.lokasi && <Text style={styles.detailText}>📍 {record.lokasi}</Text>}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, padding: theme.spacing.lg, marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm },
  avatar: { width: 50, height: 50, borderRadius: theme.borderRadius.md, justifyContent: 'center', alignItems: 'center', marginRight: theme.spacing.md },
  initials: { fontSize: theme.typography.lg, fontWeight: 'bold' },
  content: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm },
  name: { fontSize: theme.typography.md, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: theme.spacing.xs },
  nim: { fontSize: theme.typography.sm, color: theme.colors.textSecondary },
  details: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md },
  detailText: { fontSize: theme.typography.sm, color: theme.colors.textSecondary },
});