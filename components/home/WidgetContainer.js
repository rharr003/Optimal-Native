import { View, Text, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import TotalTime from "./widgets/TotalTime";
import WeeklyNumWorkouts from "./widgets/WeeklyNumWorkouts";
import WeeklyVolume from "./widgets/WeeklyVolume";
import { ColorPalette } from "../ui/ColorPalette";
import AllTimeStats from "./widgets/AllTimeStats";

export default function WidgetContainer({ widgets }) {
  const navigation = useNavigation();
  function openAddWidgetModal() {
    navigation.navigate("AddWidgetModal");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      {widgets?.map((widget) => {
        if (widget?.shouldDisplay) {
          switch (widget?.name) {
            case "AllTimeStats":
              return <AllTimeStats key={widget.id} />;
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
        title="Edit Widgets"
        iconName="add-circle-outline"
        textColor={ColorPalette.dark.secondary200}
        style={{ marginTop: 80, marginBottom: 50 }}
      />
      <View style={styles.footer}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",

    paddingTop: 50,
  },

  footer: {
    height: 50,
    width: "100%",
  },
});
