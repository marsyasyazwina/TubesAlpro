import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addAbsensi } from '../services/api';
import { StatusType } from '../types';
import { theme } from '../constants/theme';

export const AddAttendanceScreen: React.FC = () => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [tanggal, setTanggal] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState<StatusType>('present');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nim || !nama) {
      Alert.alert('Error', 'Please fill in Student Name and ID');
      return;
    }

    setLoading(true);
    try {
      const waktu = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      await addAbsensi({
        mahasiswaId: nim,
        nama: nama,
        nim: nim,
        tanggal: tanggal.toISOString().split('T')[0],
        status: status,
        waktu: waktu,
        lokasi: 'Main Campus',
      });

      Alert.alert('Success', 'Attendance recorded successfully!');
      setNim('');
      setNama('');
      setStatus('present');
    } catch (error) {
      Alert.alert('Error', 'Failed to record attendance');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTanggal(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Attendance</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Attendance Manager</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Student Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Select a student"
            placeholderTextColor={theme.colors.textMuted}
            value={nama}
            onChangeText={setNama}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter ID"
            placeholderTextColor={theme.colors.textMuted}
            value={nim}
            onChangeText={setNim}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {tanggal.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={tanggal}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[styles.statusButton, status === 'present' && styles.activeStatus]}
              onPress={() => setStatus('present')}
            >
              <Text style={[styles.statusText, status === 'present' && styles.activeStatusText]}>
                Present
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, status === 'absent' && styles.activeStatusAbsent]}
              onPress={() => setStatus('absent')}
            >
              <Text style={[styles.statusText, status === 'absent' && styles.activeStatusText]}>
                Absent
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={theme.colors.textPrimary} />
          ) : (
            <Text style={styles.submitText}>Submit Attendance</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  formContainer: {
    padding: theme.spacing.xl,
  },
  formTitle: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: theme.spacing.xl,
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
  dateButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dateText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.base,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statusButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
  },
  activeStatus: {
    backgroundColor: `${theme.colors.success}20`,
    borderColor: theme.colors.success,
  },
  activeStatusAbsent: {
    backgroundColor: `${theme.colors.danger}20`,
    borderColor: theme.colors.danger,
  },
  statusText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.base,
  },
  activeStatusText: {
    color: theme.colors.textPrimary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  submitText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.md,
    fontWeight: 'bold',
  },
});