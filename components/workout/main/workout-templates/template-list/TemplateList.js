import { FlatList, StyleSheet } from "react-native";
import { ColorPalette } from "../../../../../ColorPalette";
import TemplateItemMain from "./template-list-item/TemplateItemMain";
export default function TemplateList({
  templates,
  handleSelect,
  setShowModal,
}) {
  return (
    <FlatList
      data={templates}
      numColumns={2}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <TemplateItemMain
          template={item}
          handleSelect={handleSelect}
          setShowModal={setShowModal}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },

  content: {
    marginVertical: 10,
    alignItems: "flex-start",
  },

  columnWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
