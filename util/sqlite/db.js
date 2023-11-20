import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const db = SQLite.openDatabase("optimal.db");

export const init = async () => {
  if (
    !(await AsyncStorage.getItem("dbInitialized")) ||
    !(await getAllTableName())
  ) {
    const promiseArray = [];
    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            muscleGroup TEXT NOT NULL,
            equipment TEXT NOT NULL,
            restTime INTEGER NOT NULL DEFAULT 60,
            UNIQUE(name, equipment));`,

            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS user_info (
              id INTEGER PRIMARY KEY NOT NULL,
              name TEXT NOT NULL default 'User',
              birth_date TEXT NOT NULL DEFAULT '1990-01-01',
              calorie_intake INTEGER NOT NULL default 2000,
              activity_level TEXT NOT NULL default 'placeholder',
              height INTEGER NOT NULL default 66,
              biological_sex TEXT NOT NULL default 'Male');`,

            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            duration TEXT NOT NULL);`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS workout_exercises (
            id INTEGER PRIMARY KEY NOT NULL,
            workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
            exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
            weight INTEGER NOT NULL,
            reps INTEGER NOT NULL,
            unit TEXT NOT NULL);`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS metrics (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            unit TEXT NOT NULL);`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS user_metrics (
            id INTEGER PRIMARY KEY NOT NULL,
            metric_id INTEGER NOT NULL REFERENCES metrics(id) ON DELETE CASCADE,
            value TEXT NOT NULL,
            date DATE NOT NULL);`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS templates (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE);`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS widgets (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            displayName TEXT NOT NULL,
            description TEXT NOT NULL,
            shouldDisplay BOOLEAN NOT NULL);`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );

    await Promise.all(promiseArray);
    console.log("Database initialized");
    await seedWidgets();
    await seedExercises();
    await seedMetrics();
    // await createUser();
    // await seedUserWeight();
    //seed more data here
    // save database initialization to async storage

    await AsyncStorage.setItem("dbInitialized", "true");
  } else {
    console.log("Database already initialized skipping");
  }
};

export const wipeDatabase = async () => {
  const promiseArray = [];
  const tables = [
    "exercises",
    "workouts",
    "workout_exercises",
    "metrics",
    "user_metrics",
    "templates",
    "widgets",
    "user_info",
  ];

  tables.forEach((table) => {
    promiseArray.push(
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `DROP TABLE IF EXISTS ${table};`,
            [],
            () => {
              resolve();
            },
            (_, err) => reject(err)
          );
        });
      })
    );
  });

  await Promise.all(promiseArray);
  await AsyncStorage.removeItem("dbInitialized");
  console.log("Database wiped");
};

export const fetchUserData = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name, birth_date, calorie_intake, activity_level, height, biological_sex FROM user_info;`,
        [],
        (_, result) => {
          if (!result.rows._array.length) {
            return resolve(null);
          } else {
            resolve(result.rows._array[0]);
          }
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const setUserData = async ({
  name,
  birth_date,
  calorie_intake,
  activity_level,
  height,
  biological_sex,
}) => {
  const user = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_info;`,
        [],
        (_, result) => {
          if (result.rows._array.length === 0) {
            return resolve(null);
          }
          resolve(result.rows._array[0]);
        },
        (_, err) => reject(err)
      );
    });
  });
  if (!user) {
    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO user_info (name, birth_date, calorie_intake, activity_level, height, biological_sex) VALUES (?, ?, ?, ?, ?, ?);`,
          [
            name,
            birth_date,
            calorie_intake,
            activity_level,
            height,
            biological_sex,
          ],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
  } else {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE user_info SET name = ?, birth_date = ?, calorie_intake = ?, activity_level = ?, height = ?, biological_sex = ?;`,
          [
            name,
            birth_date,
            calorie_intake,
            activity_level,
            height,
            biological_sex,
          ],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
    return promise;
  }
};

