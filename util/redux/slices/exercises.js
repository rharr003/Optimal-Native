import { createSlice } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: {},
  },
  reducers: {
    setExercises(state, action) {
      state.exercises = action.payload;
    },

    addExercise(state, action) {
      const letter = action.payload.letterGroup;
      console.log(action.payload);
      const newExercises = {
        ...state.exercises,
        [letter]: state.exercises[letter]
          ? [...state.exercises[letter], action.payload.newExercise].sort(
              (a, b) => a.name.localeCompare(b.name)
            )
          : [action.payload.newExercise],
      };

      // keeps keys from getting out of alphabetical order when adding a key that did not previously exist
      const sortedKeys = Object.keys(newExercises).sort((a, b) =>
        a.localeCompare(b)
      );
      let sortedExercises = {};
      sortedKeys.forEach((key) => {
        sortedExercises[key] = newExercises[key];
      });

      state.exercises = sortedExercises;
    },

    deleteExercise(state, action) {
      const letter = action.payload.letterGroup;
      const newLetterGroup = state.exercises[letter].filter(
        (exercise) => exercise.id !== action.payload.id
      );

      const newExercises = {
        ...state.exercises,
        [letter]: newLetterGroup,
      };
      // remove letter groups that only hold empty arrays
      if (!newLetterGroup.length) {
        delete newExercises[letter];
      }
      state.exercises = newExercises;
    },
    updateExercise(state, action) {
      const oldLetter = action.payload.oldLetter;
      const letter = action.payload.letterGroup;
      let newExercises;
      if (oldLetter !== letter) {
        newExercises = {
          ...state.exercises,
          [oldLetter]: state.exercises[oldLetter].filter(
            (exercise) => exercise.id !== action.payload.id
          ),
          [letter]: state.exercises[letter]
            ? [...state.exercises[letter], action.payload.exercise].sort(
                (a, b) => a.name.localeCompare(b.name)
              )
            : [action.payload.exercise],
        };
      } else {
        newExercises = {
          ...state.exercises,
          [letter]: state.exercises[letter]
            ? state.exercises[letter]
                .map((exercise) => {
                  if (exercise.id === action.payload.id) {
                    return action.payload.exercise;
                  }
                  return exercise;
                })
                .sort((a, b) => a.name.localeCompare(b.name))
            : [action.payload.exercise],
        };
      }
      // remove letter groups that only hold empty arrays
      if (!newExercises[oldLetter].length) delete newExercises[oldLetter];

      // keeps keys from getting out of alphabetical order when adding a key that did not previously exist
      const sortedKeys = Object.keys(newExercises).sort((a, b) =>
        a.localeCompare(b)
      );
      let sortedExercises = {};
      sortedKeys.forEach((key) => {
        sortedExercises[key] = newExercises[key];
      });

      state.exercises = sortedExercises;
    },
  },
});

export default exerciseSlice.reducer;
export const { setExercises, addExercise, deleteExercise, updateExercise } =
  exerciseSlice.actions;
