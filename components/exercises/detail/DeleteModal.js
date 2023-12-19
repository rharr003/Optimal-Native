import CenteredModal from "../../shared/modals/CenteredModal";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../shared/ui/CustomButton";
import { ColorPalette } from "../../../ColorPalette";
import * as Haptics from "expo-haptics";

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowModal(false);
    onDelete();
  }
  return (
    <CenteredModal
      showModal={showModal}
      setShowModal={setShowModal}
      handleClose={handleClose}
      style={{ height: 230 }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Are you sure you want to delete?</Text>
          <Text style={[styles.disclaimer, styles.exerciseInfo]}>
            {exercise.name} ({exercise.equipment})
          </Text>
          <Text style={styles.disclaimer}>(this cannot be undone)</Text>
        </View>
        <CustomButton
          title="Delete (press and hold)"
          testId="delete-modal-button"
          onLongPress={handleDelete}
          iconName={"trash-outline"}
          style={styles.buttonStyle}
          color={ColorPalette.dark.error}
          textColor="#000000"
        />
        <CustomButton
          onPress={handleClose}
          title="Go Back"
          testId="delete-modal-close-button"
          iconName="log-out-outline"
          style={styles.buttonStyle}
          color={ColorPalette.dark.gray500}
          textColor="#FFFFFF"
        />
      </View>
    </CenteredModal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
    alignItems: "center",
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  exerciseInfo: {
    fontWeight: "bold",
    marginBottom: 10,
    opacity: 1,
    color: ColorPalette.dark.secondary200,
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
    opacity: 0.7,
    textAlign: "center",
  },

  disclaimer: {
    color: ColorPalette.dark.gray300,
    opacity: 0.7,
    fontStyle: "italic",
    textAlign: "center",

    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "45%",
  },
  buttonStyle: {
    margin: 0,
    marginVertical: 5,
    paddingVertical: 3,
    width: "90%",
  },
});
