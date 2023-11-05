import CenteredModal from "../../../shared/modals/CenteredModal";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
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
      style={{ height: 240 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Delete Exercise</Text>
        <Text style={styles.disclaimer}>
          Are you sure you want to delete{" "}
          <Text style={styles.exerciseInfo}>
            {exercise.name} {exercise.equipment}?
          </Text>
          (This cannot be undone)
        </Text>
        {/* <View style={styles.buttonContainer}> */}
        <CustomButton
          title="Delete (press and hold)"
          onLongPress={handleDelete}
          iconName={"trash-outline"}
          style={styles.buttonStyle}
          color={ColorPalette.dark.error}
          textColor="#000000"
        />
        <CustomButton
          onPress={handleClose}
          title="Go Back"
          iconName="log-out-outline"
          style={styles.buttonStyle}
          color={ColorPalette.dark.gray500}
          textColor="#FFFFFF"
        />
      </View>
      {/* </View> */}
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

  exerciseInfo: {
    fontWeight: "bold",
    opacity: 1,
    color: ColorPalette.dark.error,
  },
  title: {
    fontSize: 20,
    color: ColorPalette.dark.secondary200,
    marginBottom: 10,
    textAlign: "center",
  },

  disclaimer: {
    color: ColorPalette.dark.gray400,
    opacity: 0.7,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 10,
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
