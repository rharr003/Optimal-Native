import PickerInput from "../../../ui/PickerInput";
import {
  equipmentOptions,
  pickerStyle,
} from "../../../../../util/config/exercises/EquipmentPickerConfig";
import { bodyPartOptions } from "../../../../../util/config/exercises/BodyPartPickerConfig";

export default function ExerciseAddModalContent({
  equipment,
  handleChangeEquipment,
  bodyPart,
  handleChangeBodyPart,
}) {
  return (
    <>
      <PickerInput
        value={equipment}
        iconName={"barbell-outline"}
        handleChange={handleChangeEquipment}
        label={"Equipment"}
        pickerOptions={equipmentOptions}
        pickerStyle={pickerStyle}
      />
      <PickerInput
        value={bodyPart}
        iconName={"barbell-outline"}
        handleChange={handleChangeBodyPart}
        label={"Muscle Group"}
        pickerOptions={bodyPartOptions}
        pickerStyle={pickerStyle}
      />
    </>
  );
}
