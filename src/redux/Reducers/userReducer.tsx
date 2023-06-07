import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../App";
import { AppDispatch } from "../configStore";
import {
  ACCESS_TOKEN,
  getStoreJSON,
  http,
  setStoreJSON,
  USER_LOGIN,
} from "../../utils/setting";
import { UpdateUser, userBooking, user, userProfile, UserSignIn } from "../../utils/Type/TypeUser";



interface userLoginState {
  userLogin: user | any;
  userProfile: userProfile | any;
  userBooking: userBooking | any;
}
const initialState: userLoginState = {
  userLogin: getStoreJSON(USER_LOGIN) || {},
  userProfile: {},
  userBooking: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLogin: (state: userLoginState, action: PayloadAction<user>) => {
      state.userLogin = action.payload;
    },
    setUserProfile: (
      state: userLoginState,
      action: PayloadAction<userProfile>
    ) => {
      state.userProfile = action.payload;
    },
    setUserBooking: (
      state: userLoginState,
      action: PayloadAction<userBooking[]>
    ) => {
      state.userBooking = action.payload;
    },
    // setUserRegister: (
    //   state: userLoginState,
    //   action: PayloadAction<userLogin>
    // ) => {
    //   state.userLogin= action.payload;
    // },
  },
});

export const { setUserLogin, setUserProfile, setUserBooking } =
  userReducer.actions;

export default userReducer.reducer;

// /// Call api post signup
// export const postSignupUser = (data: userLogin) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       let result2 = await http.post("/auth/signup", data);
//       if (result2?.data.statusCode=== 200) {
//         let data={
//           email: result2?.data.content.email,
//           password: result2?.data.content.password
//         }
//         await postSignIn(data);
//         history.push("/");
//       }
//     } catch (error: any) {
//       console.log({ error });
//       alert(error.response.data.content);
//     }
//   };
// };

// Call api  post signin
export const postSignIn = (data: UserSignIn) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post("/auth/signin", data);
      //LƯU TOKEN VÀO LOCALSTORE
      setStoreJSON(ACCESS_TOKEN, result.data.content.token);
      // Lưu lại email
      let userLogin = result.data.content.user;
      let useLoginSetStore = {
        avatar: userLogin.avatar,
        birthday: userLogin.birthday,
        email: userLogin.email,
        gender: userLogin.gender,
        id: userLogin.id,
        name: userLogin.name,
        role: userLogin.role,
      };
      setStoreJSON(USER_LOGIN, useLoginSetStore);
      dispatch(setUserLogin(result.data.content.user));
    } catch (error: any) {
      let err = error.response.data.content;
      alert(err);
    }
  };
};
// Call api get user
export const getUserProfileAPi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/users/${getStoreJSON(USER_LOGIN).id}`);
      dispatch(setUserProfile(result.data.content));
    } catch (err) {
      console.log({ err });
    }
  };
};

export const getBookingUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let idUserLogin = await getStoreJSON(USER_LOGIN).id;
      if (idUserLogin) {
        let result3 = await http.get(
          `/dat-phong/lay-theo-nguoi-dung/${idUserLogin}`
        );
        let action = setUserBooking(result3.data.content);
        dispatch(action);
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

// call api put user
export const putUseProfileApi = (id: number, data: UpdateUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/users/${id}`, data);
      localStorage.removeItem(USER_LOGIN);
      await setStoreJSON(USER_LOGIN, result.data.content);
      dispatch(setUserLogin(result.data.content));
    } catch (error) {
      console.log({ error });
    }
  };
};

//change avatar
export const UpdateAvatarUser = (data: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/users/upload-avatar", data);
      const action = setUserProfile(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};
