import { ColorPalette } from "../../ui/ColorPalette";
import CustomButton from "../../ui/CustomButton";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../util/redux/workout";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutActiveFooter({ style, interval }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  async function cancelWorkout() {
    dispatch(stopWorkout());
    clearInterval(interval.current);
    // removes the saved workout from AsyncStorage
    await AsyncStorage.removeItem("prevState");
    interval.current = null;
    navigation.goBack();
  }

  function toggleExerciseModal() {
    navigation.navigate("addExercise", { isReplacing: false });
  }

  return (
    <View style={[styles.footer, style]}>
      <CustomButton
        title="Add Exercise"
        color={ColorPalette.dark.gray500}
        iconName={"add-outline"}
        onPress={toggleExerciseModal}
        style={{ width: "100%" }}
        textColor="#FFFFFF"
      />
      <CustomButton
        title="Cancel Workout"
        color={ColorPalette.dark.error}
        iconName={"trash-outline"}
        onPress={cancelWorkout}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    marginVertical: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
