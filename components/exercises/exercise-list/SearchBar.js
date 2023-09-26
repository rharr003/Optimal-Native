import { View, TextInput, Keyboard, StyleSheet } from "react-native";
import { ColorPalette } from "../../../ColorPalette";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../../shared/ui/CustomButton";

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
        <CustomButton
          title="Add New"
          iconName="add-outline"
          color={ColorPalette.dark.gray900}
          textColor="#FFFFFF"
          style={{
            width: "40%",
            padding: 5,
            height: 35,
            justifyContent: "space-between",
            paddingHorizontal: "10%",
            margin: 0,
          }}
          onPress={handleAddModalOpen}
        />
        <SelectDropdown
          data={[
            "Any",
            "Abs",
            "Back",
            "Biceps",
            "Chest",
            "Legs",
            "Shoulders",
            "Triceps",
          ]}
          onSelect={(selectedItem, index) => {
            handleSearch({ ...search, category: selectedItem });
          }}
          defaultButtonText={"Any"}
          buttonStyle={{
            width: "40%",
            padding: 0,
            borderRadius: 15,
            backgroundColor: ColorPalette.dark.gray900,
            height: 35,
            paddingHorizontal: "10%",
          }}
          buttonTextStyle={{
            color: "#FFFFFF",
            fontSize: 16,
            textAlign: "right",
          }}
          dropdownStyle={{
            backgroundColor: ColorPalette.dark.gray900,
            borderRadius: 15,
          }}
          rowTextStyle={{ color: "#FFFFFF" }}
          showsVerticalScrollIndicator={false}
          onFocus={() => Keyboard.dismiss()}
          dropdownIconPosition="left"
          dropdownOverlayColor="transparent"
          renderDropdownIcon={() => (
            <Ionicons
              name="filter-outline"
              style={{ margin: 0 }}
              size={16}
              color="#FFFFFF"
            />
          )}
        />
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
