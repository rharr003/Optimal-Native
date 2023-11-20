import { render } from "@testing-library/react-native";
import DeleteModal from "../detail/DeleteModal";

describe("Delete Modal", () => {
  it("renders without crashing", () => {
    render(<DeleteModal />);
  });
});
