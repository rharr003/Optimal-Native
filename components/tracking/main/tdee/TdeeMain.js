import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setOverlayMessage,
  setTdee,
  updatePacing,
} from "../../../../util/redux/slices/userData";
import calculateTdee from "../../../../util/calculateTdee";
import { useNavigation } from "@react-navigation/native";
import TdeeChartMain from "./tdee-chart/TdeeChartMain";
import TdeeTargets from "./tdee-chart/targets/TargetsMain";
import PressableOverlay from "../../../shared/ui/PressableOverlay";
import { ColorPalette } from "../../../../ColorPalette";
import TdeeHeader from "./header/TdeeHeader";
import ChartHeader from "./chart-header/ChartHeader";

export default function TdeeMain() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const overlayMessage = useSelector((state) => state.userData.overlayMessage);
  function handlePress() {
    if (overlayMessage === "No recent weight data") {
      navigation.navigate("weight-detail", {
        metric: { id: 1, name: "weight", unit: "lbs" },
      });
      return;
    }
    navigation.navigate("profile");
  }

  useEffect(() => {
    async function fetch() {
      const result = await calculateTdee();
      if (typeof result === "number") {
        console.log("setting tdee to:", result);
        dispatch(setTdee(result));
        dispatch(setOverlayMessage(""));
      } else {
        dispatch(setTdee(0));
        dispatch(setOverlayMessage(result));
      }

      dispatch(updatePacing());
    }
    try {
      fetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TdeeHeader />
      <View style={styles.innerContainer}>
        <ChartHeader />
        {overlayMessage !== "" && (
          <PressableOverlay
            message={overlayMessage}
            onPress={handlePress}
            zIndex={1}
          />
        )}
        <View style={styles.chartContainer}>
          <TdeeChartMain />
          <TdeeTargets />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginBottom: 25,
  },
  innerContainer: {
    width: "95%",
    alignItems: "center",
    padding: 0,
    borderColor: ColorPalette.dark.secondary200,
    borderWidth: 1,
    borderRadius: 25,
  },

  chartContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
