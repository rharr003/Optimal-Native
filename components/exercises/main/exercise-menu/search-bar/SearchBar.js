import { View, TextInput, StyleSheet, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorPalette } from "../../../../../ColorPalette";
import AddNewButton from "./AddNewButton";
import BodyPartFilter from "./body-part-filter/BodyPartFilter";
import BodyPartFilterAndroid from "./body-part-filter/BodyPartFilterAndroid";

export default function SearchBar({
  search,
  setSearch,
  handleAddModalOpen,
  setFilteredExercises,
  exercises,
}) {
  function handleSearch(searchObj) {
    setSearch(searchObj);
    const filteredExercises = Object.keys(exercises).reduce(
      (filteredExercises, letterGroup) => {
        const filteredMuscleGroupExercises = exercises[letterGroup].filter(
          (exercise) =>
            exercise.name
              .toLowerCase()
              .includes(searchObj.name.toLowerCase()) &&
            (searchObj.category === "" ||
              searchObj.category === "Any" ||
              exercise.muscleGroup === searchObj.category)
        );
        if (filteredMuscleGroupExercises.length > 0) {
          filteredExercises[letterGroup] = filteredMuscleGroupExercises;
        }
        return filteredExercises;
      },
      {}
    );
    setFilteredExercises(filteredExercises);
  }

  return (
    <>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={ColorPalette.dark.gray500}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={ColorPalette.dark.gray500}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => handleSearch({ ...search, name: text })}
          value={search.name}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AddNewButton onPress={handleAddModalOpen} />
        {Platform.OS === "ios" && (
          <BodyPartFilter handleChange={handleSearch} search={search} />
        )}
        {Platform.OS === "android" && (
          <BodyPartFilterAndroid handleChange={handleSearch} search={search} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    padding: 10,
    width: "90%",
    color: "#FFFFFF",
    fontSize: 18,
  },

  searchContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginTop: 10,
  },
});
