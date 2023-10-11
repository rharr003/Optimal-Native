import { View, StyleSheet, TextInput } from "react-native";
import ModalButtons from "./ModalButtons";
import { ColorPalette } from "../../../../../../ColorPalette";
import { useState } from "react";
import { updateTemplateName } from "../../../../../../util/sqlite/db";
import { useDispatch } from "react-redux";
import { renameTemplate } from "../../../../../../util/redux/slices/templates";

export default function ChangeNameMain({ templateId, handleClose }) {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");

  function handleChangeText(text) {
    setNewName(text);
  }

  async function handleSave() {
    if (newName !== "") {
      await updateTemplateName(templateId, newName);
      dispatch(renameTemplate({ id: templateId, name: newName }));
    }
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
      <ModalButtons handleSave={handleSave} handleClose={handleClose} />
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
