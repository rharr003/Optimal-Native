import ManageModalMain from "./manage-exercise/ManageModalMain";
import RestTimerModal from "./rest-timer/RestTimerModal";

export default function ActiveModalsMain({
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
      <RestTimerModal
        showModal={showRestTimerModal}
        handleClose={minimizeRestTimer}
        finishRestTimer={finishRestTimer}
      />
      <ManageModalMain
        index={exerciseToEditIdx}
        handleClose={handleManageExerciseModalClose}
        toggleExerciseModal={toggleExerciseModal}
        toggleUnit={toggleUnit}
        unit={unit}
        showModal={showManageExerciseModal}
      />
    </>
  );
}
