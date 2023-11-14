import { View, Text, StyleSheet, FlatList } from "react-native";
import { fetchWorkouts } from "../../../util/sqlite/db";
import { useState, useEffect } from "react";
import WorkoutHistoryItem from "./WorkoutHistoryItem";

export default function WorkoutHistoryMain() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    async function fetch() {
      const workouts = await fetchWorkouts();
      setWorkouts(workouts);
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutHistoryItem workout={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatlistContainer}
        showsVerticalScrollIndicator={false}
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

  flatlistContainer: {
    width: "95%",
  },
});
