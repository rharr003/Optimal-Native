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
          title="Go Back"
          iconName={"exit-outline"}
          color={ColorPalette.dark.gray500}
          textColor="#FFFFFF"
          style={styles.button}
          onPress={handleClose}
        />
      </View>
      <CustomButton
        title={"Delete"}
        textColor={ColorPalette.dark.error}
        style={styles.delete}
        onPress={openDeleteModal}
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
  },

  button: {
    width: "45%",
    marginHorizontal: 0,
    paddingVertical: 4,
  },

  delete: {
    margin: 0,
  },
});
