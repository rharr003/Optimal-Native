import CenteredModal from "../../../../shared/modals/CenteredModal";
import CustomButton from "../../../../shared/ui/CustomButton";
import { setCurrentIntake as dbSetIntake } from "../../../../../util/sqlite/db";
import { StyleSheet, View } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentIntake as setCurrentIntakeRedux,
  updatePacing,
} from "../../../../../util/redux/slices/userData";
import FormInput from "../../../../shared/ui/FormInput";

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
    try {
      await dbSetIntake(parseFloat(text));
      dispatch(setCurrentIntakeRedux(parseFloat(text)));
      dispatch(updatePacing());
    } catch (e) {
      console.log(e);
    }
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
      style={{ height: 170 }}
    >
      <View style={styles.modalContainer}>
        <FormInput
          placeholder={"Example:  2000"}
          iconName={"restaurant-outline"}
          handleChange={handleChange}
          text={text}
          label={"Current Intake: (kCal)"}
          maxLength={5}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Save"
            iconName={"save-outline"}
            color={ColorPalette.dark.secondary200}
            onPress={handleSave}
            style={styles.customButtonStyle}
          />

          <CustomButton
            title="Cancel"
            iconName={"exit-outline"}
            color={ColorPalette.dark.gray500}
            textColor="#FFFFFF"
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

  fakeInput: {
    width: "100%",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 25,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },

  formGroup: {
    width: "90%",
  },

  label: {
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
    marginBottom: 5,
  },

  input: {
    width: "100%",
    fontSize: 18,
    marginLeft: 5,
    color: ColorPalette.dark.secondary200,
  },

  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  customButtonStyle: {
    width: "45%",
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
