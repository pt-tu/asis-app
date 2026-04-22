import React from 'react';
import {
  Modal,
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomModalStore } from '@/store/useBottomModalStore';

/**
 * Single global bottom sheet modal rendered once in the root layout.
 * Any screen pushes content into it via `useBottomModalStore().openModal(node)`.
 *
 * Design:
 * - Claymorphism: warm beige/cream background, large top border-radius
 * - Auto-height: sheet sizes itself to its children, never fixed
 * - Safe-area: adds bottom inset padding so content is not behind Home Indicator
 * - Backdrop: semi-transparent dark overlay, tap-to-dismiss
 * - Back-press: onRequestClose dismiss on Android
 */
export function GlobalBottomModal() {
  const { isOpen, content, closeModal } = useBottomModalStore();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={closeModal}
    >
      <View style={styles.wrapper}>
        {/* Backdrop — separated sibling, tap outside sheet to close */}
        <Pressable style={styles.backdrop} onPress={closeModal} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          pointerEvents="box-none"
        >
          {/* Sheet */}
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
            {/* Drag handle */}
            <View style={styles.handle} />
            {content}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  keyboardView: {
    // flex: 0 keeps the sheet at content height (not full-screen)
    flex: 0,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#F5F2EB', // Claymorphism warm cream
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 24,
    // Shadow for clay depth
    shadowColor: '#3b2b20',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D4C9B8',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
