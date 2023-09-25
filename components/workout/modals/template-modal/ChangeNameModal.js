import { View, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../../shared/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
import { useState } from "react";
import { updateTemplateName } from "../../../../util/sqlite/db";

export default function ChangeNameModal({
  workoutId,
  handleClose,
  setTemplates,
}) {
  const [newName, setNewName] = useState("");

  function handleChangeText(text) {
    setNewName(text);
  }

  async function handleSave() {
    await updateTemplateName(workoutId, newName);
    setTemplates((prev) =>
      prev.map((template) => {
        if (template.id === workoutId) {
          return { ...template, name: newName };
        }
        return template;
      })
    );

    handleClose();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newName}
        placeholder="Enter new name"
        placeholderTextColor={ColorPalette.dark.gray500}
        onChangeText={handleChangeText}
        maxLength={24}
        returnKeyType="done"
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Save"
          color={ColorPalette.dark.secondary200}
          textColor="#FFFFFF"
          style={{ width: "45%" }}
          onPress={handleSave}
        />
        <CustomButton
          title="Cancel"
          color={ColorPalette.dark.gray500}
          textColor="#FFFFFF"
          style={{ width: "45%" }}
          onPress={handleClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorPalette.dark.gray700,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },
  input: {
    width: "95%",
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 10,
    padding: 10,
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
