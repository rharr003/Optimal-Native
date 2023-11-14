import Item from "./Item";
import { ColorPalette } from "../../../../../../../ColorPalette";
import RestTimePicker from "../rest-time-picker/RestTimePicker";

export default function ItemList({
  handleToggleUnit,
  handleRemove,
  toggleExerciseModal,
  unit,
  restTime,
  handleRestTimeChange,
}) {
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

      <RestTimePicker restTime={restTime} handleChange={handleRestTimeChange} />

      <Item
        title="Remove Exercise"
        icon={"trash-outline"}
        iconColor={ColorPalette.dark.error}
        onPress={handleRemove}
      />
    </>
  );
}
