import PickerInput from "../../../ui/PickerInput";
import { ColorPalette } from "../../../../../ColorPalette";

export default function ExerciseEditModalContent({ exercise }) {
  const equipment =
    exercise.equipment.split("")[0].toUpperCase() + exercise.equipment.slice(1);
  function locked() {
    return;
  }
  return (
    <>
      <PickerInput
        value={equipment}
        iconName={"lock-closed-outline"}
        handleChange={locked}
        label={"Equipment"}
        pickerOptions={[]}
        pickerStyle={{}}
        disabled={true}
        textColor={ColorPalette.dark.gray500}
      />
      <PickerInput
        value={exercise.muscleGroup}
        iconName={"lock-closed-outline"}
        handleChange={locked}
        label={"Muscle Group"}
        pickerOptions={[]}
        pickerStyle={{}}
        disabled={true}
        textColor={ColorPalette.dark.gray500}
      />
    </>
  );
}
