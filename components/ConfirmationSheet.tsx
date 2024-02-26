import Colors from 'Colors';
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
  Modal,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Theme = {
  background: Colors.Slate900,
  backgroundHighlight: Colors.Slate800,
  text: Colors.Gray50,
  textSecondary: Colors.Gray300,
};

export type ConfirmationSheetProps = {
  children: React.ReactElement<PressableProps & React.RefAttributes<View>>;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onExitAnimationEnd?: () => void;
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
  const [contentVisible, setContentVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const triggerElement = React.cloneElement(props.children, {
    onPress: (e: GestureResponderEvent) => {
      setModalVisible(true);
      setContentVisible(true);
      if (props.children.props.onPress) props.children.props.onPress(e);
    },
  });

  const onExitAnimationEnd = props.onExitAnimationEnd;

  function handleConfirm() {
    if (props.onConfirm) props.onConfirm();
    setContentVisible(false);
  }

  function handleCancel() {
    if (props.onCancel) props.onCancel();
    setContentVisible(false);
  }

  return (
    <>
      {triggerElement}
      <Modal transparent visible={modalVisible}>
        {contentVisible && (
          <Animated.View style={styles.root}>
            <Animated.View
              style={styles.backdrop}
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
              style={[styles.content, { marginBottom: bottom }]}
              entering={SlideInDown.duration(200)}
              exiting={SlideOutDown.duration(200).withCallback((finished) => {
                if (finished) {
                  if (onExitAnimationEnd) runOnJS(onExitAnimationEnd)();
                  runOnJS(setModalVisible)(false);
                }
              })}>
              <View
                style={{
                  marginBottom: 5,
                  backgroundColor: Theme.background,
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
                    pressed && { backgroundColor: Theme.backgroundHighlight },
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
                  pressed && { backgroundColor: Theme.backgroundHighlight },
                ]}
                onPress={handleCancel}>
                <Text style={[styles.cancelButtonText, props.options?.cancelTextStyle]}>
                  {props.options?.cancelText ?? 'Cancel'}
                </Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 900,
  },
  content: {
    zIndex: 1050,
    marginTop: 'auto',
    width: '100%',
    paddingHorizontal: 10,
  },
  description: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: Theme.textSecondary,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seperator: {
    height: 1,
    backgroundColor: Theme.backgroundHighlight,
  },
  confirmButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  confirmButtonText: {
    color: Theme.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonContainer: {
    backgroundColor: Theme.background,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  cancelButtonText: {
    color: Theme.textSecondary,
    fontSize: 16,
  },
});
