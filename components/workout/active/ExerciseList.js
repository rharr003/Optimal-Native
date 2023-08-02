import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import WorkoutExercise from "./Exercise";
import { TouchableOpacity, Keyboard } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExerciseOrder } from "../../../util/workout";
import ExerciseCollapsed from "./ExerciseCollapsed";

import { useEffect } from "react";

export default function WorkoutExerciseList({ handleManageExerciseModalOpen }) {
  const [onlyShowTitle, setOnlyShowTitle] = useState(false);
  const [positionTop, setPositionTop] = useState(0);
  const [marginBottom, setMarginBottom] = useState(75);
  const exercises = useSelector((state) => state.workout.workout.exercises);
  const dispatch = useDispatch();
  function collapseAndDrag(e, getIndex, drag) {
    const { pageY } = e.nativeEvent;
    const index = getIndex();
    setPositionTop(pageY - ((index + 1) * 25 + 115));
    setOnlyShowTitle(true);
    setTimeout(() => {
      drag();
    }, 50);
  }

  function handleDragEnd(data) {
    setPositionTop(0);
    setOnlyShowTitle(false);
    dispatch(updateExerciseOrder(data));
  }

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => {
      setMarginBottom(0);
    });

    Keyboard.addListener("keyboardWillHide", () => {
      setMarginBottom(75);
    });
  }, []);

  return (
    <GestureHandlerRootView
      style={[
        { flex: 1, width: "100%", marginBottom: marginBottom },
        positionTop === 0 ? null : { position: "absolute", top: positionTop },
      ]}
    >
      <DraggableFlatList
        data={exercises}
        autoscrollThreshold={1}
        autoscrollSpeed={100}
        renderItem={({ item, getIndex, drag, isActive }) => (
          <ScaleDecorator>
            <TouchableOpacity
              onLongPress={(e) => collapseAndDrag(e, getIndex, drag)}
              disabled={isActive}
            >
              <ExerciseCollapsed name={item.name} />
            </TouchableOpacity>
            {onlyShowTitle ? null : (
              <WorkoutExercise
                key={item.id}
                exercise={item}
                index={getIndex()}
                handleManageExerciseModalOpen={handleManageExerciseModalOpen}
              />
            )}
          </ScaleDecorator>
        )}
        keyExtractor={(item, index) => `draggable-item-${item.name + index}`}
        onDragEnd={({ data }) => handleDragEnd(data)}
      />
    </GestureHandlerRootView>
  );
}
