import { ColorPalette } from "../../ui/ColorPalette";
import CustomButton from "../../ui/CustomButton";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { stopWorkout } from "../../../util/workout";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutActiveFooter({ style, toggleExerciseModal }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  async function cancelWorkout() {
    dispatch(stopWorkout());
    // removes the saved workout from AsyncStorage
    await AsyncStorage.removeItem("prevState");
    navigation.goBack();
  }

  return (
    <View style={[styles.footer, style]}>
      <CustomButton
        title="Add Exercise"
        color={ColorPalette.dark.secondary200}
        onPress={toggleExerciseModal}
        style={{ width: "40%" }}
      />
      <CustomButton
        title="Cancel Workout"
        color={ColorPalette.dark.error}
        onPress={cancelWorkout}
        style={{ width: "40%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    marginVertical: "10%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
