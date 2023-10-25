import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorPalette } from "../ColorPalette";
import AddWidgetModalMain from "../components/home/add-widget-modal/AddWidgetModalMain";
import HomeMain from "../components/home/main/HomeMain";

const screenOptions = {
  contentStyle: {
    backgroundColor: ColorPalette.dark.gray900,
  },
  headerStyle: {
    backgroundColor: ColorPalette.dark.gray800,
  },
  headerTintColor: ColorPalette.dark.gray100,
};

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="main"
          options={{
            headerShown: false,
          }}
          component={HomeMain}
        />

        <Stack.Screen
          name="add-widget-modal"
          options={{
            presentation: "modal",
            headerTitle: "Edit Widgets",
          }}
          component={AddWidgetModalMain}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: ColorPalette.dark.gray900,
  },
});
