import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../ColorPalette";

export default function DeleteTemplateMain({
  templateId,
  templateName,
  handleDelete,
  handleClose,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Template {templateName}?</Text>
      <Text style={styles.disclaimer}>
        Press and hold to delete. This cannot be undone
      </Text>

      <CustomButton
        title="Delete"
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
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 20,
    color: ColorPalette.dark.error,
    marginBottom: 10,
    textAlign: "center",
  },

  disclaimer: {
    color: ColorPalette.dark.gray500,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 10,
    fontSize: 14,
  },

  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
    width: "90%",
  },
});
