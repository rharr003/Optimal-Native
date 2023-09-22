import { ScrollView } from "react-native";
import AddWidgetModalItem from "./AddWidgetModalItem";

import { updateWidget } from "../../util/sqlite/db";

export default function AddWidgetModal({ widgets, setWidgets }) {
  async function handleAddWidget(id, shouldDisplay) {
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
