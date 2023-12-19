import { render, waitFor } from "@testing-library/react-native";
import HomeMain from "../../main/HomeMain";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "../../../../util/redux/store";

describe("home", () => {
  it("renders without crashing", async () => {
    await waitFor(() => {
      render(
        <Provider store={store}>
          <NavigationContainer>
            <HomeMain />
          </NavigationContainer>
        </Provider>
      );
    });
  });
});
