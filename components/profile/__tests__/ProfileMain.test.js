import { render } from "@testing-library/react-native";
import ProfileMain from "../ProfileMain";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "../../../util/redux/store";

describe("main profile screen", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <ProfileMain />
        </NavigationContainer>
      </Provider>
    );
  });
});
