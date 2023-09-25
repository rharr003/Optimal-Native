import CenteredModal from "../shared/CenteredModal";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../shared/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../ColorPalette";

export default function DeleteModal({
  showModal,
  setShowModal,
  exercise,
  onDelete,
}) {
  function handleClose() {
    setShowModal(false);
  }

  function handleDelete() {
    setShowModal(false);
    onDelete();
  }
  return (
    <CenteredModal
      showModal={showModal}
      setShowModal={setShowModal}
      handleClose={handleClose}
      style={{ height: 200 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Are you sure you want to delete {exercise.name} ({exercise.equipment}
          )?
        </Text>
        <Text style={styles.italic}>(This cannot be undone)</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Delete"
            color={ColorPalette.dark.error}
            onPress={handleDelete}
            style={styles.button}
          />
          <CustomButton
            title="Cancel"
            color={ColorPalette.dark.gray500}
            onPress={handleClose}
            style={styles.button}
          />
        </View>
      </View>
    </CenteredModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    color: ColorPalette.dark.gray100,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: ColorPalette.dark.gray100,
    fontSize: 18,
    textAlign: "center",
  },

  italic: {
    fontStyle: "italic",
    fontSize: 16,
    color: ColorPalette.dark.error,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "45%",
  },
});
