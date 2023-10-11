// import CenteredModal from "../../../shared/modals/CenteredModal";
// import CustomButton from "../../../shared/CustomButton";
// import { setCurrentIntake as dbSetIntake } from "../../../../util/sqlite/db";
// import { StyleSheet, View, TextInput } from "react-native";
// import { ColorPalette } from "../../../../ColorPalette";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setCurrentIntake as setCurrentIntakeRedux } from "../../../../util/redux/userData";

// export default function CalorieEntryModal({
//   setCurrentIntake,
//   showModal,
//   setShowModal,
//   refresh,
// }) {
//   const [text, setText] = useState("");
//   const dispatch = useDispatch();

//   function handleChange(text) {
//     setText(text);
//   }

//   async function handleSave() {
//     await dbSetIntake(parseFloat(text));
//     dispatch(setCurrentIntakeRedux(parseFloat(text)));
//     setCurrentIntake(parseFloat(text));
//     setShowModal(false);
//     refresh();
//   }

//   function handleClose() {
//     setShowModal(false);
//   }

//   return (
//     <CenteredModal
//       showModal={showModal}
//       handleClose={() => setShowModal(false)}
//       style={{ height: 200 }}
//     >
//       <View style={styles.modalContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Current Intake"
//           placeholderTextColor={ColorPalette.dark.gray600}
//           onChangeText={handleChange}
//           keyboardType="numeric"
//           value={text}
//         />
//         <View style={styles.buttonContainer}>
//           <CustomButton
//             title="Save"
//             color={ColorPalette.dark.secondary200}
//             onPress={handleSave}
//             style={{ width: "45%" }}
//           />

//           <CustomButton
//             title="Cancel"
//             color={ColorPalette.dark.gray500}
//             onPress={handleClose}
//             style={{ width: "45%" }}
//           />
//         </View>
//       </View>
//     </CenteredModal>
//   );
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     alignItems: "center",
//     justifyContent: "space-between",
//     height: "100%",
//     width: "100%",
//     paddingVertical: 20,
//   },

//   input: {
//     width: "95%",
//     backgroundColor: ColorPalette.dark.gray800,
//     borderRadius: 15,
//     padding: 5,
//     fontSize: 24,
//     color: ColorPalette.dark.secondary200,
//     textAlign: "center",
//   },

//   buttonContainer: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });
