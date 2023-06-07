import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultComponent = () => {
  return <></>;
};

type State = {
  openModal: boolean;
  openModalPopup: boolean;
  ComponentTitle: () => JSX.Element;
  ComponentContent: () => JSX.Element;
};

const initialState: State = {
  openModal: false,
  openModalPopup: false,
  ComponentTitle: defaultComponent,
  ComponentContent: defaultComponent,
};

const openModalReducer = createSlice({
  name: "openModalReducer",
  initialState,
  reducers: {
    modal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    modalPopUp: (state, action: PayloadAction<any>) => {
      let { ComponentContent, openModalPopup, ComponentTitle } = action.payload;
      state.openModalPopup = openModalPopup;
      state.ComponentContent = ComponentContent;
      state.ComponentTitle = ComponentTitle;
    },
  },
});

export const { modal, modalPopUp } = openModalReducer.actions;

export default openModalReducer.reducer;
