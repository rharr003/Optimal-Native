import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import TotalEnergyExpenditure from "./TotalEnergyExpenditure";
import Calories from "./Calories";
import Weight from "./Weight";
import { useState, useEffect } from "react";
import calculateTdee from "../../../util/calculateTdee";
import TdeeProgressChart from "../TdeeProgressChart";
import { ColorPalette } from "../../../ColorPalette";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  setTdee as setTdeeRedux,
  setOverlayMessage,
} from "../../../util/redux/userData";

const width = Dimensions.get("window").width;

export default function InsightsMain() {
  const [reset, setReset] = useState(false);
  const tdee = useSelector((state) => state.userData.tdee);
  const overlayMessage = useSelector((state) => state.userData.overlayMessage);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    async function fetch() {
      const result = await calculateTdee();
      if (typeof result === "number") {
        dispatch(setTdeeRedux(result));
        dispatch(setOverlayMessage(""));
      } else {
        dispatch(setTdeeRedux(0));
        dispatch(setOverlayMessage(result));
      }
    }

    fetch();
  }, []);

  function refresh() {
    setReset(!reset);
  }
  return (
    <View style={styles.container}>
      <View style={styles.rightView}>
        <Weight />
      </View>
      <Calories refresh={refresh} />
      <View style={styles.topView}>
        {!tdee && (
          <Pressable
            style={({ pressed }) => [styles.overlay, pressed && styles.pressed]}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.overlayTextView}>
              <Text style={[styles.text, styles.italic]}>{overlayMessage}</Text>
            </View>
          </Pressable>
        )}
        <View style={styles.innerContainer}>
          <TdeeProgressChart />
          <TotalEnergyExpenditure tdee={tdee} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },

  innerContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topView: {
    width: "100%",
    padding: 0,
  },

  rightView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: ColorPalette.dark.gray900,
    opacity: 0.9,
  },

  overlayTextView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  italic: {
    fontStyle: "italic",
    opacity: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: ColorPalette.dark.gray400,
    opacity: 0.7,
  },

  text: {
    fontSize: 14,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginVertical: 5,
  },

  pressed: {
    backgroundColor: ColorPalette.dark.gray800,
  },
});
