import { View, StyleSheet, ScrollView } from "react-native";
import WeightMain from "./weight/WeightMain";
import TdeeMain from "./tdee/TdeeMain";

export default function TrackingMain() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      alwaysBounceVertical={false}
    >
      <WeightMain />
      <TdeeMain />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 25,
  },

  content: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
