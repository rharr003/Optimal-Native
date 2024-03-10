import { createSlice } from "@reduxjs/toolkit";

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
      // exercises: [],
      exercisesNew: [],
      exerciseSets: {},
      duration: 0,
    },
    selectedExercises: {},
    isReplacing: false,
    prevWorkout: null,
  },
  reducers: {
    startWorkout(state, action) {
      state.isActive = true;
      state.timer = 0;
    },

    addSelectedExercise(state, action) {
      if (state.isReplacing) {
        const obj = {
          [action.payload.id]: action.payload.exercise,
        };

        state.selectedExercises = obj;
        return;
      }
      state.selectedExercises[action.payload.id] = action.payload.exercise;
    },

    removeSelectedExercise(state, action) {
      // this may not play nice with redux
      const copy = state.selectedExercises;
      delete copy[action.payload.id];
      state.selectedExercises = copy;
    },

    startReplacing(state, action) {
      state.isReplacing = true;
      state.selectedExercises[action.payload.id] = action.payload.exercise;
    },

    clearSelectedExercises(state, action) {
      state.selectedExercises = {};
      state.isReplacing = false;
    },

    addInterval(state, action) {
      if (state.timerIntervals.length > 0) {
        clearAllIntervals(state);
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

    setWorkoutFromAppState(state, action) {
      state.workout = action.payload.workout;
      state.prevWorkout = action.payload.prevWorkout;
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
        isTemplate: false,
        prevWorkoutId: null,
        exercises: [],
        exercisesNew: [],
        exerciseSets: {},
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
      state.workout.exercisesNew = [
        ...state.workout.exercisesNew,
        ...action.payload.exercises,
      ];
      action.payload.setsArray.forEach((exercise) => {
        state.workout.exerciseSets[exercise.id] = exercise.sets;
      });
    },
    removeExercise(state, action) {
      const { id, index } = action.payload;
      state.workout.exercisesNew.splice(index, 1);
      const newState = state.workout.exerciseSets;
      delete newState[id];
      state.workout.exerciseSets = newState;
    },
    updateExerciseOrder(state, action) {
      state.workout.exercisesNew = action.payload;
    },

    replaceExercise(state, action) {
      const index = action.payload.index;
      const exercise = action.payload.exercise;
      const newState = state.workout.exerciseSets;
      delete newState[action.payload.oldId];
      newState[action.payload.exercise.reactId] = action.payload.sets;
      state.workout.exerciseSets = newState;
      state.workout.exercisesNew[index] = exercise;
    },

    updateExerciseRestTime(state, action) {
      const { id, restTime } = action.payload;
      const newExercises = state.workout.exercisesNew.map((exercise) => {
        if (exercise.id === id) {
          return {
            ...exercise,
            restTime,
          };
        }
        return exercise;
      });
      state.workout.exercisesNew = newExercises;
    },

    addSet(state, action) {
      const { id } = action.payload;
      const emptySet = {
        weight: "",
        reps: "",
        prevReps: null,
        prevWeight: null,
        completed: false,
        unit: action.payload.unit,
      };
      state.workout.exerciseSets[id].push(emptySet);
    },

    toggleUnit(state, action) {
      const { id, newUnit } = action.payload;
      const newState = state.workout.exerciseSets[id].map((set) => ({
        ...set,
        unit: newUnit,
      }));

      state.workout.exerciseSets[id] = newState;
    },

    removeSet(state, action) {
      const { id, setIndex } = action.payload;
      state.workout.exerciseSets[id].splice(setIndex, 1);
    },

    updateSet(state, action) {
      const copy =
        state.workout.exerciseSets[action.payload.id][action.payload.index];
      state.workout.exerciseSets[action.payload.id][action.payload.index] = {
        ...copy,
        [action.payload.type]: action.payload.text,
      };
    },
    completeSet(state, action) {
      const copy =
        state.workout.exerciseSets[action.payload.id][action.payload.index];
      if (!copy.reps && copy.templateReps !== "0" && copy.templateReps) {
        copy.reps = copy.templateReps.toString();
      }
      if (!copy.weight && copy.templateWeight !== "0" && copy.templateWeight) {
        copy.weight = copy.templateWeight.toString();
      }
      state.workout.exerciseSets[action.payload.id][action.payload.index] = {
        ...copy,
        completed: !copy.completed,
      };
    },

    incrementTimer(state, action) {
      state.timer = state.timer + action.payload.amount;
    },
  },
});

export const startWorkout = workoutSlice.actions.startWorkout;
export const toggleUnit = workoutSlice.actions.toggleUnit;
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
export const updateSet = workoutSlice.actions.updateSet;
export const updateExerciseOrder = workoutSlice.actions.updateExerciseOrder;
export const incrementTimer = workoutSlice.actions.incrementTimer;
export const replaceExercise = workoutSlice.actions.replaceExercise;
export const updateExerciseRestTime =
  workoutSlice.actions.updateExerciseRestTime;
export const addSelectedExercise = workoutSlice.actions.addSelectedExercise;
export const clearSelectedExercises =
  workoutSlice.actions.clearSelectedExercises;
export const removeSelectedExercise =
  workoutSlice.actions.removeSelectedExercise;
export const startReplacing = workoutSlice.actions.startReplacing;
export const setWorkoutFromAppState =
  workoutSlice.actions.setWorkoutFromAppState;
export default workoutSlice.reducer;
