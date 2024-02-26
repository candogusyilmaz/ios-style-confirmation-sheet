import { Ionicons } from '@expo/vector-icons';
import Colors from 'Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ToastType = 'success' | 'error' | 'info' | 'warning';
type ToastProps = {
  type: ToastType;
  text: string;
};

export default function Toast(props: Readonly<ToastProps>) {
  return (
    <View
      style={[
        styles.root,
        {
          borderColor: getIconColor(props.type),
        },
      ]}>
      <Ionicons name={getIconName(props.type)} size={24} color={getIconColor(props.type)} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

function getIconName(name: ToastType) {
  switch (name) {
    case 'success':
      return 'checkmark-circle';
    case 'warning':
      return 'warning';
    case 'info':
      return 'information-circle';
    case 'error':
      return 'alert-circle';
  }
}

function getIconColor(name: ToastType) {
  switch (name) {
    case 'success':
      return Colors.Green400;
    case 'warning':
      return Colors.Yellow400;
    case 'info':
      return Colors.Cyan400;
    case 'error':
      return Colors.Red400;
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 53,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Slate800,
    backgroundColor: Colors.Slate700,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: `row`,
    gap: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  text: {
    fontWeight: `500`,
    color: Colors.Gray50,
  },
});
