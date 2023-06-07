import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";
import { UpdateUser, user, UserPost } from "../../utils/Type/TypeUser";
import { AppDispatch } from "../configStore";

export interface arrUser {
  arrUser: user[];
  userUpdate: user[] | any;
  userPost: UserPost[];
  userAvatar: user | null;
}

const initialState: arrUser = {
  arrUser: [],
  userUpdate: [],
  userPost: [],
  userAvatar: null,
};

const userAdminReducer = createSlice({
  name: "userAdminReducer",
  initialState,
  reducers: {
    getAllUserAction: (state, action: PayloadAction<user[]>) => {
      state.arrUser = action.payload;
    },
    setUserUpdate: (state: arrUser, action: PayloadAction<user[]>) => {
      state.userUpdate = action.payload;
    },
    userCreateAdmin: (state: arrUser, action: PayloadAction<UserPost[]>) => {
      state.userPost = action.payload;
    },
    userChangeAvatar: (state: arrUser, action: PayloadAction<user>) => {
      state.userAvatar = action.payload;
    },
  },
});

export const {
  getAllUserAction,
  setUserUpdate,
  userCreateAdmin,
  userChangeAvatar,
} = userAdminReducer.actions;

export default userAdminReducer.reducer;

//-------action api------------

export const getUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/users");
      let arrUser: user[] = result.data.content;
      const action = getAllUserAction(arrUser);
      console.log(result);

      dispatch(action);
      console.log(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const putUseApi = (id: number, data: UpdateUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/users/${id}`, data);
      console.log({ result });
      //Chuyển về trang profile
      // history.push("/profile");
      // window.location.reload();
      let action = setUserUpdate(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};

export const createUserApi = (data: UserPost) => {
  console.log(data);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/users", data);
      // const createUser=await axios.post(registerRoute,data)
      const action = userCreateAdmin(result.data.content);
      console.log(result);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const deleteUserApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/users?id=${id}`);
      // const action = userCreateAdmin(result.data.content)
      // console.log(result);
      // dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

//Api get User extend Id

export const getUserAPiID = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/users/${id}`);
      console.log({ result });
      let action = setUserUpdate(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

// Api pagination users
export const getPaginationUser = (page: Number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=10`
      );
      const action = getAllUserAction(result.data.content.data);
      console.log("main1",result);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const UpdateAvatarUser = (data: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/users/upload-avatar", data);
      const action = userChangeAvatar(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const SearchUser = (name: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/search/${name}`);
      const arrUser: user[] = result.data.content;
      const action = getAllUserAction(arrUser);
      console.log(result);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
}
