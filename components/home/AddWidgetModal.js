import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import AddWidgetModalItem from "./AddWidgetModalItem";
import CustomButton from "../ui/CustomButton";
import { updateWidget } from "../../util/db";
import { useNavigation } from "@react-navigation/native";

export default function AddWidgetModal({ widgets, setWidgets }) {
  const [widgetList, setWidgetList] = useState(widgets);
  const navigation = useNavigation();
  async function handleAddWidget(id, shouldDisplay) {
    // setWidgetList((prev) => ({
    //   ...prev,
    //   [idAsString]: {
    //     ...prev[idAsString],
    //     shouldDisplay: !prev[idAsString].shouldDisplay,
    //   },
    // }));
    await updateWidget(id, !shouldDisplay);
    setWidgets((prev) =>
      prev.map((widget) => {
        if (widget.id === id) {
          return {
            ...widget,
            shouldDisplay: !shouldDisplay,
          };
        }
        return widget;
      })
    );
    navigation.goBack();
  }
  return (
    <ScrollView>
      {widgets.map((widget) => (
        <AddWidgetModalItem
          key={widget.id}
          widgetName={widget.displayName}
          shouldDisplay={widget.shouldDisplay}
          widgetDescription={widget.description}
          onSelect={() => handleAddWidget(widget.id, widget.shouldDisplay)}
        />
      ))}
    </ScrollView>
  );
}
