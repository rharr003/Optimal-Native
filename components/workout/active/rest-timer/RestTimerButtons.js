import { View, StyleSheet } from "react-native";
import CustomButton from "../../../shared/ui/CustomButton";
import { ColorPalette } from "../../../../ColorPalette";

export default function RestTimerButtons({ increase, decrease, skip }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomButton
          title="15s"
          color={ColorPalette.dark.secondary200}
          onPress={decrease}
          iconName="remove-circle-outline"
          style={styles.button}
          size={30}
        />
        <CustomButton
          title="15s"
          color={ColorPalette.dark.secondary200}
          onPress={increase}
          iconName="add-circle-outline"
          style={styles.button}
          size={30}
        />
      </View>
      <CustomButton
        title="Skip"
        color={ColorPalette.dark.secondary200}
        onPress={skip}
        iconName="play-forward-outline"
        style={styles.skipButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  skipButton: {
    width: "80%",
    paddingVertical: 2,
    marginTop: 10,
    marginBottom: 0,
  },
  button: {
    width: "30%",
    margin: 0,
    paddingVertical: 2,
  },
});
