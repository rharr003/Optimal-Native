import CenteredModal from "../../ui/CenteredModal";
import RestTimer from "./RestTimer";
import ManageExerciseModalMainMenu from "../manage-modal/ManageExerciseModalMainMenu";

export default function WorkoutModals({
  handleRestTimerClose,
  showRestTimerModal,
  handleManageExerciseModalClose,
  showManageExerciseModal,
  exerciseToEditIdx,
  toggleExerciseModal,
}) {
  return (
    <>
      <CenteredModal
        handleClose={handleRestTimerClose}
        showModal={showRestTimerModal}
      >
        <RestTimer handleClose={handleRestTimerClose} />
      </CenteredModal>
      <CenteredModal
        showModal={showManageExerciseModal}
        handleClose={handleManageExerciseModalClose}
      >
        <ManageExerciseModalMainMenu
          index={exerciseToEditIdx}
          handleClose={handleManageExerciseModalClose}
          toggleExerciseModal={toggleExerciseModal}
        />
      </CenteredModal>
    </>
  );
}
