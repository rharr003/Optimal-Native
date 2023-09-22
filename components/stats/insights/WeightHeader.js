import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { fetchLastMetricValue } from "../../../util/sqlite/db";
import { ColorPalette } from "../../ui/ColorPalette";
import CustomButton from "../../ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { fetchRecentWeightDataWeeklyAvg } from "../../../util/sqlite/db";
import { useIsFocused } from "@react-navigation/native";

export default function WeightHeader() {
  const [lastValue, setLastValue] = useState("No Data");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  async function handlePress() {
    const [measurements, indexesToHide] =
      await fetchRecentWeightDataWeeklyAvg();
    navigation.navigate("detail", {
      metric: { id: 1, name: "weight", unit: "lbs" },
      measurements,
      indexesToHide,
    });
  }

  useEffect(() => {
    async function fetch() {
      const value = await fetchLastMetricValue(1);
      if (value) {
        setLastValue(value);
      } else {
        setLastValue("No Data");
      }
    }
    fetch();
  }, [isFocused]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>Current:</Text>
      <View style={styles.rightContainer}>
        <Text
          style={[styles.text, lastValue === "No Data" ? styles.italic : null]}
        >
          {lastValue + " " + (lastValue !== "No Data" ? "lbs" : "")}
        </Text>
        <CustomButton
          title=""
          color={ColorPalette.dark.secondary200}
          iconName="chevron-forward-outline"
          onPress={handlePress}
          style={{
            paddingVertical: 2,
            paddingHorizontal: 5,
            borderRadius: 5,
          }}
          size={18}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  text: {
    color: ColorPalette.dark.secondary200,
    fontSize: 20,
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: "35%",
    marginLeft: 10,
  },

  italic: {
    fontStyle: "italic",
    color: ColorPalette.dark.gray500,
  },
});
