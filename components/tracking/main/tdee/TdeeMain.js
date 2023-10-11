import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setOverlayMessage,
  setTdee,
} from "../../../../util/redux/slices/userData";
import calculateTdee from "../../../../util/calculateTdee";
import { useNavigation } from "@react-navigation/native";
import TdeeChartMain from "./tdee-chart/TdeeChartMain";
import TdeeTargets from "./tdee-chart/targets/TargetsMain";
import PressableOverlay from "../../../shared/ui/PressableOverlay";

export default function TdeeMain() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const overlayMessage = useSelector((state) => state.userData.overlayMessage);

  function handlePress() {
    navigation.navigate("profile");
  }

  useEffect(() => {
    async function fetch() {
      const result = await calculateTdee();
      if (typeof result === "number") {
        dispatch(setTdee(result));
        dispatch(setOverlayMessage(""));
      } else {
        dispatch(setTdee(0));
        dispatch(setOverlayMessage(result));
      }
    }

    fetch();
  }, []);

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 0,
  },

  chartContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
