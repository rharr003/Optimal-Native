import CenteredModal from "../CenteredModal";
import { View, StyleSheet, Text } from "react-native";
import CustomButton from "../../ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";
import { useState, useEffect } from "react";
import ExerciseEditModalContent from "./edit/ExerciseEditModalContent";
import FormInput from "../../ui/FormInput";
import ExerciseAddModalContent from "./add/ExerciseAddModalContent";
export default function AddOrEditExerciseModalMain({
  showModal,
  setShowModal,
  onComplete,
  isEditing = false,
  exercise = null,
}) {
  const [name, setName] = useState("");
  const [equipment, setEquipment] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [error, setError] = useState("");

  async function handleAddExercise() {
    if (!name || !equipment || !bodyPart) {
      setError("All fields are required");
      return;
    }
    try {
      await onComplete(name, equipment.toLowerCase(), bodyPart);
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

  function handleChangeEquipment(equipment) {
    setEquipment(equipment);
  }

  function handleChangeBodyPart(bodyPart) {
    setBodyPart(bodyPart);
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
      <Text style={styles.title}>
        {isEditing ? "Edit Exercise" : "Add Exercise"}
      </Text>
      <View style={styles.container}>
        <FormInput
          placeholder={"Example:  Bicep Curl"}
          iconName={"clipboard-outline"}
          handleChange={handleChangeText}
          text={name}
          keyboardType={"default"}
          label={"Name"}
        />
        {error !== "" && <Text style={styles.error}>{error}</Text>}
        {isEditing ? (
          <ExerciseEditModalContent exercise={exercise} />
        ) : (
          <ExerciseAddModalContent
            equipment={equipment}
            handleChangeEquipment={handleChangeEquipment}
            bodyPart={bodyPart}
            handleChangeBodyPart={handleChangeBodyPart}
          />
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isEditing ? "Save" : "Add"}
            iconName={"save-outline"}
            color={ColorPalette.dark.secondary200}
            onPress={handleAddExercise}
            style={styles.button}
          />
          <CustomButton
            title="Go Back"
            color={ColorPalette.dark.gray500}
            iconName={"log-out-outline"}
            onPress={handleClose}
            style={styles.button}
            textColor="#FFFFFF"
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
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "45%",
  },

  error: {
    color: ColorPalette.dark.error,
    fontSize: 16,
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
    marginTop: 10,
  },
});
