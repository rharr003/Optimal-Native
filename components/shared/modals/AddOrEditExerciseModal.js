import CenteredModal from "./CenteredModal";
import { View, StyleSheet, Text, TextInput, Keyboard } from "react-native";
import CustomButton from "../ui/CustomButton";
import { ColorPalette } from "../../../ColorPalette";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import ExerciseEditModalContent from "../../exercises/ExerciseEditModalContent";

const equipmentOptions = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Cable",
  "Body",
  "Static",
  "Other",
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
export default function AddOrEditExerciseModal({
  showModal,
  setShowModal,
  onComplete,
  setExercises = null,
  isEditing = false,
  exercise = null,
}) {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");
  async function handleAddExercise() {
    try {
      if (setExercises) {
        await onComplete(name, equipment.toLowerCase(), bodyPart, setExercises);
      } else {
        await onComplete(name, equipment.toLowerCase(), bodyPart);
      }
      if (!isEditing) {
        setName("");
        setEquipment("");
        setBodyPart("");
      }
      setError("");
      setShowModal(false);
    } catch (err) {
      setError(`"${name} (${equipment})" already exists`);
    }
  }

  function handleClose() {
    if (!isEditing) {
      setName("");
      setEquipment("");
      setBodyPart("");
    }
    setError("");

    setShowModal(false);
  }

  function handleChangeText(text) {
    setName(text);
    if (error !== "") {
      setError("");
    }
  }

  useEffect(() => {
    if (isEditing) {
      setName(exercise.name);
      setEquipment(
        exercise.equipment[0].toUpperCase() + exercise.equipment.slice(1)
      );
      setBodyPart(
        exercise.muscleGroup[0].toUpperCase() + exercise.muscleGroup.slice(1)
      );
    }
  }, []);

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
        {!isEditing && (
          <>
            <View>
              <Text style={styles.selectLabel}>Equipment</Text>
              <SelectDropdown
                data={equipmentOptions}
                onSelect={(selectedItem, index) => {
                  setEquipment(selectedItem);
                }}
                defaultButtonText={"Select Equipment"}
                defaultValue={equipment}
                disabled={isEditing}
                buttonStyle={[
                  styles.dropDownButtonStyle,
                  isEditing && styles.dropDownButtonStyleDisabled,
                ]}
                buttonTextStyle={styles.dropDownButtonTextStyle}
                dropdownStyle={styles.dropDownStyle}
                rowTextStyle={styles.rowTextStyle}
                showsVerticalScrollIndicator={false}
                onFocus={() => Keyboard.dismiss()}
                renderDropdownIcon={() => (
                  <Ionicons
                    name={
                      isEditing ? "lock-closed-outline" : "chevron-down-outline"
                    }
                    size={24}
                    color="#FFFFFF"
                  />
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
                defaultValue={bodyPart}
                disabled={isEditing}
                buttonStyle={[
                  styles.dropDownButtonStyle,
                  isEditing && styles.dropDownButtonStyleDisabled,
                ]}
                buttonTextStyle={styles.dropDownButtonTextStyle}
                dropdownStyle={styles.dropDownStyle}
                rowTextStyle={styles.rowTextStyle}
                showsVerticalScrollIndicator={false}
                onFocus={() => Keyboard.dismiss()}
                renderDropdownIcon={() => (
                  <Ionicons
                    name={
                      isEditing ? "lock-closed-outline" : "chevron-down-outline"
                    }
                    size={24}
                    color="#FFFFFF"
                  />
                )}
              />
            </View>
          </>
        )}
        {isEditing && <ExerciseEditModalContent exercise={exercise} />}

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isEditing ? "Save" : "Add"}
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
}

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
  },
  bold: {
    fontWeight: "bold",
  },

  textSmall: {
    fontSize: 16,
    color: ColorPalette.dark.gray400,
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

  dropDownButtonStyleDisabled: {
    opacity: 0.5,
  },

  dropDownStyle: {
    backgroundColor: ColorPalette.dark.gray800,
    borderRadius: 15,
    height: 200,
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
