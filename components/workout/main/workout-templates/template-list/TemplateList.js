import { FlatList } from "react-native";
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
      renderItem={({ item }) => (
        <TemplateItemMain
          template={item}
          handleSelect={handleSelect}
          setShowModal={setShowModal}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={{ width: "100%" }}
    />
  );
}
