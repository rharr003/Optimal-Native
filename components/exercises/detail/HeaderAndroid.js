import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import CustomButton from "../../shared/ui/CustomButton";

export default function HeaderAndroid({ goBack, name }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomButton
          onPress={goBack}
          iconName="arrow-back-outline"
          textColor={ColorPalette.dark.gray100}
          style={styles.buttonStyle}
          testId={"go-back"}
        />

        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: ColorPalette.dark.gray700,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },

  innerContainer: {
    flexDirection: "row",
  },

  title: {
    color: ColorPalette.dark.gray100,
    fontSize: 20,
    marginLeft: 25,
  },

  buttonStyle: {
    margin: 0,
    marginLeft: 10,
    padding: 0,
  },
});
