import { render, waitFor } from "@testing-library/react-native";
import ExerciseDetail from "../../detail/ExerciseDetail";
import store from "../../../../util/redux/store";
import { Provider } from "react-redux";

describe("Exercise Detail", () => {
  const route = {
    params: {
      exercise: {
        id: 1,
        name: "test",
        equipment: "test",
        muscleGroup: "test",
      },
    },
  };

  const navigation = {
    setOptions() {},

    goBack() {},
  };
  it("renders without crashing", async () => {
    const root = await waitFor(async () => {
      render(
        <Provider store={store}>
          <ExerciseDetail route={route} navigation={navigation} />
        </Provider>
      );
    });
  });
});
