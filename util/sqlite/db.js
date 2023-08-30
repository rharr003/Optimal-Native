import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const db = SQLite.openDatabase("optimal.db");

export const init = async () => {
  if (
    !(await AsyncStorage.getItem("dbInitialized")) &&
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
        `INSERT INTO exercises (name,  equipment, muscleGroup) VALUES (?, ?, ? ) RETURNING *;`,
        [name, equipment, muscleGroup],
        (_, result) => resolve(result.rows._array[0]),
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
        `INSERT INTO workouts (name, duration, date) VALUES (?, ?, ?) RETURNING id;`,
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
        `SELECT workouts.id, workouts.name AS workout_name, exercises.name, date, duration, exercises.id as exercise_id FROM workouts JOIN workout_exercises ON workouts.id = workout_exercises.workout_id JOIN exercises ON workout_exercises.exercise_id = exercises.id ORDER BY DATE DESC;`,
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
                });
              } else {
                acc[curr.id].exercises.forEach((exercise) => {
                  if (exercise.id === curr.exercise_id) {
                    exercise.setCount++;
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
            .sort((a, b) => new Date(b.date) - new Date(a.date));
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
        `SELECT value FROM user_metrics WHERE metric_id = ? ORDER BY date DESC, id DESC LIMIT 1;`,
        [metric_id],
        (_, result) => resolve(result.rows._array[0]?.value),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertUserMetric = (metric_id, value, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO user_metrics (metric_id, value, date) VALUES (?, ?, ?) RETURNING id;`,
        [metric_id, value, date],
        (_, result) => resolve(result.rows._array[0].id),
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
        `SELECT * FROM user_metrics WHERE metric_id = ? ORDER BY date DESC, id DESC;`,
        [metric_id],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

import { formatDailyAvg } from "../chart/formatWeightData";

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

          const endDate = result.rows._array[0].date;
          const startDate =
            result.rows._array[result.rows._array.length - 1].date;
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

import { formatWeeklyAvg, getCurrWeekMonday } from "../chart/formatWeightData";

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

import { formatMonthlyAvg } from "../chart/formatWeightData";
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
        `INSERT INTO templates (name, workout_id) VALUES (?, ?);`,
        [name, workout_id],
        (_, result) => resolve(result),
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
        `DELETE FROM templates WHERE workout_id = ?;`,
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
        `SELECT workout_id, name FROM templates;`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchTemplateExercises = (name, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name, equipment FROM workout_exercises JOIN exercises ON exercises.id = exercise_id WHERE workout_id = ? GROUP BY name ORDER BY workout_exercises.id;`,
        [id],
        (_, result) => {
          const formattedResult = {
            name,
            id,
            exercises: result.rows._array,
          };
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
              name,
              id: matchingExercises[0].exercise_id,
              equipment: matchingExercises[0].equipment,
              muscleGroup: matchingExercises[0].muscleGroup,
              restTime: matchingExercises[0].restTime,
              reactId: Date.now() * Math.random(),
              sets: matchingExercises.map((row) => ({
                prevWeight: row.weight,
                prevReps: row.reps,
                weight: "",
                reps: "",
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
        `UPDATE templates SET name = ?, workout_id = ? WHERE workout_id = ?;`,
        [name, id, prevId],
        (_, result) => resolve(result),
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
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`,
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
      name: "TotalNumWorkouts",
      displayName: "Number of Workouts (all-time)",
      description: "Displays the total number of workouts completed",
    },
    {
      name: "TotalTime",
      displayName: "Time spent working out (all-time)",
      description: "Displays the total time spent working out",
    },
    {
      name: "TotalVolume",
      displayName: "Total Volume (all-time)",
      description: "Displays the total volume(weight) lifted",
    },
    {
      name: "WeeklyNumWorkouts",
      displayName: "Number of Workouts (weekly)",
      description:
        "Displays the number of workouts completed organized by week",
    },
    {
      name: "WeeklyVolume",
      displayName: "Total Volume (weekly)",
      description: "Displays the total volume(weight) lifted organized by week",
    },
  ];

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO widgets (name, displayName, description, shouldDisplay) VALUES (?, ?, ?, false);`,
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

async function seedUserWeight() {
  const promiseArray = [];
  const weights = [
    {
      value: "150",
      date: "2023-07-01",
    },
    {
      value: "155",
      date: "2023-07-02",
    },
    {
      value: "160",
      date: "2023-07-03",
    },
    {
      value: "165",
      date: "2023-07-04",
    },
    {
      value: "170",
      date: "2023-07-05",
    },
    {
      value: "175",
      date: "2023-07-09",
    },
    {
      value: "180",
      date: "2023-07-10",
    },
    {
      value: "175",
      date: "2023-07-11",
    },
    {
      value: "170",
      date: "2023-07-12",
    },
    {
      value: "180",
      date: "2023-07-21",
    },

    {
      value: "175",
      date: "2023-07-22",
    },
    {
      value: "185",
      date: "2023-07-23",
    },
    {
      value: "180",
      date: "2023-07-24",
    },
  ];

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO user_metrics (metric_id, value, date) VALUES (?, ?, ?);`,
          [1, weight.value, weight.date],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      });
    });
    promiseArray.push(promise);
  }

  await Promise.all(promiseArray);
}

async function createUser() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO user_info (name, birth_date, calorie_intake, activity_level, height, biological_sex) VALUES (?, ?, ?, ?, ?, ?);`,
        ["User", "1990-01-01", 0, "Sedentary", 60, "Male"],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
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
