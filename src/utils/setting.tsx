import axios from "axios";
// import { history } from "../App";

export const configs = {
  setStoreJSON: (name: string, values: any) => {
    values = JSON.stringify(values);
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

  setCookie: (name: string, value: any, days: any) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },

  getCookie: (name: string) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  eraseCookie: (name: string) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },

  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
  CURRENT_USER: "currentUser",
};

export const {
  ACCESS_TOKEN,
  USER_LOGIN,
  CURRENT_USER,
  eraseCookie,
  getCookie,
  setCookie,
  setStoreJSON,
  getStoreJSON,
  clearLocalStorage,
} = configs;

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOCIsIkhldEhhblN0cmluZyI6IjI1LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzI4MzIwMDAwMCIsIm5iZiI6MTY0Nzk2ODQwMCwiZXhwIjoxNjc3NDMwODAwfQ.wEdmkKpVZbDB4s4L_cmLwJ1O8le8Cc-VMgLZCI-HvLA";

const baseUrl: string = `https://airbnbnew.cybersoft.edu.vn/api`;
//Cấu hình interceptor {Cấu hình cho các request và response}
export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: getStoreJSON(USER_LOGIN)
      ? "Bearer" + getStoreJSON(USER_LOGIN)
      : "",
  },
  timeout: 6000,
});

//cầu hình refresh token login
// http.setLocalAccessToken = async ({ token, timeExpired }) => {};
// export const refreshToken = async (urlLogin: string, data: any) => {
//   let result=await http.post(urlLogin, data);
// };

//Cấu hình request
http.interceptors.request.use(
  (config: any) => {
    let Authorization = getStoreJSON(USER_LOGIN)
      ? "Bearer " + getStoreJSON(ACCESS_TOKEN)
      : "";
    let newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: Authorization,
      },
    };
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);
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
