export function calculateWorkoutVolume(workout) {
  const keys = Object.keys(workout.exerciseSets);
  const volume = keys.reduce((acc, key) => {
    let exerciseVolume = 0;
    workout.exerciseSets[key].forEach((set) => {
      if (set.unit === "lbs") {
        exerciseVolume += set.weight * set.reps;
      } else {
        exerciseVolume += set.weight * 2.20462 * set.reps;
      }
    });
    return (acc += exerciseVolume);
  }, 0);

  return volume.toFixed(0);
}
