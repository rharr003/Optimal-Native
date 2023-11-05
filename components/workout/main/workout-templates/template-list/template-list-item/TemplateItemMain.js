import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import { useDispatch } from "react-redux";
import { setTemplateToEdit } from "../../../../../../util/redux/slices/templates";
import * as Haptics from "expo-haptics";

export default function TemplateItemMain({
  template,
  handleSelect,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const daysPassed = Math.floor(
    (Date.now() - new Date(template.date).getTime()) / (1000 * 60 * 60 * 24)
  );
  const formattedDate = new Date(template.date).toLocaleString("en-Us", {
    month: "short",
    day: "numeric",
  });

  //truncate the exercises to just the first 3
  const exercisesToShow = template.exercises.slice(0, 4);

  function parseCompletedMessage() {
    if (daysPassed === 0) return "Completed today";
    if (daysPassed === 1) return "Completed yesterday";
    if (daysPassed < 8) return `Completed ${daysPassed} days ago`;
    return `Completed ${formattedDate}`;
  }

  function handlePress() {
    handleSelect(template);
  }

  function handleLongPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(setTemplateToEdit(template));
    setShowModal(true);
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View style={styles.fullWidth}>
        <Text style={styles.title}>{template.name}</Text>
        {exercisesToShow.map((exercise, index) => (
          <Text style={styles.text} key={Math.random()}>
            {/* if there are more than 3 show a different message on the last exercise listed */}
            {index === 3 && template.exercises.length > 3
              ? `${exercise.name} + ${template.exercises.length - 3} more...`
              : `${exercise.name}`}
          </Text>
        ))}
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.italic]}>
          {parseCompletedMessage()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.dark.gray800,
    padding: 5,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: ColorPalette.dark.secondary200,
    borderRadius: 25,
    margin: 10,
    marginVertical: 15,
    width: "45%",
    height: 150,
    justifyContent: "space-between",
    alignItems: "center",
  },

  fullWidth: {
    width: "100%",
    paddingLeft: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
    textAlign: "left",
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    color: ColorPalette.dark.gray300,
    textAlign: "left",
  },

  pressed: {
    opacity: 0.5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  italic: {
    fontStyle: "italic",
    color: ColorPalette.dark.gray500,
    textAlign: "center",
    fontSize: 13,
  },
});
