import { Modal, StyleSheet, View, Pressable } from "react-native";
import { ColorPalette } from "../ui/ColorPalette";
import { BlurView } from "expo-blur";
import RestTimer from "../workout/main/RestTimer";
import { useSelector, useDispatch } from "react-redux";
import { stopRestTimer } from "../../util/workout";

export default function RestTimerModal() {
  const showModal = useSelector((state) => state.workout.restTimerActive);
  const dispatch = useDispatch();
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      blurBackground={true}
    >
      <Pressable style={{ flex: 1 }} onPress={(e) => dispatch(stopRestTimer())}>
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
            <Pressable style={[styles.container]}>
              <RestTimer />
            </Pressable>
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
    backgroundColor: ColorPalette.dark.gray800,
    position: "absolute",
    borderRadius: 20,
    padding: 35,
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
