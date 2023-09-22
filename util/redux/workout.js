import { createSlice } from "@reduxjs/toolkit";

let interval = null;

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    isActive: false,
    timer: 0,
    timerIntervals: [],
    workout: {
      name: "My Workout",
      isTemplate: false,
      prevWorkoutId: null,
      exercises: [],
      duration: 0,
    },
    prevWorkout: null,
  },
  reducers: {
    startWorkout(state, action) {
      state.isActive = true;
      state.timer = 0;
    },

    addInterval(state, action) {
      if (state.timerIntervals.length > 0) {
        state.timerIntervals.forEach((interval) => {
          clearInterval(interval);
        });
        state.timerIntervals = [];
      }
      state.timerIntervals.push(action.payload);
    },

    clearAllIntervals(state) {
      state.timerIntervals.forEach((interval) => {
        clearInterval(interval);
      });
      state.timerIntervals = [];
    },

    setWorkout(state, action) {
      state.workout = action.payload;
      state.prevWorkout = action.payload;
      state.isActive = true;
    },

    stopWorkout(state) {
      state.isActive = false;
      state.restTimerActive = false;
      state.restTimer = 0;
      state.initialRestTime = 0;
      state.timerIntervals.forEach((interval) => {
        clearInterval(interval);
      });
      state.timerIntervals = [];
      state.timer = 0;
      state.workout = {
        name: "My Workout",
        exercises: [],
        duration: 0,
      };
    },
    updateWorkoutDuration(state, action) {
      state.workout.duration = action.payload.duration;
    },

    updateWorkoutName(state, action) {
      state.workout.name = action.payload.name;
    },

    bulkAddExercises(state, action) {
      state.workout.exercises = [...state.workout.exercises, ...action.payload];
    },
    removeExercise(state, action) {
      const { id, index } = action.payload;
      state.workout.exercises.splice(index, 1);
    },
    updateExerciseOrder(state, action) {
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
export const addInterval = workoutSlice.actions.addInterval;
export const clearAllIntervals = workoutSlice.actions.clearAllIntervals;
export const updateWorkoutDuration = workoutSlice.actions.updateWorkoutDuration;
export const updateWorkoutName = workoutSlice.actions.updateWorkoutName;
export const bulkAddExercises = workoutSlice.actions.bulkAddExercises;
export const removeExercise = workoutSlice.actions.removeExercise;
export const addSet = workoutSlice.actions.addSet;
export const completeSet = workoutSlice.actions.completeSet;
export const removeSet = workoutSlice.actions.removeSet;
export const bulkUpdateSets = workoutSlice.actions.bulkUpdateSets;
export const updateSet = workoutSlice.actions.updateSet;
export const updateExerciseOrder = workoutSlice.actions.updateExerciseOrder;
export const incrementTimer = workoutSlice.actions.incrementTimer;
export const replaceExercise = workoutSlice.actions.replaceExercise;
export const updateExerciseRestTime =
  workoutSlice.actions.updateExerciseRestTime;
export default workoutSlice.reducer;
