import { ColorPalette } from "../../../ColorPalette";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FormInput({
  placeholder,
  iconName,
  handleChange,
  text,
  maxLength = 24,
  keyboardType = "numeric",
  label,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fakeInput}>
        <Ionicons name={iconName} size={20} color={ColorPalette.dark.gray500} />
        <TextInput
          style={styles.input}
          value={text}
          placeholder={placeholder}
          placeholderTextColor={ColorPalette.dark.gray500}
          onChangeText={handleChange}
          maxLength={maxLength}
          returnKeyType="done"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },

  label: {
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
    marginBottom: 5,
    marginLeft: 10,
  },

  fakeInput: {
    width: "100%",
    backgroundColor: "#121212f5",
    borderRadius: 10,
    padding: 5,
    paddingLeft: 25,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginLeft: 5,
    fontSize: 18,
    color: ColorPalette.dark.secondary200,
  },
});
