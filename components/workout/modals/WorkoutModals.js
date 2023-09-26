import CenteredModal from "../../shared/modals/CenteredModal";
import ManageExerciseModalMainMenu from "./manage-modal/ManageExerciseModalMainMenu";
import RestTimerCombined from "../active/RestTimerCombined";

export default function WorkoutModals({
  finishRestTimer,
  setShowRestTimerModal,
  showRestTimerModal,
  handleManageExerciseModalClose,
  showManageExerciseModal,
  exerciseToEditIdx,
  toggleExerciseModal,
  toggleUnit,
  unit,
}) {
  function minimizeRestTimer() {
    setShowRestTimerModal(false);
  }

  return (
    <>
      <CenteredModal
        handleClose={minimizeRestTimer}
        showModal={showRestTimerModal}
      >
        <RestTimerCombined
          finishRestTimer={finishRestTimer}
          isMinimized={false}
          size={200}
        />
      </CenteredModal>
      <CenteredModal
        showModal={showManageExerciseModal}
        handleClose={handleManageExerciseModalClose}
      >
        <ManageExerciseModalMainMenu
          index={exerciseToEditIdx}
          handleClose={handleManageExerciseModalClose}
          toggleExerciseModal={toggleExerciseModal}
          toggleUnit={toggleUnit}
          unit={unit}
        />
      </CenteredModal>
    </>
  );
}
