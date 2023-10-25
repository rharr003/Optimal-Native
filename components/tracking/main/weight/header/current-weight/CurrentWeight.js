import { Text, StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import { fetchLastMetricValue } from "../../../../../../util/sqlite/db";
import { ColorPalette } from "../../../../../../ColorPalette";
import CustomButton from "../../../../../shared/ui/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { updateWeight } from "../../../../../../util/redux/slices/userData";

export default function CurrentWeight() {
  const currWeight = useSelector(
    (state) => state.userData.currentWeight.weight
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function handlePress() {
    navigation.navigate("weight-detail", {
      metric: { id: 1, name: "weight", unit: "lbs" },
    });
  }

  useEffect(() => {
    async function fetch() {
      const result = await fetchLastMetricValue(1);
      if (result) {
        dispatch(updateWeight({ weight: result.value, date: result.date }));
      }
    }
    fetch();
  }, []);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Text style={[styles.text, currWeight ? null : styles.italic]}>
        {currWeight ? currWeight + " lbs" : "No Data"}
      </Text>
      <CustomButton
        title=""
        color={ColorPalette.dark.secondary200}
        iconName="add"
        onPress={handlePress}
        style={styles.buttonStyle}
        size={20}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: ColorPalette.dark.secondary200,
    fontSize: 20,
  },

  buttonStyle: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  italic: {
    fontStyle: "italic",
    color: ColorPalette.dark.gray500,
  },

  pressed: {
    opacity: 0.5,
  },
});
