import React, { lazy, Suspense } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

//cai history npm install --save history
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

//Cấu hình react router dom
export const history = createBrowserHistory({ window });

//ant design
import "antd/dist/antd.css";

//scss
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/scss/style.scss";

// -- Link page packup -------
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import DashBoard from "./pages/AdminPages/Dashboard/DashBoard";
// import DetailPages from "./pages/DetailPages/DetailPages";
// import Register from "./pages/Register/Register";
// import QuanLiNguoiDung from "./pages/AdminPages/TestPage/UserManage";
// import RoomManagement from "./pages/AdminPages/TestPage/RoomManage";
// import HomeTemplate from "./templates/HomeTemplate";
// import UserManagement from "./pages/AdminPages/TestPage/UserManage";
// import LocationManagement from "./pages/AdminPages/TestPage/LocationManage";
// import CreateUser from "./pages/AdminPages/TestPage/CreateUser";
// import UpdateUser from "./pages/AdminPages/TestPage/UpdateUser";
// import CreateRoom from "./pages/AdminPages/TestPage/CreateRoom";
// import UpdateRoom from "./pages/AdminPages/TestPage/UpdateRoom";
// import CreateLocation from "./pages/AdminPages/TestPage/CreateLocation";
// import UpdateLocation from "./pages/AdminPages/TestPage/UpdateLocation";
// import BookingManagement from "./pages/AdminPages/TestPage/BookingManage";
// import UpdateBooking from "./pages/AdminPages/TestPage/UpdateBooking";
// import Profile from "./pages/Profile/Profile";
// import ModalProfile from "./HOC/ModalProfile";
// import RoomItem from "./pages/Profile/RoomProfile/RoomItem";
// import DetailLocation from "./pages/DetailLocation/DetailLocation";
import Loading from "./components/Loading/Loading";
import CommentManagement from "./pages/AdminPages/TestPage/CommentManage";
// import Chat from "./pages/ChatBox/Chat";
// import DashBoardInfor from "./pages/AdminPages/Dashboard/DashBoardInfor";

// ----- Lazy loading --------------------------------

const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'));
const DashBoard = lazy(() => import("./pages/AdminPages/Dashboard/DashBoard"));
const DetailPages = lazy(() => import("./pages/DetailPages/DetailPages"));
const Register = lazy(() => import("./pages/Register/Register"));
const RoomManagement = lazy(() => import("./pages/AdminPages/TestPage/RoomManage"));
const HomeTemplate = lazy(() => import("./templates/HomeTemplate"));
const UserManagement = lazy(() => import("./pages/AdminPages/TestPage/UserManage"));
const LocationManagement = lazy(() => import("./pages/AdminPages/TestPage/LocationManage"));
const CreateUser = lazy(() => import("./pages/AdminPages/TestPage/CreateUser"));
const UpdateUser = lazy(() => import("./pages/AdminPages/TestPage/UpdateUser"));
const CreateRoom = lazy(() => import("./pages/AdminPages/TestPage/CreateRoom"));
const UpdateRoom = lazy(() => import("./pages/AdminPages/TestPage/UpdateRoom"));
const CreateLocation = lazy(() => import("./pages/AdminPages/TestPage/CreateLocation"));
const UpdateLocation = lazy(() => import("./pages/AdminPages/TestPage/UpdateLocation"));
const BookingManagement = lazy(() => import("./pages/AdminPages/TestPage/BookingManage"));
const UpdateBooking = lazy(() => import("./pages/AdminPages/TestPage/UpdateBooking"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const RoomItem = lazy(() => import("./pages/Profile/RoomProfile/RoomItem"));
const DetailLocation = lazy(() => import("./pages/DetailLocation/DetailLocation"));
const Chat = lazy(() => import("./pages/ChatBox/Chat"));
const DashBoardInfor = lazy(() => import("./pages/AdminPages/Dashboard/DashBoardInfor"));
const Login2 = lazy(() => import("./pages/Login/LoginNew"));


type Props = {};

export const toastOptionsErr:{} = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
export const toastOptionsSuccess:{} = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export default function App({}: Props) {
  return (
    <> 
      <Suspense fallback={<div><Loading /></div>}>
      <HistoryRouter history={history}>
        {/* <RouterProvider router={router} /> */}
        <Routes>
          <Route path="/Login2" element={<Login2 />}/>
          <Route path="/" element={<HomeTemplate />}>

          {/* loading */}
          {/* <Route path="/" element={<Loading />}> */}

            <Route index element={<Home />} />

            <Route path="/Profile" element={<Profile />} />
            <Route path="detailRoom">
              <Route path=":id" element={<DetailPages />} />
            </Route>
            <Route path="/detailLocation">
              <Route path=":id/:nameLocationRoom" element={<DetailLocation />} />
            </Route>
            <Route path="*" element={<Navigate to="" />} />
          </Route>
          <Route path="/login" >
             <Route path=":number" element={<Login />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/test1" element={<RoomItem />} />

          <Route path="/admin/dashboard" element={<DashBoard />}>
            <Route path="chat" element={<Chat />} />
            <Route path="DashBoardInfor" element={<DashBoardInfor />} />
            <Route path="userAdmin" element={<UserManagement />} />
            <Route path="roomAdmin" element={<RoomManagement />} />
            <Route path="commentAdmin" element={<CommentManagement />} />

            <Route path="locationAdmin" element={<LocationManagement />} />
            <Route path="bookingAdmin" element={<BookingManagement />} />

            <Route path="userAdmin/createuser" element={<CreateUser />} />
            <Route path="userAdmin/updateuser/:id" element={<UpdateUser />} />

            <Route path="roomAdmin/createroom" element={<CreateRoom />} />
            <Route path="roomAdmin/updateroom/:id" element={<UpdateRoom />} />

            <Route
              path="locationAdmin/createlocation"
              element={<CreateLocation />}
            />
            <Route
              path="locationAdmin/updatelocation/:id"
              element={<UpdateLocation />}
            />

            <Route
              path="bookingAdmin/updatebooking/:id"
              element={<UpdateBooking />}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </Suspense>
    </>
  );
}
