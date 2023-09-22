import ChangeNameModal from "./ChangeNameModal";
import StartTemplateWorkoutModal from "./StartTemplateWorkoutModal";
import CenteredModal from "../../../ui/CenteredModal";
import { StyleSheet } from "react-native";

export default function TemplateModals({
  showModal,
  handleClose,
  setTemplates,
  templateToEdit,
  loadedWorkout,
}) {
  return (
    <CenteredModal
      showModal={showModal}
      handleClose={handleClose}
      style={[styles.modal, templateToEdit && { height: 150 }]}
    >
      {loadedWorkout && (
        <StartTemplateWorkoutModal
          handleClose={handleClose}
          workout={loadedWorkout}
        />
      )}
      {templateToEdit && (
        <ChangeNameModal
          workoutId={templateToEdit.id}
          handleClose={handleClose}
          setTemplates={setTemplates}
        />
      )}
    </CenteredModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 250,
  },
});
