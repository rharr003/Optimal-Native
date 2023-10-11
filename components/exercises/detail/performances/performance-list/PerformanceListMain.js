import { View, Text, FlatList, StyleSheet } from "react-native";
import PerformanceListHeader from "./PerformanceListHeader";
import PerformanceListItem from "./PerformanceListItem";
import { ColorPalette } from "../../../../../ColorPalette";

export default function PerformanceListMain({
  data,
  thirdColumnName,
  equipment,
}) {
  function ListFooter() {
    return <View style={styles.footer} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Performances</Text>
      <PerformanceListHeader thirdColumnName={thirdColumnName} />
      <FlatList
        data={data}
        style={styles.listStyle}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={ListFooter}
        renderItem={({ item, index }) => {
          return (
            <PerformanceListItem
              performance={item}
              index={index}
              equipment={equipment}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listStyle: {
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorPalette.dark.gray300,
    marginBottom: 10,
  },

  footer: {
    height: 40,
  },
});
