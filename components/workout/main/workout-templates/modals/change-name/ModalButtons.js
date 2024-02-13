import { View, StyleSheet } from "react-native";
import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function ModalButtons({
  handleSave,
  handleClose,
  openDeleteModal,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomButton
          title="Save"
          color={ColorPalette.dark.secondary200}
          iconName={"save-outline"}
          textColor="#000000"
          style={styles.button}
          onPress={handleSave}
        />
        <CustomButton
          title={"Delete"}
          textColor={"#000000"}
          iconName={"trash-outline"}
          color={ColorPalette.dark.error}
          style={styles.button}
          onPress={openDeleteModal}
        />
      </View>
      <CustomButton
        title="Go Back"
        iconName={"exit-outline"}
        color={ColorPalette.dark.gray600}
        textColor="#FFFFFF"
        style={styles.bigButton}
        onPress={handleClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },

  button: {
    width: "47%",
    marginHorizontal: 0,
    marginVertical: 5,
    paddingVertical: 4,
  },

  bigButton: {
    width: "100%",
    margin: 0,
    paddingVertical: 4,
    marginBottom: 5,
  },

  delete: {
    margin: 0,
  },
});
