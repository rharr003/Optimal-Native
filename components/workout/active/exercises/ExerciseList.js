import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  OpacityDecorator,
} from "react-native-draggable-flatlist";
import Exercise from "./Exercise";
import { TouchableOpacity, Keyboard } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExerciseOrder } from "../../../../util/workout";
import ExerciseCollapsed from "./ExerciseCollapsed";
import WorkoutActiveFooter from "../WorkoutActiveFooter";
import * as Haptics from "expo-haptics";

export default function ExerciseList({ toggleExerciseModal }) {
  const [dragIsActive, setDragIsActive] = useState(false);
  const exercises = useSelector((state) => state.workout.workout.exercises);
  const dispatch = useDispatch();
  function hapticDrag(drag) {
    // lets the children exercises know that a drag is active so they can update the redux store with their current set state this causes extra re-renders but it is necessary to prevent the redux store from getting out of sync with the current set state
    setDragIsActive(true);
    //gives time for the children exercises to save currrent set state in the redux store before the drag starts
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      drag();
    }, 200);
  }

  // i had to customize the npm package to get this to work sometimes items would get stuck on top of each other if the drag was released too quickly I forced the drag end fucntion in the package to run everytime regardless of if it thought the user had actually dragged an item.
  function handleDragEnd(data) {
    setDragIsActive(false);
    dispatch(updateExerciseOrder(data));
  }

  function handleRelease() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <GestureHandlerRootView
      style={[
        {
          flex: 1,
          width: "100%",
          height: "100%",
          marginBottom: 0,
        },
      ]}
    >
      <DraggableFlatList
        data={exercises}
        autoscrollSpeed={200}
        autoscrollThreshold={25}
        ListFooterComponent={() => (
          <WorkoutActiveFooter toggleExerciseModal={toggleExerciseModal} />
        )}
        renderItem={({ item, getIndex, drag, isActive }) => (
          <OpacityDecorator>
            <TouchableOpacity
              onLongPress={() => hapticDrag(drag)}
              disabled={isActive}
            >
              <ExerciseCollapsed name={item.name} />
            </TouchableOpacity>
            <Exercise
              key={item.id}
              exercise={item}
              index={getIndex()}
              dragIsActive={dragIsActive}
            />
          </OpacityDecorator>
        )}
        keyExtractor={(item, index) => `draggable-item-${item.reactId}`}
        onRelease={handleRelease}
        onDragEnd={({ data }) => handleDragEnd(data)}
      />
      {/* <WorkoutActiveFooter /> */}
    </GestureHandlerRootView>
  );
}
