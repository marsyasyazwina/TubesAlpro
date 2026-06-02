import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Mahasiswa } from '../types';
import { theme } from '../constants/theme';

interface AttendanceChartProps { data: Mahasiswa[]; }

export const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const maxWidth = Dimensions.get('window').width - theme.spacing.xxxxl * 2;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Rate per Student</Text>
      {data.slice(0, 8).map((student, index) => {
        const animatedWidth = useRef(new Animated.Value(0)).current;
        useEffect(() => { Animated.timing(animatedWidth, { toValue: (student.attendanceRate / 100) * maxWidth, duration: 600, delay: index * 80, useNativeDriver: false }).start(); }, []);
        return (
          <View key={student.id} style={styles.barRow}>
            <Text style={styles.studentInitial}>S{index + 1}</Text>
            <View style={styles.barWrapper}><Animated.View style={[styles.bar, { width: animatedWidth, backgroundColor: student.attendanceRate >= 80 ? theme.colors.success : student.attendanceRate >= 60 ? theme.colors.warning : theme.colors.danger }]} /></View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg, padding: theme.spacing.xl, margin: theme.spacing.lg },
  title: { fontSize: theme.typography.md, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: theme.spacing.lg },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.md },
  studentInitial: { fontSize: theme.typography.sm, color: theme.colors.textSecondary, width: 30 },
  barWrapper: { flex: 1, height: 24, backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.borderRadius.sm, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: theme.borderRadius.sm },
});