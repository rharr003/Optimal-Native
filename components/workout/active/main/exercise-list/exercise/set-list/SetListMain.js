import SetHeader from "./SetHeader";
import { FlatList, StyleSheet } from "react-native";
import SwipeToDeleteView from "../../../../../../shared/gestures/SwipeToDeleteView";
import ExerciseSet from "./set/ExerciseSet";
import CustomButton from "../../../../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../../../../ColorPalette";

export default function SetListMain({
  sets,
  idxRemoved,
  handleModalToggle,
  unit,
  removeSet,
  activeIdx,
  setIdxRemoved,
  exercise,
  setShowRestTimerModal,
  addSet,
}) {
  return (
    <>
      <SetHeader
        handleModalToggle={handleModalToggle}
        unit={unit}
        equipment={exercise.equipment}
      />
      <FlatList
        data={sets}
        renderItem={({ item, index }) => (
          <SwipeToDeleteView
            index={index}
            removeSet={removeSet}
            activeIdx={activeIdx}
            idxRemoved={idxRemoved}
            setIdxRemoved={setIdxRemoved}
          >
            <ExerciseSet
              id={exercise.reactId}
              set={item}
              setNum={index + 1}
              restTime={exercise.restTime}
              setShowRestTimerModal={setShowRestTimerModal}
              equipment={exercise.equipment}
            />
          </SwipeToDeleteView>
        )}
        keyExtractor={(item, index) => {
          // forces re-initialization to reset shared values for the deletion animation when removed otherwise the container for the set will be hidden even though we have refreshed the set list in state. Causing the set to be hidden when it should be visible.
          if (idxRemoved.indexOf(index) !== -1) {
            return exercise.id + index + Math.random();
          } else {
            return exercise.id + index;
          }
        }}
      />
      <CustomButton
        title="Add Set"
        onPress={addSet}
        iconName="add-outline"
        color={ColorPalette.dark.gray800}
        textColor={"#FFFFFF"}
        style={styles.buttonStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 2,
  },
});
