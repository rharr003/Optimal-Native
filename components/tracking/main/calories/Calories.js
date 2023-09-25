import { View, Text, StyleSheet, Pressable } from "react-native";
import { fetchCurrentIntake } from "../../../../util/sqlite/db";
import { useEffect, useState } from "react";
import { ColorPalette } from "../../../../ColorPalette";
import CalorieEntryModal from "./CalorieEntryModal";
import { useDispatch } from "react-redux";
import { setCurrentIntake as setCurrentIntakeRedux } from "../../../../util/redux/userData";
import { useSelector } from "react-redux";
import CustomButton from "../../../shared/CustomButton";

export default function Calories({ refresh }) {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [trajectory, setTrajectory] = useState(null);
  const tdee = useSelector((state) => state.userData.tdee);
  const [color, setColor] = useState(ColorPalette.dark.gray400);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      const intake = await fetchCurrentIntake();
      if (intake) {
        setCurrentIntake(intake);
        dispatch(setCurrentIntakeRedux(intake));
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (!tdee || !currentIntake) {
      setColor(ColorPalette.dark.gray400);
      setTrajectory(null);
      return;
    } else if (currentIntake > tdee + 50) {
      setColor(ColorPalette.dark.primary200);
    } else if (currentIntake < tdee) {
      setColor(ColorPalette.dark.error);
    } else {
      setColor(ColorPalette.dark.secondary200);
    }

    const result = (((currentIntake - tdee) * 7) / 3500).toFixed(1);
    const str = result > 0 ? `+ ${result} ` : result;
    setTrajectory(str);
  }, [currentIntake, tdee]);

  function handlePress() {
    setShowModal(true);
  }
  return (
    <>
      <CalorieEntryModal
        setCurrentIntake={setCurrentIntake}
        showModal={showModal}
        setShowModal={setShowModal}
        refresh={refresh}
      />
      <View style={styles.container}>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.innerContainer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.title}>Intake: </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.text, { color: color }]}>
              {currentIntake ? `${currentIntake} kCal/D` : "Tap to Set"}
            </Text>
            <CustomButton
              title=""
              color={color}
              iconName="pencil-outline"
              onPress={handlePress}
              size={16}
              style={{
                paddingVertical: 2,
                paddingHorizontal: 4,
                borderRadius: 5,
                marginTop: 3,
              }}
            />
          </View>
        </Pressable>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Pacing: </Text>
          <Text style={[styles.text, { color: color }]}>
            {trajectory ? `${trajectory} lbs/week` : "No Data"}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
  },

  innerContainer: {
    flexBasis: "49%",
    alignItems: "center",
    justifyContent: "center",
  },

  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // borderRadius: 10,
    backgroundColor: "transparent",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 3,
  },

  italic: {
    fontStyle: "italic",
    opacity: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: ColorPalette.dark.gray400,
    opacity: 0.7,
  },

  italicSmall: {
    fontStyle: "italic",
    fontSize: 14,
    color: "black",
    opacity: 0.6,
  },

  bold: {
    fontWeight: "bold",
  },

  pressed: {
    opacity: 0.5,
  },

  input: {
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: ColorPalette.dark.gray800,
    width: "80%",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
