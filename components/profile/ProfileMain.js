import { StyleSheet, TextInput, Pressable, Keyboard } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ColorPalette } from "../../ColorPalette";
import {
  fetchUserData,
  setUserData as setUserDataDB,
} from "../../util/sqlite/db";
import { setTdee, setOverlayMessage } from "../../util/redux/slices/userData";
import calculateTdee from "../../util/calculateTdee";
import SelectorsMain from "./selectors/SelectorsMain";

export default function ProfileMain() {
  const [userData, setUserData] = useState({
    name: "test",
    height: "",
    birth_date: "",
    calorie_intake: 0,
    activity_level: "",
    biological_sex: "",
  });
  const userDataRef = useRef(userData);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const data = await fetchUserData();
      if (data)
        setUserData({
          ...data,
          heightFt: Math.floor(data.height / 12).toString(),
          heightIn: (data.height % 12).toString(),
        });
    }
    fetch();
  }, []);

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  useEffect(() => {
    async function save() {
      const data = Object.values(userDataRef.current);
      if (data.includes("")) {
        const originalData = await fetchUserData();
        if (originalData) {
          setUserData({
            ...originalData,
            heightFt: Math.floor(originalData.height / 12).toString(),
            heightIn: (originalData.height % 12).toString(),
          });
        }
        return;
      }

      const formattedUserData = {
        ...userDataRef.current,
        calorie_intake: parseInt(userDataRef.current.calorie_intake),
      };
      await setUserDataDB(formattedUserData);
      const result = await calculateTdee();
      if (typeof result === "number") {
        dispatch(setTdee(result));
        dispatch(setOverlayMessage(""));
      } else {
        dispatch(setTdee(0));
        dispatch(setOverlayMessage(result));
      }
    }
    // write updated user data to store and local db once the user navigates off this screen.
    if (!isFocused) save();
  }, [isFocused]);

  function handleChangeName(text) {
    setUserData({ ...userData, name: text });
  }

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      {/* <TextInput
        style={[styles.input, styles.inputLarge]}
        placeholder="Enter Name"
        placeholderTextColor={ColorPalette.dark.gray500}
        value={userData?.name !== "User" ? userData?.name : ""}
        onChangeText={handleChangeName}
      /> */}
      <SelectorsMain userData={userData} setUserData={setUserData} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: ColorPalette.dark.gray800,
    height: "100%",
    width: "100%",
  },

  input: {
    width: "90%",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    padding: 5,
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
    textAlign: "center",
  },

  inputLarge: {
    height: 40,
    marginVertical: 15,
  },
});
