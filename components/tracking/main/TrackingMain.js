import { View, StyleSheet } from "react-native";
import Calories from "./calories/Calories";
import Weight from "./weight/Weight";
import { useState } from "react";
import TdeeMain from "./tdee/TdeeMain";

export default function TrackingMain() {
  const [reset, setReset] = useState(false);

  function refresh() {
    setReset(!reset);
  }

  return (
    <View style={styles.container}>
      <View style={styles.rightView}>
        <Weight />
      </View>
      <Calories refresh={refresh} />
      <TdeeMain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },

  rightView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
