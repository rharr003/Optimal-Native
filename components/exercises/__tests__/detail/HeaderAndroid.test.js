import { render, fireEvent, screen } from "@testing-library/react-native";
import HeaderAndroid from "../../detail/HeaderAndroid";

describe("Exercise Detail Android Header", () => {
  const goBack = jest.fn();
  const name = "test";
  it("renders without crashing", () => {
    render(<HeaderAndroid goBack={goBack} name={name} />);
    expect(screen.getByText("test")).toBeDefined();
  });

  it("goes back when the go back button is pressed", () => {
    render(<HeaderAndroid goBack={goBack} name={name} />);
    const goBackButton = screen.getByTestId("go-back");
    fireEvent.press(goBackButton);
    expect(goBack).toHaveBeenCalled();
  });
});
