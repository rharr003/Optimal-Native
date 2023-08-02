import { View, Text, StyleSheet } from "react-native";
import { fetchWidgets } from "../util/db";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WidgetContainer from "../components/home/WidgetContainer";
import AddWidgetModal from "../components/home/AddWidgetModal";
import { useIsFocused } from "@react-navigation/native";
import { ColorPalette } from "../components/ui/ColorPalette";

const Stack = createNativeStackNavigator();

export default function Home() {
  const isFocused = useIsFocused();
  console.log("home");
  const [widgets, setWidgets] = useState([]);
  useEffect(() => {
    async function checkWidgets() {
      const widgets = await fetchWidgets();
      setWidgets(widgets);
    }
    checkWidgets();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: ColorPalette.dark.gray900,
          },
          headerStyle: {
            backgroundColor: ColorPalette.dark.gray800,
          },
          headerTintColor: ColorPalette.dark.gray100,
        }}
      >
        <Stack.Screen
          name="main"
          options={{
            headerShown: false,
          }}
        >
          {() => <WidgetContainer widgets={widgets} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddWidgetModal"
          options={{ presentation: "modal", headerTitle: "Add Widget" }}
        >
          {() => <AddWidgetModal widgets={widgets} setWidgets={setWidgets} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
