import { View, Text, StyleSheet, Pressable } from "react-native";
import { ColorPalette } from "../../ui/ColorPalette";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import Ionicons from "react-native-vector-icons/Ionicons";
import { deleteTemplate } from "../../../util/sqlite/db";

const { SlideInMenu, ContextMenu, Popover } = renderers;

export default function TemplateItem({
  template,
  handleSelect,
  setTemplates,
  handleNameEdit,
}) {
  async function handleDelete() {
    console.log(template);
    await deleteTemplate(template.id);
    setTemplates((prev) => prev.filter((t) => t.id !== template.id));
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.templateItem, pressed && styles.pressed]}
      onPress={() => handleSelect(template)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingLeft: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.templateTitle}>{template.name}</Text>
        <Menu
          renderer={Popover}
          rendererProps={{ placement: "left", anchorStyle: styles.popupAnchor }}
        >
          <MenuTrigger>
            <Ionicons
              name="create-outline"
              size={26}
              color={ColorPalette.dark.secondary200}
            />
          </MenuTrigger>
          <MenuOptions
            style={{
              backgroundColor: ColorPalette.dark.gray800,
              padding: 5,
            }}
          >
            <MenuOption
              onSelect={handleDelete}
              style={{
                padding: 15,
                borderBottomColor: "white",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 16, color: ColorPalette.dark.error }}>
                Delete
              </Text>
            </MenuOption>
            <MenuOption
              onSelect={() => handleNameEdit(template)}
              style={{ padding: 15 }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>Edit Name</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={{ width: "100%" }}>
        {template.exercises.slice(0, 4).map((exercise, index) => (
          <Text style={styles.templateText} key={Math.random()}>
            -
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
  templateItem: {
    backgroundColor: ColorPalette.dark.gray700,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    flexBasis: "45%",
    height: 150,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  templateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPalette.dark.secondary200,
  },

  templateText: {
    fontSize: 16,
    color: ColorPalette.dark.gray300,
    textAlign: "left",
  },

  popupAnchor: {
    backgroundColor: ColorPalette.dark.gray800,
  },

  pressed: {
    opacity: 0.5,
  },
});
