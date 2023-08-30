import { View, Text, StyleSheet, FlatList } from "react-native";
import { fetchWorkouts } from "../../../util/sqlite/db";
import { useState, useEffect } from "react";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    async function fetch() {
      const workouts = await fetchWorkouts();
      setWorkouts(workouts);
    }
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutItem workout={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: "95%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
