import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusType, AttendanceStatus } from '../types';
import { theme } from '../constants/theme';

interface StatusBadgeProps { status: StatusType | AttendanceStatus; }

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config: Record<string, { label: string; color: string }> = {
    present: { label: 'Present', color: theme.colors.success },
    absent: { label: 'Absent', color: theme.colors.danger },
    excused: { label: 'Excused', color: theme.colors.excused },
    late: { label: 'Late', color: theme.colors.warning },
    Good: { label: 'Good', color: theme.colors.success },
    Warning: { label: 'Warning', color: theme.colors.warning },
    Poor: { label: 'Poor', color: theme.colors.danger },
  };
  const { label, color } = config[status] || { label: String(status), color: theme.colors.textMuted };
  return (
    <View style={[styles.container, { backgroundColor: `${color}20`, borderColor: `${color}40` }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.xs, borderRadius: theme.borderRadius.full, borderWidth: 1, alignSelf: 'flex-start' },
  text: { fontSize: theme.typography.xs, fontWeight: 'bold' },
});