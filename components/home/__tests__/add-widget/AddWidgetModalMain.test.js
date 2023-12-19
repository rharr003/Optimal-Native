import { render } from "@testing-library/react-native";
import AddWidgetModalMain from "../../add-widget/AddWidgetModalMain";
import { Provider } from "react-redux";
import store from "../../../../util/redux/store";

describe("Add widget modal", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <AddWidgetModalMain />
      </Provider>
    );
  });
});
