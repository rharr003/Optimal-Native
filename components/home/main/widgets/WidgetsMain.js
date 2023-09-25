import { View, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../../shared/CustomButton";
import { useNavigation } from "@react-navigation/native";
import WeeklyNumWorkouts from "./weekly-num-workouts/WeeklyNumWorkouts";
import WeeklyVolume from "./weekly-volume/WeeklyVolume";
import { ColorPalette } from "../../../../ColorPalette";
import AllTimeStats from "./all-time-stats/AllTimeStats";
import { useSelector } from "react-redux";

export default function WidgetMain() {
  const widgets = useSelector((state) => state.widgets.widgetList);
  const navigation = useNavigation();

  function openAddWidgetModal() {
    navigation.navigate("add-widget-modal");
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
        style={styles.customButtonStyle}
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

  customButtonStyle: {
    marginTop: 80,
    marginBottom: 50,
  },
});
