import axios, { AxiosRequestConfig } from "axios";
import { history } from "../App";

export const configs = {
  setStore: (name: string, values: any) => {
    localStorage.setItem(name, values);
  },
  getStore: (name: string) => {
    return localStorage.getItem(name);
  },
  setStoreJSON: (name: string, values: any) => {
    // Biến thành chuỗi
    values = JSON.stringify(values);
    // Lưu vào store
    localStorage.setItem(name, values);
  },
  getStoreJSON: (name: string) => {
    if (localStorage.getItem(name)) {
      let value: any = localStorage.getItem(name);
      let content = JSON.parse(value);
      return content;
    }
    return null;
  },

  clearLocalStorage: (name: string) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
  CURRENT_USER:"currentUser",
};

export const {
  ACCESS_TOKEN,
  USER_LOGIN,
  CURRENT_USER,
  setStore,
  getStore,
  setStoreJSON,
  getStoreJSON,
  clearLocalStorage
} = configs;

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNiIsIkhldEhhblN0cmluZyI6IjE5LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4OTcyNDgwMDAwMCIsIm5iZiI6MTY2MDQxMDAwMCwiZXhwIjoxNjg5ODcyNDAwfQ.LOuGqORmUbzSjvrf010cInw8TjYTzoLxS6HI1nQakE";

//Cấu hình interceptor {Cấu hình cho các request và response}
export const http = axios.create({
  baseURL: `https://airbnbnew.cybersoft.edu.vn/api`,
  timeout: 6000,
});

//Cấu hình request

http.interceptors.request.use(
  (config:AxiosRequestConfig)  => {

      const token = getStore(ACCESS_TOKEN);
      if( config.headers){
          config.headers  = {
              ['Token']: token,
              ['tokenCybersoft']: TOKEN_CYBERSOFT
          }
      }
      return config
  },
  error => {
      Promise.reject(error)
  }
)
/*
    StatusCode: Mã kết quả trả về do backend qui định
    200(Success): Kết quả trả về thành công
    201(Created): Tạo giá trị thành công trên server (thường dùng 200)
    400(Bad Request); Không tồn tại đường dẫn
    404(Not Found): Không tìm thấy dữ liệu
    401(UnAuthorize): Không có quyền truy cập vào API
    403(Forbiden): Token chưa đủ quyền truy cập
    500(Error in server): Lỗi xảy ra trên server (Nguyên do do FE hoặc BE tùy tình huống)
*/

// // Cấu hình kết quả trả về
http.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (err) => {
    console.log(err.response.status);
    if (err.response.status === 400 || err.response.status === 404) {
      // history.push("/");
      // window.location.href = "/";
      return Promise.reject(err);
    }
    if (err.response.status === 401 || err.response.status === 403) {
      alert("Token Không hợp lệ! Vui lòng đăng nhập lại");
      // history.push("/login");
      // window.location.href = "/";
      return Promise.reject(err);
    }
  }
);
