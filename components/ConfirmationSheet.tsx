import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  StyleProp,
  TextStyle,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Colors = {
  background: '#212121',
  backgroundHighlight: '#323232',
  text: '#ffffff',
  textSecondary: '#818181',
};

export type ConfirmationSheetProps = {
  children: React.ReactElement<PressableProps & React.RefAttributes<View>>;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  options?: {
    descriptionStyle?: StyleProp<TextStyle>;
    confirmText?: string;
    confirmTextStyle?: StyleProp<TextStyle>;
    cancelText?: string;
    cancelTextStyle?: StyleProp<TextStyle>;
  };
};

export default function ConfirmationSheet(props: Readonly<ConfirmationSheetProps>) {
  const [modalVisible, setModalVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const triggerElement = React.cloneElement(props.children, {
    onPress: (e: GestureResponderEvent) => {
      setModalVisible(true);
      if (props.children.props.onPress) props.children.props.onPress(e);
    },
  });

  function handleConfirm() {
    if (props.onConfirm) props.onConfirm();
    setModalVisible(false);
  }

  function handleCancel() {
    if (props.onCancel) props.onCancel();
    setModalVisible(false);
  }

  return (
    <>
      {triggerElement}
      {modalVisible && (
        <Animated.View style={styles.modalRoot}>
          <Animated.View
            style={styles.modalBackdrop}
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}>
            <Pressable
              onPress={handleCancel}
              style={{
                flex: 1,
              }}
            />
          </Animated.View>
          <Animated.View
            style={[styles.modalContent, { marginBottom: bottom }]}
            entering={SlideInDown.duration(200)}
            exiting={SlideOutDown.duration(200)}>
            <View
              style={{
                marginBottom: 5,
                backgroundColor: Colors.background,
                borderRadius: 14,
                overflow: 'hidden',
              }}>
              <Text style={[styles.description, props.options?.descriptionStyle]}>
                {props.description}
              </Text>
              <View style={styles.seperator} />
              <Pressable
                style={({ pressed }) => [
                  styles.confirmButtonContainer,
                  pressed && { backgroundColor: Colors.backgroundHighlight },
                ]}
                onPress={handleConfirm}>
                <Text style={[styles.confirmButtonText, props.options?.confirmTextStyle]}>
                  {props.options?.confirmText ?? 'Confirm'}
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.cancelButtonContainer,
                pressed && { backgroundColor: Colors.backgroundHighlight },
              ]}
              onPress={handleCancel}>
              <Text style={[styles.cancelButtonText, props.options?.cancelTextStyle]}>
                {props.options?.cancelText ?? 'Cancel'}
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 900,
  },
  modalContent: {
    zIndex: 1050,
    marginTop: 'auto',
    width: '100%',
    paddingHorizontal: 10,
  },
  description: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: Colors.textSecondary,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seperator: {
    height: 1,
    backgroundColor: Colors.backgroundHighlight,
  },
  confirmButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  confirmButtonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonContainer: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});
