import { View, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../../shared/ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import WeeklyNumWorkoutsMain from "./WeeklyNumWorkoutsMain";
import WeeklyVolumeMain from "./WeeklyVolumeMain";
import { ColorPalette } from "../../../../ColorPalette";
import AllTimeStatsMain from "./all-time-stats/AllTimeStatsMain";
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
      showsVerticalScrollIndicator={false}
    >
      {widgets?.map((widget) => {
        if (widget?.shouldDisplay) {
          switch (widget?.name) {
            case "AllTimeStats":
              return <AllTimeStatsMain key={widget.id} />;
            case "WeeklyNumWorkouts":
              return <WeeklyNumWorkoutsMain key={widget.id} />;
            case "WeeklyVolume":
              return <WeeklyVolumeMain key={widget.id} />;
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
    marginTop: 0,
    marginBottom: 50,
  },
});
