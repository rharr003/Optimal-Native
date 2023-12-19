import { render, waitFor } from "@testing-library/react-native";
import ExercisesMain from "../../main/ExercisesMain";
import store from "../../../../util/redux/store";
import { Provider } from "react-redux";

describe("Exercises Main", () => {
  const navigation = {
    navigate: jest.fn(),
  };

  it("renders without crashing", async () => {
    const root = await waitFor(() => {
      render(
        <Provider store={store}>
          <ExercisesMain navigation={navigation} />
        </Provider>
      );
    });
  });
});
