import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * StyleSheet - класс для создания определенных стилистик
 * View - аналог <div>
 */

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
