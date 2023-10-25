import RestTimerCombined from "../../../shared/RestTimerCombined";
import CenteredModal from "../../../../../shared/modals/CenteredModal";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function RestTimerModal({
  showModal,
  finishRestTimer,
  handleClose,
}) {
  return (
    <CenteredModal
      handleClose={handleClose}
      showModal={showModal}
      style={{ height: height * 0.5 }}
    >
      <RestTimerCombined
        minimize={handleClose}
        finishRestTimer={finishRestTimer}
        isMinimized={false}
        size={width / 1.75}
      />
    </CenteredModal>
  );
}
