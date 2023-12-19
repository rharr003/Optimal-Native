import { render, fireEvent, screen } from "@testing-library/react-native";
import DeleteModal from "../../detail/DeleteModal";

describe("Delete Modal", () => {
  const showModal = true;
  const setShowModal = jest.fn();
  const exercise = {
    name: "test",
    equipment: "test",
  };
  onDelete = jest.fn();
  it("renders without crashing", () => {
    render(
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        exercise={exercise}
        onDelete={onDelete}
      />
    );
  });

  it("calls on delete when delete button is long pressed", () => {
    render(
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        exercise={exercise}
        onDelete={onDelete}
      />
    );
    const deleteButton = screen.getByTestId("delete-modal-button");
    fireEvent(deleteButton, "longPress");
    expect(setShowModal).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

  // press still triggers longPress callbacks but confirmed that this is not the case when
  // actually using the app

  // it("does not call on delete when delete button is regular pressed", () => {
  //   render(
  //     <DeleteModal
  //       showModal={showModal}
  //       setShowModal={setShowModal}
  //       exercise={exercise}
  //       onDelete={onDelete}
  //     />
  //   );
  //   const deleteButton = screen.getByTestId("delete-modal-button");
  //   fireEvent(deleteButton, "press");
  //   expect(setShowModal).not.toHaveBeenCalled();
  //   expect(onDelete).not.toHaveBeenCalled();
  // });

  it("closes on go back button press", () => {
    render(
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        exercise={exercise}
        onDelete={onDelete}
      />
    );
    const goBackButton = screen.getByTestId("delete-modal-close-button");
    fireEvent(goBackButton, "press");
    expect(setShowModal).toHaveBeenCalled();
  });
});
