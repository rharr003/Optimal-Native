import ChangeNameMain from "./change-name/ChangeNameMain";
import StartWorkoutMain from "./start-workout/StartWorkoutMain";
import CenteredModal from "../../../../shared/modals/CenteredModal";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  clearLoadedWorkout,
  clearTemplateToEdit,
} from "../../../../../util/redux/slices/templates";
import { useState } from "react";
import { deleteTemplate } from "../../../../../util/sqlite/db";
import { deleteTemplate as deleteTemplateRedux } from "../../../../../util/redux/slices/templates";
import DeleteTemplateMain from "./delete-template/DeleteTemplateMain";
import * as Haptics from "expo-haptics";

export default function TemplateModals({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const templateToEdit = useSelector((state) => state.templates.templateToEdit);
  const loadedWorkout = useSelector((state) => state.templates.loadedWorkout);
  const [showDelete, setShowDelete] = useState(false);

  function handleClose() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowDelete(false);
    setShowModal(false);
    loadedWorkout && dispatch(clearLoadedWorkout());
    templateToEdit && dispatch(clearTemplateToEdit());
  }

  async function handleDelete() {
    await deleteTemplate(templateToEdit.id);
    dispatch(deleteTemplateRedux(templateToEdit.id));
    handleClose();
  }

  function openDeleteModal() {
    setShowDelete(true);
  }

  return (
    <CenteredModal
      showModal={showModal}
      handleClose={handleClose}
      style={styles.modal}
    >
      {loadedWorkout && (
        <StartWorkoutMain handleClose={handleClose} workout={loadedWorkout} />
      )}
      {templateToEdit && !showDelete && (
        <ChangeNameMain
          templateId={templateToEdit.id}
          handleClose={handleClose}
          templateName={templateToEdit.name}
          openDeleteModal={openDeleteModal}
        />
      )}

      {showDelete && (
        <DeleteTemplateMain
          templateId={templateToEdit.id}
          templateName={templateToEdit.name}
          handleClose={handleClose}
          handleDelete={handleDelete}
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
