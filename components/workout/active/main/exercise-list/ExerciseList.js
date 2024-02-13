import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  OpacityDecorator,
} from "react-native-draggable-flatlist";
import ExerciseMain from "./exercise/ExerciseMain";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateExerciseOrder } from "../../../../../util/redux/slices/workout";
import TouchableHeader from "./exercise/TouchableHeader";
import WorkoutFooter from "../footer/WorkoutFooter";
import * as Haptics from "expo-haptics";

export default function ExerciseList({ interval, handleCancel, handleFinish }) {
  const exercises = useSelector((state) => state.workout.workout.exercisesNew);
  const dispatch = useDispatch();
  function hapticDrag(drag) {
    // if there is only one exercise in the list then there is no need to drag also prevents a bug where if the user drags the only exercise in the list the that exercise will have broken touch events until the the whole list is re-rendered
    if (exercises.length > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      drag();
    }
  }

  function Footer() {
    return (
      <WorkoutFooter
        interval={interval}
        handleCancel={handleCancel}
        handleFinish={handleFinish}
      />
    );
  }

  // I had to customize the npm package to get this to work sometimes items would get stuck on top of each other if the drag was released too quickly I forced the drag end function in the package to run everytime regardless of if it thought the user had actually dragged an item.
  function handleDragEnd({ data }) {
    dispatch(updateExerciseOrder(data));
  }

  function handleRelease() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraggableFlatList
        data={exercises}
        autoscrollSpeed={200}
        autoscrollThreshold={25}
        ListFooterComponent={Footer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, getIndex, drag, isActive }) => (
          <OpacityDecorator>
            <TouchableHeader
              name={item.name}
              drag={drag}
              hapticDrag={hapticDrag}
              isActive={isActive}
              equipment={item.equipment}
            />
            <ExerciseMain exercise={item} index={getIndex()} />
          </OpacityDecorator>
        )}
        keyExtractor={(item) => `draggable-item-${item.reactId}`}
        onRelease={handleRelease}
        onDragEnd={handleDragEnd}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 0,
  },
});
