import ActivityLevelSelector from "./activity-level/ActivityLevelSelector";
import GenderSelector from "./gender/GenderSelector";
import HeightSelector from "./height/HeightSelector";
import BirthDateSelector from "./birth-date/BirthDateSelector";

export default function SelectorsMain({ userData, setUserData }) {
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

  function handleChangeHeight(val) {
    setUserData({ ...userData, height: val });
  }

  function handleChangeDate(date) {
    setUserData({
      ...userData,
      birth_date: date.toISOString().split("T")[0],
    });
  }
  return (
    <>
      <ActivityLevelSelector
        handleChange={handleChangeActivityLevel}
        userData={userData}
      />
      <GenderSelector handleChange={handleChangeGender} userData={userData} />
      <HeightSelector handleChange={handleChangeHeight} userData={userData} />
      <BirthDateSelector handleChange={handleChangeDate} userData={userData} />
    </>
  );
}
