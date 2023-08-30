import { View, StyleSheet, FlatList } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { ColorPalette } from "../../ui/ColorPalette";
import CustomButton from "../../ui/CustomButton";
import Record from "./Record";
import { fetchUserMetrics } from "../../../util/sqlite/db";
import StatDetailEntry from "./StatDetailEntry";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import {
  deleteUserMetric,
  fetchRecentWeightDataDailyAvg,
  fetchRecentWeightDataWeeklyAvg,
  fetchRecentWeightDataMonthlyAvg,
} from "../../../util/sqlite/db";
import { useDispatch } from "react-redux";
import { setTdee, setOverlayMessage } from "../../../util/redux/userData";
import calculateTdee from "../../../util/calculateTdee";

export default function StatDetail({ navigation, route }) {
  const { metric, measurements, indexesToHide } = route.params;
  const [currFormat, setCurrFormat] = useState("weekly");
  const [allMetrics, setAllMetrics] = useState([]);
  const [metricMeasurements, setMetricMeasurements] = useState(measurements);
  const [showModal, setShowModal] = useState(false);
  const [idxRemoved, setIdxRemoved] = useState([]);
  const activeIdx = useSharedValue(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.metric.name,
    });
  });

  useEffect(() => {
    async function fetch() {
      const metrics = await fetchUserMetrics(metric.id);
      setAllMetrics(metrics);
    }
    fetch();
  }, []);

  function handleClose() {
    setShowModal(false);
  }

  function handleOpen() {
    setShowModal(true);
  }

  function renderItem({ item, index }) {
    return (
      <StatDetailEntry
        stat={item}
        unit={metric.unit}
        idxRemoved={idxRemoved}
        activeIdx={activeIdx}
        setIdxRemoved={setIdxRemoved}
        index={index}
        removeItem={removeItem}
      />
    );
  }

  async function removeItem(index) {
    const id = allMetrics[index].id;
    await deleteUserMetric(id);
    setAllMetrics((prev) => {
      const newMetrics = prev.filter((metric, metricIndex) => {
        return metricIndex !== index;
      });
      return newMetrics;
    });

    setIdxRemoved((prev) => [...prev, index]);

    if (index === 0) {
      const result = await calculateTdee();
      if (typeof result === "number") {
        dispatch(setTdee(result));
        dispatch(setOverlayMessage(""));
      } else {
        dispatch(setTdee(0));
        dispatch(setOverlayMessage(result));
      }
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Record
          showModal={showModal}
          handleClose={handleClose}
          setMetricMeasurements={setAllMetrics}
          metric={metric}
          currFormat={currFormat}
        />
        <View style={styles.bottomContainer}>
          <CustomButton
            title="Add Measurement"
            color={ColorPalette.dark.secondary200}
            iconName="add-outline"
            onPress={handleOpen}
            style={{ marginBottom: 15, width: "90%" }}
          />

          <FlatList
            data={allMetrics}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              if (idxRemoved.indexOf(index) !== -1) {
                return metric.id + index + Math.random();
              } else {
                return metric.id + index;
              }
            }}
            style={{ width: "100%", height: "100%" }}
            ListFooterComponent={() => <View style={{ height: 50 }} />}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },

  text: {
    color: "#fff",
    fontSize: 20,
  },

  topContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },

  bottomContainer: {
    alignItems: "center",
    width: "100%",
    flex: 2,
  },

  italic: {
    fontStyle: "italic",
    color: ColorPalette.dark.gray500,
  },
});
