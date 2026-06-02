import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { QuickActionButton } from '../components/QuickActionButton';
import { AttendanceChart } from '../components/AttendanceChart';
import { getDashboardStats, getRecentActivities, getAllMahasiswa } from '../services/api';
import { DashboardStats, RecentActivity, Mahasiswa } from '../types';
import { theme } from '../constants/theme';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [students, setStudents] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [statsData, activitiesData, studentsData] = await Promise.all([
        getDashboardStats(),
        getRecentActivities(),
        getAllMahasiswa(),
      ]);
      setStats(statsData);
      setActivities(activitiesData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.totalMahasiswa || 0}</Text>
          <Text style={styles.statLabel}>Total Students</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.totalRecords || 0}</Text>
          <Text style={styles.statLabel}>Total Records</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.avgAttendance || 0}%</Text>
          <Text style={styles.statLabel}>Avg Attendance</Text>
          <Text style={styles.statGood}>Good</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <QuickActionButton
            icon="➕"
            label="Add Attendance"
            color={theme.colors.success}
            onPress={() => navigation.navigate('Add')}
          />
          <QuickActionButton
            icon="🔍"
            label="Search"
            color={theme.colors.primary}
            onPress={() => navigation.navigate('Search')}
          />
          <QuickActionButton
            icon="📊"
            label="View Stats"
            color={theme.colors.warning}
            onPress={() => navigation.navigate('Statistics')}
          />
        </View>
      </View>

      <AttendanceChart data={students} />

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.xxl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.sm,
    color: theme.colors.textSecondary,
  },
  statGood: {
    fontSize: theme.typography.xs,
    color: theme.colors.success,
    marginTop: theme.spacing.xs,
  },
  quickActions: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.lg,
  },
  recentActivity: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xxxxl,
  },
  activityItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  activityTitle: {
    fontSize: theme.typography.base,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  activityTime: {
    fontSize: theme.typography.xs,
    color: theme.colors.textMuted,
  },
});