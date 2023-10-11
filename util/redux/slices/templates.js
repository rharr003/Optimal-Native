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
      state.templates = state.templates.map((template) => {
        if (template.id === action.payload.id) {
          return action.payload.template;
        }
        return template;
      });
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
} = templateSlice.actions;
