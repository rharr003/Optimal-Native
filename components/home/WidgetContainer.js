import { View, Text, ScrollView } from "react-native";
import CustomButton from "../ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import TotalTime from "./widgets/TotalTime";
import TotalVolume from "./widgets/TotalVolume";
import TotalNumWorkouts from "./widgets/TotalNumWorkouts";
import WeeklyNumWorkouts from "./widgets/WeeklyNumWorkouts";
import WeeklyVolume from "./widgets/WeeklyVolume";
import { ColorPalette } from "../ui/ColorPalette";

export default function WidgetContainer({ widgets }) {
  const navigation = useNavigation();
  function openAddWidgetModal() {
    navigation.navigate("AddWidgetModal");
  }
  return (
    <>
      <ScrollView>
        {widgets?.map((widget) => {
          if (widget?.shouldDisplay) {
            switch (widget?.name) {
              case "TotalNumWorkouts":
                return <TotalNumWorkouts key={widget.id} />;
              case "TotalTime":
                return <TotalTime key={widget.id} />;
              case "TotalVolume":
                return <TotalVolume key={widget.id} />;
              case "WeeklyNumWorkouts":
                return <WeeklyNumWorkouts key={widget.id} />;
              case "WeeklyVolume":
                return <WeeklyVolume key={widget.id} />;
              default:
                return null;
            }
          }
        })}
        <CustomButton
          onPress={openAddWidgetModal}
          title="Add Widget"
          iconName="add-circle-outline"
          color={ColorPalette.dark.purple500}
        />
      </ScrollView>
    </>
  );
}
