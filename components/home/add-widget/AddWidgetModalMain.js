import { ScrollView } from "react-native";
import AddWidgetModalItem from "./AddWidgetModalItem";
import { useSelector } from "react-redux";

export default function AddWidgetModalMain() {
  const widgets = useSelector((state) => state.widgets.widgetList);
  return (
    <ScrollView>
      {widgets.map((widget) => (
        <AddWidgetModalItem key={widget.id} widget={widget} />
      ))}
    </ScrollView>
  );
}
