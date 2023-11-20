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
      <Text style={styles.title}>Are you sure you want to delete?</Text>
      <Text style={styles.templateName}>{templateName}</Text>
      <Text style={styles.disclaimer}>(This cannot be undone)</Text>

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
    color: "#FFFFFF",
    marginBottom: 10,
    opacity: 0.7,
    textAlign: "center",
  },

  templateName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    opacity: 1,
    color: ColorPalette.dark.secondary200,
  },

  disclaimer: {
    color: ColorPalette.dark.gray300,
    opacity: 0.7,
    fontStyle: "italic",
    textAlign: "center",

    fontSize: 18,
  },

  buttonStyle: {
    margin: 0,
    paddingVertical: 3,
    width: "90%",
  },
});
