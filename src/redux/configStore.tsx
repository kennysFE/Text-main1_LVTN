import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Reducers/modalReducer";
import userReducer from "./Reducers/userReducer";
import userAdminReducer from "./Reducers/userAdminReducer";
import roomReducer from "./Reducers/roomReducer";
import openModalReducer from "./Reducers/openModalReducer";
import locationReducer from "./Reducers/locationReducer";
import bookingReducer from "./Reducers/bookingRoomReducer";
import commentReducer from "./Reducers/commentReducer";


export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    // modalReducer: modalReducer,
    userAdminReducer: userAdminReducer,
    roomReducer: roomReducer,
    openModalReducer: openModalReducer,
    locationReducer: locationReducer,
    bookingReducer: bookingReducer,
    commentReducer:commentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {pots: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
