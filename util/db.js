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
            value INTEGER NOT NULL,
            date TEXT NOT NULL);`,
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

export const insertExercise = (
  name,
  description,
  imageUri,
  muscleGroup,
  equipment
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO exercises (name, description, imageUri, muscleGroup, equipment) VALUES (?, ?, ?, ?, ?);`,
        [name, description, imageUri, muscleGroup, equipment],
        (_, result) => resolve(result),
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
        restTime: curr.restTime,
      });
      return acc;
    } else {
      acc[curr.name[0]] = [
        {
          id: curr.id,
          name: curr.name,
          equipment: curr.equipment,
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
        `SELECT weight, reps, unit FROM workout_exercises WHERE exercise_id = ? ORDER BY workout_id DESC LIMIT 1;`,
        [id],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const insertWorkout = (name, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO workouts (name, date) VALUES (?, ?);`,
        [name, date],
        (_, result) => resolve(result),
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
        `SELECT * FROM workouts;`,
        [],
        (_, result) => resolve(result),
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
        (_, result) => resolve(result),
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
        `INSERT INTO user_metrics (metric_id, value, date) VALUES (?, ?, ?);`,
        [metric_id, value, date],
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
        `SELECT * FROM user_metrics WHERE metric_id = ?;`,
        [metric_id],
        (_, result) => resolve(result),
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

export const fetchTemplates = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM templates;`,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const fetchTemplate = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM templates WHERE id = ?;`,
        [id],
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
