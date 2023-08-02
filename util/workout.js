import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    isActive: false,
    timer: 0,
    restTimer: 0,
    restTimerActive: false,
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
    addExercise(state, action) {
      state.workout.exercises.push(action.payload);
    },
    removeExercise(state, action) {
      state.workout.exercises = state.workout.exercises.filter(
        (exercise) => exercise.id !== action.payload.id
      );
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
      const { exerciseId, sets } = action.payload;
      const exercise = state.workout.exercises.find(
        (exercise) => exercise.id === exerciseId
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

    startRestTimer(state, action) {
      state.restTimerActive = true;
      state.restTimer = action.payload.restTime;
    },

    stopRestTimer(state) {
      state.restTimerActive = false;
      state.restTimer = 0;
    },

    incrementRestTimer(state, action) {
      state.restTimer = state.restTimer + action.payload.amount;
    },

    decrementRestTimer(state, action) {
      if (state.restTimer - action.payload.amount < 0) {
        state.restTimer = 0;
        state.restTimerActive = false;
        return;
      }

      state.restTimer = state.restTimer - action.payload.amount;
      if (state.restTimer === 0) {
        state.restTimerActive = false;
      }
    },
  },
});

export const startWorkout = workoutSlice.actions.startWorkout;
export const setWorkout = workoutSlice.actions.setWorkout;
export const stopWorkout = workoutSlice.actions.stopWorkout;
export const addExercise = workoutSlice.actions.addExercise;
export const removeExercise = workoutSlice.actions.removeExercise;
export const addSet = workoutSlice.actions.addSet;
export const completeSet = workoutSlice.actions.completeSet;
export const removeSet = workoutSlice.actions.removeSet;
export const bulkUpdateSets = workoutSlice.actions.bulkUpdateSets;
export const updateSet = workoutSlice.actions.updateSet;
export const updateWorkoutDuration = workoutSlice.actions.updateWorkoutDuration;
export const updateExerciseOrder = workoutSlice.actions.updateExerciseOrder;
export const incrementTimer = workoutSlice.actions.incrementTimer;
export const startRestTimer = workoutSlice.actions.startRestTimer;
export const stopRestTimer = workoutSlice.actions.stopRestTimer;
export const incrementRestTimer = workoutSlice.actions.incrementRestTimer;
export const decrementRestTimer = workoutSlice.actions.decrementRestTimer;
export const replaceExercise = workoutSlice.actions.replaceExercise;
export const updateExerciseRestTime =
  workoutSlice.actions.updateExerciseRestTime;
export default workoutSlice.reducer;