export const fetchCurrentIntake = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_info;`,
        [],
        (_, result) => {
          if (result.rows._array.length === 0) {
            return resolve(null);
          }
          resolve(result.rows._array[0].calorie_intake);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const setCurrentIntake = async (intake) => {
  const user = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_info;`,
        [],
        (_, result) => {
          if (result.rows._array.length === 0) {
            return resolve(null);
          }
          resolve(result.rows._array[0]);
        },
        (_, err) => reject(err)
      );
    });
  });
  if (!user) {
    await new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO user_info (calorie_intake) VALUES (?);`,
          [intake],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
  } else {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE user_info SET calorie_intake = ?;`,
          [intake],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
    return promise;
  }
};

export const insertExercise = (name, equipment, muscleGroup) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO exercises (name,  equipment, muscleGroup) VALUES (?, ?, ? ) ;`,
        [name, equipment, muscleGroup],
        (_, result) => resolve(result.insertId),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const updateExerciseRestTime = (id, restTime) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE exercises SET restTime = ? WHERE id = ?;`,
        [restTime, id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

function buildExerciseObj(arr) {
  const exerciseObj = arr.reduce((acc, curr) => {
    if (acc[curr.name[0]]) {
      acc[curr.name[0]].push({
        id: curr.id,
        name: curr.name,
        equipment: curr.equipment,
        muscleGroup: curr.muscleGroup,
        restTime: curr.restTime,
      });
      return acc;
    } else {
      acc[curr.name[0]] = [
        {
          id: curr.id,
          name: curr.name,
          equipment: curr.equipment,
          muscleGroup: curr.muscleGroup,
          restTime: curr.restTime,
        },
      ];
      return acc;
    }
  }, {});

  return exerciseObj;
}

export const fetchExercises = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM exercises ORDER BY exercises.name;`,
        [],
        (_, result) => resolve(buildExerciseObj(result.rows._array)),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchExercise = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM exercises WHERE id = ?;`,
        [id],
        (_, result) => resolve(result.rows._array[0]),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const updateExercise = (id, name, equipment, muscleGroup) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE exercises SET name = ?, equipment = ?, muscleGroup = ? WHERE id = ?;`,
        [name, equipment, muscleGroup, id],
        (_, result) => resolve(result.rows._array[0]),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteExercise = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM exercises WHERE id = ?;`,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchRecentExercisePerformance = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT weight, reps, unit FROM workout_exercises WHERE exercise_id = ? AND workout_id = (SELECT workout_id FROM workout_exercises WHERE exercise_id = ? ORDER BY workout_id DESC LIMIT 1);`,
        [id, id],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertWorkout = (name, duration, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO workouts (name, duration, date) VALUES (?, ?, ?);`,
        [name, duration, date],
        (_, result) => resolve(result.insertId),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchWorkouts = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workouts.id, workouts.name AS workout_name, exercises.name, date, duration, exercises.id as exercise_id, weight, reps, unit FROM workouts JOIN workout_exercises ON workouts.id = workout_exercises.workout_id JOIN exercises ON workout_exercises.exercise_id = exercises.id ORDER BY workouts.id DESC LIMIT 180;`,
        [],
        (_, result) => {
          const workouts = result.rows._array.reduce((acc, curr) => {
            if (acc[curr.id]) {
              if (
                !acc[curr.id].exercises.some(
                  (exercise) => exercise.id === curr.exercise_id
                )
              ) {
                acc[curr.id].exercises.push({
                  id: curr.exercise_id,
                  name: curr.name,
                  setCount: 1,
                  sets: [
                    { weight: curr.weight, reps: curr.reps, unit: curr.unit },
                  ],
                });
              } else {
                acc[curr.id].exercises.forEach((exercise) => {
                  if (exercise.id === curr.exercise_id) {
                    exercise.setCount++;
                    exercise.sets.push({
                      weight: curr.weight,
                      reps: curr.reps,
                      unit: curr.unit,
                    });
                  }
                });
              }

              return acc;
            } else {
              acc[curr.id] = {
                name: curr.workout_name,
                date: curr.date,
                duration: curr.duration,
                exercises: [
                  {
                    id: curr.exercise_id,
                    name: curr.name,
                    setCount: 1,
                    sets: [
                      { weight: curr.weight, reps: curr.reps, unit: curr.unit },
                    ],
                  },
                ],
              };
              return acc;
            }
          }, {});
          const formattedResult = Object.keys(workouts)
            .map((key) => ({
              id: key,
              name: workouts[key].name,
              date: workouts[key].date,
              duration: workouts[key].duration,
              exercises: workouts[key].exercises,
            }))
            .sort((a, b) => b.id - a.id);
          resolve(formattedResult);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchWorkout = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM workouts WHERE id = ?;`,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchNumWorkoutsAllTime = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) FROM workouts;`,
        [],
        (_, result) => resolve(result.rows._array[0]["COUNT(*)"]),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchTotalTimeAllTime = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT SUM(duration) FROM workouts;`,
        [],

        (_, result) => {
          if (result.rows._array[0]["SUM(duration)"] === null) {
            return resolve(0);
          }
          resolve(result.rows._array[0]["SUM(duration)"]);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import { formatWeeklyNumWorkouts } from "../chart/home/weeklyNumWorkouts";

export const fetchNumWorkoutsLastSixWeeks = () => {
  const now = new Date().toISOString().split("T")[0];
  const sixWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 42));
  const dayOfWeekSixWeeksAgo = sixWeeksAgo.getDay();
  const sixWeeksAgoAdjusted =
    sixWeeksAgo.getDate() -
    dayOfWeekSixWeeksAgo +
    (dayOfWeekSixWeeksAgo === 0 ? -6 : 1);

  const sixWeeksAgoAdjustedDate = new Date(
    sixWeeksAgo.setDate(sixWeeksAgoAdjusted)
  )
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT date FROM workouts WHERE date BETWEEN ? AND ?;`,
        [sixWeeksAgoAdjustedDate, now],
        (_, result) => {
          const data = formatWeeklyNumWorkouts(
            result.rows._array,
            new Date(sixWeeksAgoAdjustedDate),
            new Date(now)
          );
          resolve(data);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import { abbreviateNum } from "./abbreviateNum";

export const getTotalVolumeAllTime = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT weight, reps, unit FROM workout_exercises;`,
        [],
        (_, result) => {
          if (result.rows._array.length === 0) {
            return resolve(0);
          }
          const totalVolume = result.rows._array.reduce((acc, curr) => {
            if (curr.unit === "lbs") {
              acc += curr.weight * curr.reps;
            } else {
              acc += (curr.weight * curr.reps) / 2.20462;
            }
            return acc;
          }, 0);
          resolve(totalVolume.toFixed(0));
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import { formatWeeklyVolume } from "../chart/home/weeklyVolume";

export const getWeeklyVolumePastSixWeeks = () => {
  const now = new Date().toISOString().split("T")[0];
  const sixWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 42));
  const dayOfWeekSixWeeksAgo = sixWeeksAgo.getDay();
  const sixWeeksAgoAdjusted =
    sixWeeksAgo.getDate() -
    dayOfWeekSixWeeksAgo +
    (dayOfWeekSixWeeksAgo === 0 ? -6 : 1);

  const sixWeeksAgoAdjustedDate = new Date(
    sixWeeksAgo.setDate(sixWeeksAgoAdjusted)
  )
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT weight, reps, unit, date FROM workout_exercises JOIN workouts ON workout_exercises.workout_id = workouts.id WHERE date BETWEEN ? AND ? ORDER BY DATE DESC;`,
        [sixWeeksAgoAdjustedDate, now],
        (_, result) => {
          const start = new Date(sixWeeksAgoAdjustedDate);
          const end = new Date(now);

          const data = formatWeeklyVolume(result.rows._array, start, end);
          resolve(data);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertWorkoutExercise = (
  workout_id,
  exercise_id,
  weight,
  reps,
  unit
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO workout_exercises (workout_id, exercise_id, weight, reps, unit) VALUES (?, ?, ?, ?, ?);`,
        [workout_id, exercise_id, weight, reps, unit],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchWorkoutExercises = (workout_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM workout_exercises WHERE workout_id = ?;`,
        [workout_id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getBestSetsConsecutiveReps = (exercise_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workout_exercises.id, reps, unit, date FROM workout_exercises JOIN workouts ON workouts.id = workout_id WHERE exercise_id = ? ORDER BY reps DESC LIMIT 15 ;`,
        [exercise_id],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getBestSetsConsecutiveRepsLast6Months = (exercise_id) => {
  const now = new Date().toISOString().split("T")[0];
  const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6))
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT MAX(reps) AS value, date FROM workout_exercises JOIN workouts ON workouts.id = workout_id WHERE exercise_id = ? AND date BETWEEN ? AND ? GROUP BY date ORDER BY workouts.id;`,
        [exercise_id, sixMonthsAgo, now],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getBestSets1RM = (exercise_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT (weight * IIF(unit == "lbs", 1, 2.20462) * (1 + (0.0333 * reps))) AS predicted_max, workout_exercises.id, weight, reps, unit, date FROM workout_exercises JOIN workouts ON workouts.id = workout_id WHERE exercise_id = ? ORDER BY weight DESC LIMIT 15;`,
        [exercise_id],
        (_, result) => {
          if (!result.rows._array[0]?.id) {
            return resolve([]);
          }
          resolve(result.rows._array);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getBestSets1RMLast6Months = (exercise_id) => {
  const now = new Date().toISOString().split("T")[0];
  const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6))
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT MAX(weight * IIF(unit == "lbs", 1, 2.20462) * (1 + (0.0333 * reps))) AS value, date FROM workout_exercises JOIN workouts ON workouts.id = workout_id WHERE exercise_id = ? AND date BETWEEN ? AND ? GROUP BY date ORDER BY workouts.id;`,
        [exercise_id, sixMonthsAgo, now],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getBestSetsHoldTime = (exercise_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workout_exercises.id, reps, date FROM workout_exercises JOIN workouts ON workouts.id = workout_id WHERE exercise_id = ? ORDER BY reps DESC LIMIT 15;`,
        [exercise_id],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getBestSetsHoldTimeLast6Months = (exercise_id) => {
  const now = new Date().toISOString().split("T")[0];
  const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6))
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT MAX(reps) AS value, date FROM workout_exercises JOIN workouts ON workouts.id = workout_id WHERE exercise_id = ? AND date BETWEEN ? AND ? GROUP BY date ORDER BY workouts.id;`,
        [exercise_id, sixMonthsAgo, now],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertMetric = (name, unit) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO metrics (name, unit) VALUES (?, ?);`,
        [name, unit],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchMetrics = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM metrics;`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchLastMetricValue = (metric_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT value, date FROM user_metrics WHERE metric_id = ? ORDER BY date DESC, id DESC LIMIT 1;`,
        [metric_id],
        (_, result) => resolve(result.rows._array[0]),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertUserMetric = (metric_id, value, date) => {
  // if (Platform.OS === "android") {
  //   const result = db.execAsync(
  //     [
  //       {
  //         sql: "INSERT INTO user_metrics (metric_id, value, date) VALUES (?, ?, ?) ",
  //         args: [metric_id, value, date],
  //       },
  //     ],
  //     false
  //   );
  //   return result;
  // }
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO user_metrics (metric_id, value, date) VALUES (?, ?, ?);`,
        [metric_id, value, date],
        (_, result) => resolve(result.insertId),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteUserMetric = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM user_metrics WHERE id = ?;`,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchUserMetrics = (metric_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_metrics WHERE metric_id = ? ORDER BY date DESC, id DESC LIMIT 90;`,
        [metric_id],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import { formatDailyAvg } from "../chart/tracking/formatWeightData";

// average by day for last 6 days

export const fetchRecentWeightDataDailyAvg = () => {
  const now = new Date().toISOString().split("T")[0];
  const sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6))
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_metrics WHERE metric_id = 1 AND date BETWEEN ? AND ? ORDER BY date DESC;`,
        [sixDaysAgo, now],
        (_, result) => {
          // return array of objects with label for day and data for average
          if (result.rows._array.length === 0) {
            return resolve([[], []]);
          }

          const endDate = now;
          const startDate = sixDaysAgo;
          const [formattedResult, indexesToHide] = formatDailyAvg(
            result.rows._array,
            startDate,
            endDate
          );

          resolve([formattedResult, indexesToHide]);
        },

        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import {
  formatWeeklyAvg,
  getCurrWeekMonday,
} from "../chart/tracking/formatWeightData";

// average by week for last 6 weeks
export const fetchRecentWeightDataWeeklyAvg = () => {
  const now = new Date().toISOString().split("T")[0];
  const sixWeeksAgo = new Date(new Date().setDate(new Date().getDate() - 42));
  const dayOfWeekSixWeeksAgo = sixWeeksAgo.getDay();
  const sixWeeksAgoAdjusted =
    sixWeeksAgo.getDate() -
    dayOfWeekSixWeeksAgo +
    (dayOfWeekSixWeeksAgo === 0 ? -6 : 1);

  const sixWeeksAgoAdjustedDate = new Date(
    sixWeeksAgo.setDate(sixWeeksAgoAdjusted)
  )
    .toISOString()
    .split("T")[0];
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_metrics WHERE metric_id = 1 AND date BETWEEN ? AND ? ORDER BY date DESC;`,
        [sixWeeksAgoAdjustedDate, now],
        (_, result) => {
          // return array of objects with label for week and data for average
          if (result.rows._array.length === 0) {
            return resolve([[], []]);
          }

          const endDate = new Date(result.rows._array[0].date);

          const startDate = new Date(
            result.rows._array[result.rows._array.length - 1].date
          );

          const [formattedResult, indexesToHide] = formatWeeklyAvg(
            result.rows._array,
            startDate,
            endDate
          );

          resolve([formattedResult, indexesToHide]);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import { formatMonthlyAvg } from "../chart/tracking/formatWeightData";
// average by month for last 6 months
export const fetchRecentWeightDataMonthlyAvg = () => {
  const now = new Date().toISOString().split("T")[0];
  const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6))
    .toISOString()
    .split("T")[0];

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM user_metrics WHERE metric_id = 1 AND date BETWEEN ? AND ? ORDER BY date DESC;`,
        [sixMonthsAgo, now],
        (_, result) => {
          // return array of objects with label for week and data for average
          if (result.rows._array.length === 0) {
            return resolve([[], []]);
          }

          const endDate = new Date(result.rows._array[0].date);
          const startDate = new Date(
            result.rows._array[result.rows._array.length - 1].date
          );

          const [formattedResult, indexesToHide] = formatMonthlyAvg(
            result.rows._array,
            startDate,
            endDate
          );

          resolve([formattedResult, indexesToHide]);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertTemplate = (name, workout_id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO templates (name, workout_id) VALUES (?, ?) RETURNING id;`,
        [name, workout_id],
        (_, result) => resolve(result.rows._array[0].id),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteTemplate = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM templates WHERE id = ?;`,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchTemplates = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT workout_id, date, templates.id, templates.name FROM templates JOIN workouts on workout_id = workouts.id;`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchTemplateExercises = (name, workoutId, date, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name, equipment FROM workout_exercises JOIN exercises ON exercises.id = exercise_id WHERE workout_id = ? GROUP BY name ORDER BY workout_exercises.id;`,
        [workoutId],
        (_, result) => {
          const formattedResult = {
            name,
            prevWorkoutId: workoutId,
            id,
            date,
            exercises: result.rows._array,
          };

          if (!result.rows._array.length) {
            deleteTemplate(id);
            resolve(null);
          }
          resolve(formattedResult);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchTemplateExercisesFormatted = (id, exerciseNames) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name, equipment, weight, reps, unit, muscleGroup, restTime, exercise_id FROM workout_exercises JOIN exercises ON exercises.id = exercise_id WHERE workout_id = ? ORDER BY workout_exercises.id;`,
        [id],
        (_, result) => {
          const formattedResult = [];
          exerciseNames.forEach((name) => {
            const matchingExercises = result.rows._array.filter(
              (row) => row.name === name
            );
            formattedResult.push({
              exercise: {
                name,
                id: matchingExercises[0].exercise_id,
                equipment: matchingExercises[0].equipment,
                muscleGroup: matchingExercises[0].muscleGroup,
                restTime: matchingExercises[0].restTime,
                reactId: Date.now() * Math.random(),
              },
              sets: matchingExercises.map((row) => ({
                prevWeight: row.weight,
                prevReps: row.reps,
                weight: "",
                reps: "",
                prevUnit: row.unit,
                unit: row.unit,
                completed: false,
              })),
            });
          });
          resolve(formattedResult);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const updateTemplate = (id, name, prevId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE templates SET name = ?, workout_id = ? WHERE workout_id = ? RETURNING id;`,
        [name, id, prevId],
        (_, result) => resolve(result.rows._array[0].id),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const updateTemplateName = (id, name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE templates SET name = ? WHERE workout_id = ?;`,
        [name, id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchWidgets = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM widgets;`,
        [],
        (_, result) => {
          const formattedResult = result.rows._array.map((row) => ({
            ...row,
            shouldDisplay: row.shouldDisplay === 1 ? true : false,
          }));
          resolve(formattedResult);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const updateWidget = (id, shouldDisplay) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE widgets SET shouldDisplay = ? WHERE id = ?;`,
        [shouldDisplay, id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getAllTableName = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'android_metadata';`,
        [],
        (_, result) => {
          if (result.rows._array.length === 0) {
            resolve(null);
          } else {
            resolve(result.rows._array);
          }
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

/////// seed data ///////

async function seedWidgets() {
  const widgets = [
    {
      name: "AllTimeStats",
      displayName: "All Time Statistics",
      description: "Displays key lifetime statistics",
    },
    {
      name: "WeeklyNumWorkouts",
      displayName: "Weekly Number of Workouts",
      description:
        "Displays the number of workouts completed organized by week",
    },
    {
      name: "WeeklyVolume",
      displayName: "Weekly Volume",
      description:
        "Displays the total volume (weight) lifted organized by week",
    },
  ];

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO widgets (name, displayName, description, shouldDisplay) VALUES (?, ?, ?, true);`,
          [widget.name, widget.displayName, widget.description],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
    await promise;
  }
  console.log("Widgets seeded");
}

import { exercises } from "./ExerciseSeedData";

async function seedExercises() {
  const promiseArray = [];
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO exercises (name, muscleGroup, equipment) VALUES (?, ?, ?);`,
          [exercise.name, exercise.muscle_group.trim(), exercise.equipment],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
    promiseArray.push(promise);
  }
  await Promise.all(promiseArray);
  console.log("Exercises seeded");
}

async function seedMetrics() {
  const metrics = [{ name: "Weight", unit: "lbs" }];

  for (let i = 0; i < metrics.length; i++) {
    const metric = metrics[i];
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO metrics (name, unit) VALUES (?, ?);`,
          [metric.name, metric.unit],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
    await promise;
  }
  console.log("Metrics seeded");
}
