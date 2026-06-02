import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { theme } from './src/constants/theme';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;