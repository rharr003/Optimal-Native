import { useNavigation } from "@react-navigation/native";
import WorkoutFooterButtons from "./WorkoutFooterButtons";

export default function WorkoutFooter({ interval, handleCancel }) {
  const navigation = useNavigation();

  function openAddExercise() {
    navigation.navigate("addExercise", { isReplacing: false });
  }

  return (
    <WorkoutFooterButtons
      openAddExercise={openAddExercise}
      cancelWorkout={handleCancel}
    />
  );
}
