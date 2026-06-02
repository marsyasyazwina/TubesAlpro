import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';

interface QuickActionButtonProps { icon: string; label: string; color: string; onPress: () => void; }

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, { backgroundColor: `${color}10` }]}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}><Text style={[styles.icon, { color }]}>{icon}</Text></View>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, minWidth: 100, borderWidth: 1, borderColor: theme.colors.border },
  iconContainer: { width: 50, height: 50, borderRadius: theme.borderRadius.md, justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing.sm },
  icon: { fontSize: 28 },
  label: { fontSize: theme.typography.sm, fontWeight: '600' },
});