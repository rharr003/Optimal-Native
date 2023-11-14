import { fetchUserData, fetchLastMetricValue } from "./sqlite/db";

export default async function calculateTdee() {
  try {
    const data = await fetchUserData();
    if (!data) return "Tap to set up profile for full Insights";
    const currWeight = await fetchLastMetricValue(1);

    if (currWeight?.value && data.activity_level !== "placeholder") {
      let activityFactor = 0;
      switch (data.activity_level) {
        case "Sedentary":
          activityFactor = 1.1;
          break;
        case "Light":
          activityFactor = 1.3;
          break;
        case "Moderate":
          activityFactor = 1.45;
          break;
        case "Heavy":
          activityFactor = 1.65;
          break;
      }
      const currWeightInKG = parseFloat(currWeight.value) * 0.453592;
      const heightInCM = parseFloat(data.height) * 2.54;
      const birthday = new Date(data.birth_date);
      const age = new Date().getFullYear() - birthday.getFullYear();
      let bmr = 0;
      if (data.biological_sex === "Male") {
        bmr = 66 + (13.7 * currWeightInKG + 5 * heightInCM - 6.8 * age);
      } else {
        bmr = 655 + (9.6 * currWeightInKG + 1.8 * heightInCM - 4.7 * age);
      }
      const tdee = Math.floor(bmr * activityFactor);
      return tdee;
    } else if (data.activity_level === "placeholder") {
      return "Tap to set up profile for full Insights";
    } else {
      return "No recent weight data";
    }
  } catch (e) {
    console.log(e);
  }
}
