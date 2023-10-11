import Item from "./Item";
import { ColorPalette } from "../../../../../../../ColorPalette";
import { formatTime } from "../../../../../../../util/formatTime";

export default function ItemList({
  setShowPicker,
  handleToggleUnit,
  handleRemove,
  toggleExerciseModal,
  unit,
  exercise,
}) {
  function togglePicker() {
    setShowPicker((prev) => !prev);
  }
  return (
    <>
      <Item
        title="Replace Exercise"
        icon={"swap-horizontal-outline"}
        iconColor={ColorPalette.dark.secondary200}
        onPress={toggleExerciseModal}
      />

      <Item
        title="Change Unit"
        icon={"barbell-outline"}
        iconColor={ColorPalette.dark.secondary200}
        onPress={handleToggleUnit}
        rightText={unit}
      />

      <Item
        title="Edit Rest Time"
        icon={"time-outline"}
        iconColor={ColorPalette.dark.secondary200}
        onPress={togglePicker}
        rightText={formatTime(exercise.restTime)}
      />

      <Item
        title="Remove Exercise"
        icon={"trash-outline"}
        iconColor={ColorPalette.dark.error}
        onPress={handleRemove}
      />
    </>
  );
}
