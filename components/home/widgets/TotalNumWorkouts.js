import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchNumWorkoutsAllTime } from "../../../util/sqlite/db";
import { ColorPalette } from "../../ui/ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TotalNumWorkouts() {
  const [numWorkouts, setNumWorkouts] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetch() {
      const result = await fetchNumWorkoutsAllTime();
      setNumWorkouts(result);
    }

    if (isFocused) fetch();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Workouts:</Text> */}
      <Ionicons
        name="trending-up-outline"
        size={32}
        color={ColorPalette.dark.gray400}
      />
      <Text style={styles.text}>{numWorkouts}</Text>
      <Text style={styles.italic}>Total number of workouts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "31%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 25,
    backgroundColor: "#03dac525",
    borderRadius: 10,
    height: 125,
    paddingTop: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginVertical: 5,
  },

  italic: {
    fontStyle: "italic",
    fontSize: 12,
    color: ColorPalette.dark.gray400,
    opacity: 0.8,
    textAlign: "center",
  },
});
