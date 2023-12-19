import { render, waitFor } from "@testing-library/react-native";
import TrackingMain from "../main/TrackingMain";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "../../../util/redux/store";

describe("main tracking screen", () => {
  it("renders without crashing", async () => {
    await waitFor(() => {
      render(
        <Provider store={store}>
          <NavigationContainer>
            <TrackingMain />
          </NavigationContainer>
        </Provider>
      );
    });
  });
});
