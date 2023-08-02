import { Modal, StyleSheet, View, Pressable } from "react-native";
import { ColorPalette } from "./ColorPalette";
import { BlurView } from "expo-blur";

export default function CenteredModal({ children, handleClose, showModal }) {
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      blurBackground={true}
    >
      <Pressable style={{ flex: 1 }} onPress={handleClose}>
        <BlurView
          intensity={8}
          style={{
            flex: 1,
          }}
          tint="dark"
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Pressable style={[styles.container]}>{children}</Pressable>
          </View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "40%",
    backgroundColor: ColorPalette.dark.gray600,
    position: "absolute",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
