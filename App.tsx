import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Text, View, TouchableOpacity } from 'react-native';
import AppNavigation from 'navigation/app-navigation';

export default function App() {
  return (
    <AppNavigation />
  );
}
