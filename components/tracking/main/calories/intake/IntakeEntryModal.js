import CenteredModal from "../../../../shared/modals/CenteredModal";
import CustomButton from "../../../../shared/ui/CustomButton";
import { setCurrentIntake as dbSetIntake } from "../../../../../util/sqlite/db";
import { StyleSheet, View, TextInput } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentIntake as setCurrentIntakeRedux } from "../../../../../util/redux/slices/userData";

export default function IntakeEntryModal({ showModal, setShowModal }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleChange(text) {
    setText(text);
  }

  async function handleSave() {
    if (!text) {
      handleClose();
      return;
    }
    await dbSetIntake(parseFloat(text));
    dispatch(setCurrentIntakeRedux(parseFloat(text)));
    setText("");
    setShowModal(false);
  }

  function handleClose() {
    setText("");
    setShowModal(false);
  }

  return (
    <CenteredModal
      showModal={showModal}
      handleClose={handleClose}
      style={{ height: 200 }}
    >
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Intake"
          placeholderTextColor={ColorPalette.dark.gray600}
          onChangeText={handleChange}
          keyboardType="numeric"
          value={text}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Save"
            color={ColorPalette.dark.secondary200}
            onPress={handleSave}
            style={styles.customButtonStyle}
          />

          <CustomButton
            title="Cancel"
            color={ColorPalette.dark.gray500}
            onPress={handleClose}
            style={styles.customButtonStyle}
          />
        </View>
      </View>
    </CenteredModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    paddingVertical: 20,
  },

  input: {
    width: "95%",
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 15,
    padding: 5,
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

  customButtonStyle: { width: "45%" },
});
