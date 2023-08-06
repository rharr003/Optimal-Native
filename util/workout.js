import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    isActive: false,
    timer: 0,
    workout: {
      name: "My Workout",
      exercises: [],
      duration: 0,
    },
  },
  reducers: {
    startWorkout(state, action) {
      state.isActive = true;
    },

    setWorkout(state, action) {
      state.workout = action.payload;
    },

    stopWorkout(state) {
      state.isActive = false;
      state.restTimerActive = false;
      state.restTimer = 0;
      state.initialRestTime = 0;
      state.timer = 0;
      state.workout = {
        name: "My Workout",
        exercises: [],
        duration: 0,
      };
    },
    updateWorkoutDuration(state, action) {
      state.workout.duration = state.workout.duration + 1;
    },

    bulkAddExercises(state, action) {
      state.workout.exercises = [...state.workout.exercises, ...action.payload];
    },
    removeExercise(state, action) {
      const { id, index } = action.payload;
      state.workout.exercises.splice(index, 1);
    },
    updateExerciseOrder(state, action) {
      console.log(
        "action payload vals:",
        action.payload[0].sets.length,
        action.payload[1].sets.length
      );
      state.workout.exercises = action.payload;
    },

    replaceExercise(state, action) {
      const index = action.payload.index;
      const exercise = action.payload.exercise;
      state.workout.exercises[index] = exercise;
    },

    updateExerciseRestTime(state, action) {
      const { id, restTime } = action.payload;
      const exercise = state.workout.exercises.find(
        (exercise) => exercise.id === id
      );
      exercise.restTime = restTime;
    },

    addSet(state, action) {
      const { exerciseId } = action.payload;
      const exercise = state.workout.exercises.find(
        (exercise) => exercise.id === exerciseId
      );
      exercise.sets.push({
        prevWeight: null,
        prevReps: null,
        weight: "",
        reps: "",
        completed: false,
      });
    },
    bulkUpdateSets(state, action) {
      const { reactId, sets } = action.payload;
      const exercise = state.workout.exercises.find(
        (exercise, idx) => exercise.reactId === reactId
      );
      if (exercise) exercise.sets = sets;
    },

    updateSet(state, action) {
      const { exerciseId, setNum, weight, reps } = action.payload;
      const exercise = state.workout.exercises.find(
        (exercise) => exercise.id === exerciseId
      );
      exercise.sets[setNum] = {
        ...exercise.sets[setNum],
        weight,
        reps,
      };
    },

    completeSet(state, action) {
      const { exerciseId, setNum, weight, reps } = action.payload;
      const exercise = state.workout.exercises.find(
        (exercise) => exercise.id === exerciseId
      );
      exercise.sets[setNum] = {
        ...exercise.sets[setNum],
        weight,
        reps,
        completed: !exercise.sets[setNum].completed,
      };
    },

    removeSet(state, action) {
      const { exerciseId, setIndex } = action.payload;
      state.workout.exercises = state.workout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          exercise.sets = exercise.sets.filter((set, idx) => idx !== setIndex);
        }
        return exercise;
      });
    },

    incrementTimer(state, action) {
      state.timer = state.timer + action.payload.amount;
    },
  },
});

export const startWorkout = workoutSlice.actions.startWorkout;
export const setWorkout = workoutSlice.actions.setWorkout;
export const stopWorkout = workoutSlice.actions.stopWorkout;
export const bulkAddExercises = workoutSlice.actions.bulkAddExercises;
export const removeExercise = workoutSlice.actions.removeExercise;
export const addSet = workoutSlice.actions.addSet;
export const completeSet = workoutSlice.actions.completeSet;
export const removeSet = workoutSlice.actions.removeSet;
export const bulkUpdateSets = workoutSlice.actions.bulkUpdateSets;
export const updateSet = workoutSlice.actions.updateSet;
export const updateWorkoutDuration = workoutSlice.actions.updateWorkoutDuration;
export const updateExerciseOrder = workoutSlice.actions.updateExerciseOrder;
export const incrementTimer = workoutSlice.actions.incrementTimer;
export const replaceExercise = workoutSlice.actions.replaceExercise;
export const updateExerciseRestTime =
  workoutSlice.actions.updateExerciseRestTime;
export default workoutSlice.reducer;
