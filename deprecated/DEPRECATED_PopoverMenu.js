import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { StyleSheet, Text } from "react-native";
import { ColorPalette } from "../ColorPalette";

import Ionicons from "react-native-vector-icons/Ionicons";

const { Popover } = renderers;
export default function PopoverMenu({ handleEditPress, handleDeletePress }) {
  return (
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
      <MenuOptions style={styles.optionsContainer}>
        <MenuOption
          onSelect={handleDeletePress}
          style={[styles.option, styles.bottomBorder]}
        >
          <Text style={[styles.text, styles.red]}>Delete</Text>
        </MenuOption>
        <MenuOption onSelect={handleEditPress} style={styles.option}>
          <Text style={styles.text}>Edit Name</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  popupAnchor: {
    backgroundColor: ColorPalette.dark.gray800,
  },

  optionsContainer: {
    backgroundColor: ColorPalette.dark.gray800,
  },

  option: {
    padding: 15,
  },

  bottomBorder: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  red: {
    color: ColorPalette.dark.error,
  },
});
