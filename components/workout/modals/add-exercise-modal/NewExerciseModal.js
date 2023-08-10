import CenteredModal from "../../../ui/CenteredModal";
import { View, StyleSheet, Text, TextInput, Keyboard } from "react-native";
import CustomButton from "../../../ui/CustomButton";
import { ColorPalette } from "../../../ui/ColorPalette";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { insertExercise } from "../../../../util/db";

const equipmentOptions = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Cable",
  "Bodyweight",
  "Static",
];

const bodyPartOptions = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Abs",
  "Legs",
];
export default NewExerciseModal = ({
  showModal,
  setShowModal,
  setExercises,
  setSelectedExercises,
}) => {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");

  async function handleAddExercise() {
    if (name === "" || equipment === "" || bodyPart === "") return;
    try {
      const letter = name[0].toUpperCase();
      const exercise = await insertExercise(name.trim(), equipment, bodyPart);
      setExercises((prevExercises) => {
        let newExercises = [];
        if (prevExercises.New) {
          newExercises = [
            ...prevExercises.New,
            { ...exercise, defaultSelected: true },
          ];
          // need to delete the New property from prevExercises so that the current value for New is not overwritten
          delete prevExercises.New;
        } else {
          newExercises = [{ ...exercise, defaultSelected: true }];
        }
        return {
          New: newExercises.sort((a, b) => a.name.localeCompare(b.name)),
          ...prevExercises,
        };
      });

      setSelectedExercises((prevSelectedExercises) => {
        return [
          ...prevSelectedExercises,
          { ...exercise, reactId: exercise.id + Date.now() },
        ];
      });
      setName("");
      setEquipment("");
      setBodyPart("");
      setError("");
      setShowModal(false);
    } catch (err) {
      setError(`Exercise "${name} - (${equipment})" already exists`);
    }
  }

  function handleClose() {
    setName("");
    setEquipment("");
    setBodyPart("");
    setError("");
    setShowModal(false);
  }

  function handleChangeText(text) {
    setName(text);
    if (error !== "") {
      setError("");
    }
  }

  return (
    <CenteredModal showModal={showModal} handleClose={handleClose}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={ColorPalette.dark.gray500}
          inputAccessoryViewID="exerciseInputAccessory"
          autoCorrect={false}
          onChangeText={handleChangeText}
          returnKeyLabel="Done"
          returnKeyType="done"
          value={name}
        />
        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <View>
          <Text style={styles.selectLabel}>Equipment</Text>
          <SelectDropdown
            data={equipmentOptions}
            onSelect={(selectedItem, index) => {
              setEquipment(selectedItem);
            }}
            defaultButtonText={"Select Equipment"}
            buttonStyle={styles.dropDownButtonStyle}
            buttonTextStyle={styles.dropDownButtonTextStyle}
            dropdownStyle={styles.dropDownStyle}
            rowTextStyle={styles.rowTextStyle}
            showsVerticalScrollIndicator={false}
            onFocus={() => Keyboard.dismiss()}
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down-outline" size={24} color="#FFFFFF" />
            )}
          />
        </View>
        <View>
          <Text style={styles.selectLabel}>Body Part</Text>
          <SelectDropdown
            data={bodyPartOptions}
            onSelect={(selectedItem, index) => {
              setBodyPart(selectedItem);
            }}
            defaultButtonText={"Select Body Part"}
            buttonStyle={styles.dropDownButtonStyle}
            buttonTextStyle={styles.dropDownButtonTextStyle}
            dropdownStyle={styles.dropDownStyle}
            rowTextStyle={styles.rowTextStyle}
            showsVerticalScrollIndicator={false}
            onFocus={() => Keyboard.dismiss()}
            renderDropdownIcon={() => (
              <Ionicons name="chevron-down-outline" size={24} color="#FFFFFF" />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Add"
            color={ColorPalette.dark.secondary200}
            onPress={handleAddExercise}
            style={styles.button}
          />
          <CustomButton
            title="Cancel"
            color={ColorPalette.dark.error}
            onPress={handleClose}
            style={styles.button}
          />
        </View>
      </View>
    </CenteredModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: ColorPalette.dark.gray100,
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "45%",
  },

  dropDownButtonStyle: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 15,
    padding: 0,
    width: "90%",
    marginTop: 10,
  },

  dropDownStyle: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 15,
  },

  dropDownButtonTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  rowTextStyle: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  selectLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "left",
  },

  input: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 15,
    padding: 10,
    width: "90%",
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },

  error: {
    color: ColorPalette.dark.error,
    fontSize: 16,
    textAlign: "center",
  },
});
