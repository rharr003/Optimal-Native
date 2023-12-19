import App from "./App";
import { render, waitFor } from "@testing-library/react-native";

describe("app", () => {
  it("renders without crashing", async () => {
    // const root = await waitFor(() => {
    //   render(<App />);
    // });

    render(<App />);

    await waitFor(() => {});
  });
});
