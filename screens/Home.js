import { View, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorPalette } from "../ColorPalette";
import AddWidgetModalMain from "../components/home/add-widget/AddWidgetModalMain";
import HomeMain from "../components/home/main/HomeMain";
import AndroidScreenHeader from "../components/shared/ui/AndroidScreenHeader";

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
        {Platform.OS === "ios" ? (
          <Stack.Screen
            name="add-widget-modal"
            options={{
              presentation: "modal",
              headerTitle: "Edit Widgets",
            }}
            component={AddWidgetModalMain}
          />
        ) : (
          <Stack.Screen
            name="add-widget-modal"
            options={{
              header: (props) => (
                <AndroidScreenHeader
                  goBack={props.navigation.goBack}
                  name={"Manage Widgets"}
                />
              ),
            }}
            component={AddWidgetModalMain}
          />
        )}
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
