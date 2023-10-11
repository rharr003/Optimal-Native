export function calculateWorkoutVolume(workout) {
  const volume = workout.exercises.reduce((acc, exercise) => {
    let exerciseVolume = 0;
    exercise.sets.forEach((set) => {
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
