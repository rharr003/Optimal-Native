import { View, StyleSheet, TextInput, Text } from "react-native";
import ModalButtons from "./ModalButtons";
import { ColorPalette } from "../../../../../../ColorPalette";
import { useState } from "react";
import {
  updateTemplateName,
  deleteTemplate,
} from "../../../../../../util/sqlite/db";
import { deleteTemplate as deleteTemplateRedux } from "../../../../../../util/redux/slices/templates";
import { useDispatch } from "react-redux";
import { renameTemplate } from "../../../../../../util/redux/slices/templates";
import FormInput from "../../../../../shared/ui/FormInput";

export default function ChangeNameMain({
  templateId,
  handleClose,
  templateName,
  openDeleteModal,
}) {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(templateName);

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
      <View>
        <Text style={styles.title}>Edit Template</Text>
        <FormInput
          iconName={"reader-outline"}
          handleChange={handleChangeText}
          text={newName}
          keyboardType="default"
          label={"Name"}
          maxLength={18}
        />
      </View>
      <ModalButtons
        handleSave={handleSave}
        handleClose={handleClose}
        openDeleteModal={openDeleteModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 10,
    flex: 1,
    width: "100%",
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
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
