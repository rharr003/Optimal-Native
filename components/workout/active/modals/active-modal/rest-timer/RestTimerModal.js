import RestTimerCombined from "../../../shared/RestTimerCombined";
import CenteredModal from "../../../../../shared/modals/CenteredModal";

export default function RestTimerModal({
  showModal,
  finishRestTimer,
  handleClose,
}) {
  return (
    <CenteredModal handleClose={handleClose} showModal={showModal}>
      <RestTimerCombined
        finishRestTimer={finishRestTimer}
        isMinimized={false}
        size={200}
      />
    </CenteredModal>
  );
}
