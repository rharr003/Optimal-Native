import { StyleSheet, Text, View } from "react-native";
import { ColorPalette } from "../../../../ColorPalette";
import CustomButton from "../../../shared/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  setWorkout,
  incrementTimer,
  addInterval,
  clearAllIntervals,
} from "../../../../util/redux/workout";
import * as Haptics from "expo-haptics";

export default function StartTemplateWorkoutModal({ workout, handleClose }) {
  const isActive = useSelector((state) => state.workout.isActive);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleStartWorkout() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (isActive) {
      handleClose();
      return;
    }
    dispatch(setWorkout(workout));

    dispatch(clearAllIntervals());

    const interval = setInterval(() => {
      dispatch(incrementTimer({ amount: 1 }));
    }, 1000);

    dispatch(addInterval(interval));

    handleClose();

    navigation.navigate("active", { interval: interval });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{workout.name}</Text>
      </View>
      <View>
        {workout.exercises.slice(0, 6).map((exercise, index) => (
          <Text style={styles.templateText} key={Math.random()}>
            {index === 5 && workout.exercises.length > 5
              ? `${
                  exercise.name +
                  ` (${
                    exercise.equipment[0].toUpperCase() +
                    exercise.equipment.slice(1)
                  })` +
                  " x " +
                  exercise.sets.length
                } + ${workout.exercises.length - 5} more`
              : `${
                  exercise.name +
                  ` (${
                    exercise.equipment[0].toUpperCase() +
                    exercise.equipment.slice(1)
                  })` +
                  " x " +
                  exercise.sets.length
                }`}
          </Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Start Workout"
          iconName="flash-outline"
          onPress={handleStartWorkout}
          color={ColorPalette.dark.secondary200}
          style={{ width: "45%", marginHorizontal: 0 }}
        />
        <CustomButton
          title="Cancel"
          iconName="close-outline"
          onPress={handleClose}
          color={ColorPalette.dark.gray500}
          style={{ width: "45%", marginHorizontal: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },
  flatlist: {
    backgroundColor: "red",
  },

  templateText: {
    fontSize: 18,
    color: ColorPalette.dark.gray500,
    marginVertical: 5,
  },

  titleView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
