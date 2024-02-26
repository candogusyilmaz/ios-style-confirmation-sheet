import Colors from 'Colors';
import ConfirmationSheet from 'components/ConfirmationSheet';
import Toast from 'components/Toast';
import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Toast type="success" text="null" />
        <ConfirmationSheet
          description="This action cannot be undone."
          onExitAnimationEnd={() => console.log('exited')}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Slate700,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}>
            <Text style={{ color: Colors.Slate200 }}>Open modal</Text>
          </TouchableOpacity>
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
    padding: 20,
    gap: 20,
  },
});
