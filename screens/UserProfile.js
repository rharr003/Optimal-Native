import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { fetchUserData, setUserData as setUserDataDB } from "../util/sqlite/db";
import { ColorPalette } from "../ColorPalette";
import DatePicker from "react-native-date-picker";
import ActivityLevelSelector from "../components/profile/ActivityLevelSelector";
import { useIsFocused } from "@react-navigation/native";
import calculateTdee from "../util/calculateTdee";
import { useDispatch } from "react-redux";
import { setTdee, setOverlayMessage } from "../util/redux/userData";
import GenderSelector from "../components/profile/GenderSelector";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    heightFt: "",
    heightIn: "",
    birth_date: "",
    calorie_intake: 0,
    activity_level: "",
    biological_sex: "",
  });
  const [showModal, setShowModal] = useState(false);
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
    if (isFocused) fetch();
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
        height:
          parseInt(userDataRef.current.heightFt) * 12 +
          parseInt(userDataRef.current.heightIn),
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
    if (!isFocused) save();
  }, [isFocused]);

  function handleChangeDate(date) {
    setShowModal(false);
    setUserData({
      ...userData,
      birth_date: date.toISOString().split("T")[0],
    });
  }

  function handleChangeName(text) {
    setUserData({ ...userData, name: text });
  }

  function handleChangeActivityLevel(level) {
    let newActivityLevel = "";
    switch (level) {
      case "Little to no exercise":
        newActivityLevel = "Sedentary";
        break;
      case "Light exercise 1-3 days/week":
        newActivityLevel = "Light";
        break;
      case "Moderate exercise 3-5 days/week":
        newActivityLevel = "Moderate";
        break;
      case "Hard exercise 6-7 days/week":
        newActivityLevel = "Heavy";
        break;
    }

    setUserData({ ...userData, activity_level: newActivityLevel });
  }

  function handleChangeGender(gender) {
    setUserData((userData) => {
      return {
        ...userData,
        biological_sex: gender,
      };
    });
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleChangeFt(text) {
    setUserData({ ...userData, heightFt: text });
  }

  function handleChangeIn(text) {
    if (text > 11) return;
    setUserData({ ...userData, heightIn: text });
  }

  function dismissKeyboard() {
    Keyboard.dismiss();
  }

  return (
    <Pressable style={styles.container} onPress={dismissKeyboard}>
      <TextInput
        style={[styles.input, { height: 40, marginVertical: 15 }]}
        placeholder="Enter Name"
        placeholderTextColor={ColorPalette.dark.gray500}
        value={userData?.name !== "User" ? userData?.name : ""}
        onChangeText={handleChangeName}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          marginVertical: 15,
        }}
      >
        <ActivityLevelSelector
          handleChange={handleChangeActivityLevel}
          userData={userData}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          marginVertical: 15,
        }}
      >
        <GenderSelector handleChange={handleChangeGender} userData={userData} />
      </View>
      <View style={styles.rowView}>
        <Text style={styles.largeText}>Height: </Text>
        <View style={styles.heightInputContainer}>
          <TextInput
            style={[styles.input, styles.inputSmall]}
            value={userData?.heightFt}
            onChangeText={handleChangeFt}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />

          <Text style={[styles.smallText, { marginRight: 10 }]}>ft.</Text>

          <TextInput
            style={[styles.input, styles.inputSmall]}
            value={userData?.heightIn}
            onChangeText={handleChangeIn}
            keyboardType="numeric"
            maxLength={2}
            selectTextOnFocus
          />

          <Text style={styles.smallText}>in.</Text>
        </View>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.largeText}>Date of Birth: </Text>
        <Pressable
          onPress={() => setShowModal(true)}
          style={({ pressed }) => [
            styles.dateButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.smallText}>
            {new Date(userData?.birth_date).toLocaleDateString("en-US", {
              timeZone: "UTC",
            }) || "Select Date"}
          </Text>
        </Pressable>

        <DatePicker
          date={new Date(userData?.birth_date || Date.now())}
          modal
          open={showModal}
          onConfirm={handleChangeDate}
          onCancel={closeModal}
          mode="date"
          theme="dark"
          locale="en"
          timeZoneOffsetInMinutes={0}
        />
      </View>
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

  inputSmall: {
    width: "25%",
    fontSize: 16,
    textAlign: "right",
  },

  heightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    justifyContent: "center",
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    height: 30,
  },

  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 15,
  },

  largeText: {
    fontSize: 24,
    color: ColorPalette.dark.secondary200,
  },

  smallText: {
    fontSize: 16,
    color: ColorPalette.dark.secondary200,
  },

  dateButton: {
    backgroundColor: ColorPalette.dark.gray900,
    borderRadius: 10,
    width: 120,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.5,
  },
});
