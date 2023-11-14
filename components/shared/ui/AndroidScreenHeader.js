import { View, Text, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import CustomButton from "./CustomButton";

export default function AndroidScreenHeader({ goBack, name }) {
  return (
    <View style={styles.container}>
      <CustomButton
        onPress={goBack}
        iconName="arrow-back-outline"
        textColor={ColorPalette.dark.gray100}
        style={styles.buttonStyle}
      />

      <Text style={styles.title}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: ColorPalette.dark.gray700,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
