import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { fetchTotalTimeAllTime } from "../../../../../util/sqlite/db";
import { ColorPalette } from "../../../../../ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setTotalTime } from "../../../../../util/redux/widgets";

export default function TotalTime() {
  const totalTime = useSelector((state) => state.widgets.totalTime);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const result = await fetchTotalTimeAllTime();
      dispatch(setTotalTime(result));
    }

    fetch();
  }, []);

  function parseTime(time) {
    let days = Math.floor(time / 86400);
    let hours = Math.floor((time % 86400) / 3600);
    let minutes = Math.floor(((time % 86400) % 3600) / 60);
    let seconds = Math.floor(((time % 86400) % 3600) % 60);
    const result = `${days > 0 ? days + "d " : ""} ${
      hours > 0 ? hours + "h " : ""
    } ${minutes + "m "} ${seconds + "s"}`;

    return result;
  }
  return (
    <View style={styles.container}>
      <Ionicons
        name="time-outline"
        size={32}
        color={ColorPalette.dark.gray400}
      />
      <Text style={styles.text}>{parseTime(totalTime)}</Text>
      <Text style={styles.italic}>Total time spent working out</Text>
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
