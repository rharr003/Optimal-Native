export function checkWorkoutDidNotChange(workout, prevWorkout) {
  const namesAreSame = workout.name === prevWorkout.name;
  const exercisesAreSame =
    workout.exercises.length === prevWorkout.exercises.length &&
    workout.exercises.every((exercise, index) => {
      if (exercise.id !== prevWorkout.exercises[index]?.id) {
        return false;
      }
      if (exercise.sets.length !== prevWorkout.exercises[index]?.sets.length) {
        return false;
      }
      return true;
    });
  const setsAreSame = workout.exercises.every((exercise, index) => {
    return exercise.sets.every((set, setIndex) => {
      if (
        set.weight !==
        prevWorkout.exercises[index]?.sets[setIndex]?.prevWeight.toString()
      ) {
        return false;
      }
      if (
        set.reps !==
        prevWorkout.exercises[index]?.sets[setIndex]?.prevReps.toString()
      ) {
        return false;
      }
      return true;
    });
  });
  return namesAreSame && exercisesAreSame && setsAreSame;
}
