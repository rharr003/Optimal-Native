import { useNavigation } from "@react-navigation/native";
import WorkoutFooterButtons from "./WorkoutFooterButtons";

export default function WorkoutFooter({ handleCancel, handleFinish }) {
  const navigation = useNavigation();

  function openAddExercise() {
    navigation.navigate("addExercise", { isReplacing: false });
  }

  return (
    <WorkoutFooterButtons
      openAddExercise={openAddExercise}
      cancelWorkout={handleCancel}
      openFinishModal={handleFinish}
    />
  );
}
