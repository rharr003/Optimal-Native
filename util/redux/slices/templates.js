import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    templateToEdit: null,
    loadedWorkout: null,
  },
  reducers: {
    populateTemplates(state, action) {
      state.templates = action.payload;
    },

    addTemplate(state, action) {
      state.templates.push(action.payload);
    },

    deleteTemplate(state, action) {
      state.templates = state.templates.filter(
        (template) => template.id !== action.payload
      );
    },

    renameTemplate(state, action) {
      state.templates = state.templates.map((template) => {
        if (template.id === action.payload.id) {
          return { ...template, name: action.payload.name };
        }
        return template;
      });
    },

    updateTemplate(state, action) {
      // state.templates = state.templates.map((template) => {
      //   if (template.id === action.payload.id) {
      //     return action.payload.template;
      //   }
      //   return template;
      // });
      // reorder templates so that the workouts that havent been performed recently go to the top
      const copy = state.templates;
      const index = copy.findIndex((el) => {
        return el.prevWorkoutId === action.payload.prevWorkoutId;
      });
      copy.splice(index, 1);
      copy.push(action.payload.template);
      state.templates = copy;
    },

    setTemplateToEdit(state, action) {
      state.templateToEdit = action.payload;
    },

    clearTemplateToEdit(state, action) {
      state.templateToEdit = null;
    },

    setLoadedWorkout(state, action) {
      state.loadedWorkout = action.payload;
    },

    clearLoadedWorkout(state, action) {
      state.loadedWorkout = null;
    },

    reorderTemplates(state, action) {
      const copy = state.templates;
      const index = copy.findIndex((el) => {
        return el.prevWorkoutId === action.payload.prevWorkoutId;
      });
      const templateToMove = copy.splice(index, 1);
      copy.push(templateToMove);
      state.templates = copy;
    },
  },
});

export default templateSlice.reducer;
export const {
  populateTemplates,
  addTemplate,
  deleteTemplate,
  renameTemplate,
  setTemplateToEdit,
  clearTemplateToEdit,
  setLoadedWorkout,
  clearLoadedWorkout,
  updateTemplate,
  reorderTemplates,
} = templateSlice.actions;
