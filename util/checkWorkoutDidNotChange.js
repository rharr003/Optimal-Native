export function checkWorkoutDidNotChange(workout, prevWorkout) {
  const namesAreSame = workout.name === prevWorkout.name;
  if (!namesAreSame) return false;
  const numExercisesAreSame =
    workout.exercisesNew.length === prevWorkout.exercisesNew.length;
  if (!numExercisesAreSame) return false;
  const exercisesAreSame = workout.exercisesNew.every((exercise, index) => {
    if (exercise.id !== prevWorkout.exercisesNew[index]?.id) {
      return false;
    }
    return true;
  });
  if (!exercisesAreSame) return false;

  const numSetsNew = Object.keys(workout.exerciseSets).reduce((acc, key) => {
    // only count completed sets
    return (acc += workout.exerciseSets[key].filter(
      (set) => set.completed === true
    ).length);
  }, 0);
  const numSetsOld = Object.keys(prevWorkout.exerciseSets).reduce(
    // we dont check for completed sets on the old workout because we wouldnt save it unless it was completed
    (acc, key) => {
      return (acc += prevWorkout.exerciseSets[key].length);
    },
    0
  );
  if (numSetsNew !== numSetsOld) return false;
  const setsAreSame = Object.keys(workout.exerciseSets).every((key, index) => {
    return workout.exerciseSets[key].every((set, setIndex) => {
      const weight = set.weight ? set.weight : "0";
      if (
        weight !==
        prevWorkout.exerciseSets[key][setIndex]?.prevWeight.toString()
      ) {
        if (prevWorkout.exerciseSets[key][setIndex]?.prevWeight.toString()) {
          return false;
        }
      }
      if (
        set.reps !==
        prevWorkout.exerciseSets[key][setIndex]?.prevReps.toString()
      ) {
        console.log(
          setIndex,
          set.reps,
          prevWorkout.exerciseSets[key][setIndex]?.prevReps.toString()
        );
        if (prevWorkout.exerciseSets[key][setIndex]?.prevReps.toString()) {
          return false;
        }
      }
      return true;
    });
  });
  return setsAreSame;
}
