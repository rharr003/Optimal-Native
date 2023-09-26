import { StyleSheet, View } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import Target from "./Target";
import { useSelector } from "react-redux";

export default function TargetsMain() {
  const tdee = useSelector((state) => state.userData.tdee);
  return (
    <View style={styles.container}>
      <Target
        label={"Lose"}
        calories={tdee ? tdee - 500 : 0}
        color={ColorPalette.dark.error}
      />
      <Target
        label={"Maintain"}
        calories={tdee ? tdee : 0}
        color={ColorPalette.dark.secondary200}
      />
      <Target
        label={"Gain"}
        calories={tdee ? tdee + 350 : 0}
        color={ColorPalette.dark.primary200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "49%",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
    height: 280,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
    color: ColorPalette.dark.gray400,
  },

  text: {
    fontSize: 14,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
    marginVertical: 5,
  },

  textGray: {
    color: ColorPalette.dark.gray400,
  },

  bold: {
    fontWeight: "bold",
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
    opacity: 0.5,
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

  italic: {
    fontStyle: "italic",
    opacity: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: ColorPalette.dark.gray400,
    opacity: 0.7,
  },

  pressed: {
    opacity: 0.5,
  },
});
