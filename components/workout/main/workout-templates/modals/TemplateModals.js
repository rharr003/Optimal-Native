import ChangeNameMain from "./change-name/ChangeNameMain";
import StartWorkoutMain from "./start-workout/StartWorkoutMain";
import CenteredModal from "../../../../shared/modals/CenteredModal";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  clearLoadedWorkout,
  clearTemplateToEdit,
} from "../../../../../util/redux/slices/templates";

export default function TemplateModals({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const templateToEdit = useSelector((state) => state.templates.templateToEdit);
  const loadedWorkout = useSelector((state) => state.templates.loadedWorkout);

  function handleClose() {
    setShowModal(false);
    loadedWorkout && dispatch(clearLoadedWorkout());
    templateToEdit && dispatch(clearTemplateToEdit());
  }

  return (
    <CenteredModal
      showModal={showModal}
      handleClose={handleClose}
      style={[styles.modal, templateToEdit && { height: 150 }]}
    >
      {loadedWorkout && (
        <StartWorkoutMain handleClose={handleClose} workout={loadedWorkout} />
      )}
      {templateToEdit && (
        <ChangeNameMain
          templateId={templateToEdit.id}
          handleClose={handleClose}
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
