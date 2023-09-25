import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import { BlurView } from "expo-blur";
import ManageExerciseModalStack from "./ManageExerciseModalStack";
import ManageExerciseModalMainMenu from "./ManageExerciseModalMainMenu";

export default function ManageExerciseModal({
  showModal,
  setShowModal,
  exercise,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        blurBackground={true}
      >
        <Pressable style={{ flex: 1 }} onPress={(e) => setShowModal(false)}>
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
              <Pressable
                style={[
                  styles.container,
                  {
                    width: "75%",
                    height: "40%",
                    backgroundColor: "blue",
                  },
                ]}
              >
                <ManageExerciseModalMainMenu />
              </Pressable>
            </View>
          </BlurView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: ColorPalette.dark.gray700,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
