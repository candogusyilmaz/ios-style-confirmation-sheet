import ConfirmationSheet from 'components/ConfirmationSheet';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ConfirmationSheet description="This action cannot be undone.">
          <Pressable onPress={() => console.log('abc')}>
            <Text>Open modal</Text>
          </Pressable>
        </ConfirmationSheet>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
