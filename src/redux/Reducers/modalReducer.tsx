import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ComponentDefault = (props: any) => {
  return <div>default Value</div>;
};
type ModalState = {
  Component: any;
  title: string;
};
const initialState: ModalState = {
  title: "title",
  Component: ComponentDefault,
};

const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    setModalAction: (state: ModalState, action: PayloadAction<ModalState>) => {
      let { Component, title } = action.payload;
      state.Component = Component;
      state.title = title;
    },
  },
});

export const { setModalAction } = modalReducer.actions;

export default modalReducer.reducer;
