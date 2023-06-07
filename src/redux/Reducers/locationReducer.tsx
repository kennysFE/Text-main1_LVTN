import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/setting2";
import { Location } from "../../utils/Type/TypeRoom";
import { AppDispatch } from "../configStore";


export interface locationAdmin {
  locationList: Location[];
  locationPut: Location[] | null;
  locationpost: Location[];
  localDetail: Location[] | null;
}

const initialState: locationAdmin = {
  locationList: [],
  locationPut: [],
  locationpost: [],
  localDetail: [],
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    getAllLocation: (
      state: locationAdmin,
      action: PayloadAction<Location[]>
    ) => {
      state.locationList = action.payload;
    },
    locationActionAdmin: (
      state: locationAdmin,
      action: PayloadAction<Location[]>
    ) => {
      state.locationPut = action.payload;
    },
    locationCreateAdmin: (
      state: locationAdmin,
      action: PayloadAction<Location[]>
    ) => {
      state.locationpost = action.payload;
    },
    getLocalDetail: (state, action: PayloadAction<Location[]>) => {
      state.localDetail = action.payload;
    },
  },
});

export const {
  getAllLocation,
  locationActionAdmin,
  locationCreateAdmin,
  getLocalDetail,
} = locationReducer.actions;

export default locationReducer.reducer;

//-------action api------------

// Api get all location

export const getLocationApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/vi-tri");
      let locationList: Location[] = result.data.content;
      const action = getAllLocation(locationList);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

// Api change infor location

export const putlocationApi = (id: number, data: Location) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.put(`/vi-tri/${id}`, data);
      let action = locationActionAdmin(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };
};

// Api delete api location

export const deletelocationApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/vi-tri/${id}`);
      // const action = userCreateAdmin(result.data.content)
      // console.log(result);
      // dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

// Api get location extend id

export const getlocationApiID = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/vi-tri/${id}`);
      let action = locationActionAdmin(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const createLocationApi = (data: Location) => {
  console.log(data);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/vi-tri", data);
      const action = locationCreateAdmin(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

//get location detail by id

export const getLocationDetailById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(`/vi-tri/${id}`);
      let action = getLocalDetail(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

// Change image location
// export const UpdateImageLocation = (data: FormData, id: number) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const result = await http.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, data);
//       let action = locationActionAdmin(result.data.content);
//       dispatch(action);
//     } catch (err) {
//       console.log({ err });
//     }
//   };
// };
