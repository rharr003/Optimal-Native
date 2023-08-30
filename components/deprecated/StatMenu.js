import { View, Text, StyleSheet } from "react-native";
import { fetchMetrics } from "../../util/sqlite/db";
import WeightFooter from "../stats/insights/WeightFooter";
import { useState, useEffect } from "react";

export default function StatMenu() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    async function fetch() {
      const metrics = await fetchMetrics();
      setMetrics(metrics);
    }
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      {metrics.map((metric) => (
        <WeightFooter key={metric.id} metric={metric} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 15,
  },
});
