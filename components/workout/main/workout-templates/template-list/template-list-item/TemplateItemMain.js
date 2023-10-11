import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette } from "../../../../../../ColorPalette";
import { deleteTemplate } from "../../../../../../util/sqlite/db";
import { useDispatch } from "react-redux";
import {
  deleteTemplate as deleteTemplateRedux,
  setTemplateToEdit,
} from "../../../../../../util/redux/slices/templates";
import PopoverMenu from "./PopoverMenu";

export default function TemplateItemMain({
  template,
  handleSelect,
  setShowModal,
}) {
  const dispatch = useDispatch();

  //truncate the exercises to just the first 3
  const exercisesToShow = template.exercises.slice(0, 4);

  async function handleDelete() {
    await deleteTemplate(template.id);
    dispatch(deleteTemplateRedux(template.id));
  }

  function handlePress() {
    handleSelect(template);
  }

  function openNameEditModal() {
    dispatch(setTemplateToEdit(template));
    setShowModal(true);
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handlePress}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{template.name}</Text>
        <PopoverMenu
          handleDeletePress={handleDelete}
          handleEditPress={openNameEditModal}
        />
      </View>
      <View style={styles.fullWidth}>
        {exercisesToShow.map((exercise, index) => (
          <Text style={styles.text} key={Math.random()}>
            -
            {/* if there are more than 3 show a different message on the last exercise listed */}
            {index === 3 && template.exercises.length > 3
              ? ` ${exercise.name} + ${template.exercises.length - 3} more`
              : ` ${exercise.name}`}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.dark.gray700,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    flexBasis: "45%",
    height: 150,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  fullWidth: {
    width: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },

  text: {
    fontSize: 16,
    color: ColorPalette.dark.gray300,
    textAlign: "left",
  },

  pressed: {
    opacity: 0.5,
  },
});
