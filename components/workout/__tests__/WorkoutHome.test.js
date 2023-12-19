import { render, waitFor } from "@testing-library/react-native";
import store from "../../../util/redux/store";
import { Provider } from "react-redux";
import WorkoutHome from "../main/WorkoutHome";

describe("workout home", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <WorkoutHome />
      </Provider>
    );
  });
});
