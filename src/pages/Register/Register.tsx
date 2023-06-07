import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, boolean } from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import dayjs from "dayjs";
import classNames from "classnames";
import { AppDispatch } from "../../redux/configStore";
import { getUserApi } from "../../redux/Reducers/userAdminReducer";
import UseCheckEmail from "../../Hooks/UseCheckEmail";
import { toastOptionsErr, toastOptionsSuccess } from "../../App";
import { toast, ToastContainer } from "react-toastify";
import { http } from "../../utils/setting";
import backgroundImageRegister from "../../assets/img/banner/anhBienDep.jpg";
import { user } from "../../utils/Type/TypeUser";

type Props = {};

export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [day, setDay] = useState("1/1/2022");

  useEffect(() => {
    dispatch(getUserApi());
  }, []);

  const { isExitEmail, handleCheckEmail } = UseCheckEmail();

  const schema = object({
    email: string()
      .required("Email không được để trống")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Email phải có định dạng test@gmail.com",
      }),
    password: string()
      .required("Mật khẩu không được để trống")
      .matches(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/g, {
        message:
          "Mật khẩu tối thiểu 8 kí tự , gồm ít nhất 1 chữ cái , 1 số , không kí tự đặc biệt",
      }),
    name: string()
      .required("Tên không được để trống")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
        {
          message: "Tên sai định dạng",
        }
      ),
    phone: string()
      .required("Số điện thoại không được để trống")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
        message: "Số điện thoại không đúng định dạng",
      }),
    birthday: string().required("Ngày sinh không được để trống"),
    gender: boolean().required("Giới tính không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<user>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values: user) => {
    let newValue = { ...values, role: "USER" };
    // let data = {
    //   username: newValue.name,
    //   gender: newValue.gender,
    //   phone: newValue.phone,
    //   email: newValue.email,
    //   password: newValue.password,
    //   birthday: newValue.birthday,
    //   role: newValue.role,
    // };
    // const result = await axios.post(registerRoute, data);
    try {
      let result = await http.post("/auth/signup", values);
      if (result.status === 200) {
        toast.success("Đăng kí thành công", toastOptionsSuccess);
      } else {
        toast.error("Hãy Đăng Kí Lại", toastOptionsErr);
      }
    } catch (err) {
      toast.error("Hãy Đăng Kí Lại", toastOptionsErr);
    }
  });

  return (
    <>
      <form
        id="form"
        onSubmit={onSubmit}
        style={{
          backgroundImage: `url(${backgroundImageRegister})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-grey-lighter min-h-screen flex flex-col bg-slate-300"
      >
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2 relative">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full  ">
            <h1 className="mb-8 text-3xl text-center">Đăng kí tài khoản</h1>
            <div className="sm:flex sm:gap-3">
              <div className=" sm:w-1/2">
                <div className="sm:h-24 h-20">
                  <input
                    {...register("name")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-0"
                    placeholder="Tên"
                  />
                  {errors.name && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="sm:h-24 h-20">
                  <input
                    onInput={handleCheckEmail}
                    {...register("email")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-0"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.email.message}
                    </p>
                  )}
                  {!isExitEmail && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      Email đã tồn tại
                    </p>
                  )}
                </div>
                <div className="relative sm:h-24 h-20">
                  <input
                    {...register("password")}
                    type={isShowPass ? "text" : "password"}
                    className="block border border-grey-light w-full p-3 rounded mb-0"
                    placeholder="Mật khẩu"
                  />
                  {errors.password && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.password.message}
                    </p>
                  )}
                  <span
                    onClick={() => setIsShowPass(!isShowPass)}
                    className="absolute top-4 right-1"
                  >
                    <AiOutlineEye
                      className={classNames("text-lg cursor-pointer", {
                        hidden: !isShowPass,
                      })}
                    />
                    <AiOutlineEyeInvisible
                      className={classNames("text-lg cursor-pointer", {
                        hidden: isShowPass,
                      })}
                    />
                  </span>
                </div>
              </div>
              <div className="sm:w-1/2">
                <div className="sm:h-24 h-20 ">
                  <input
                    {...register("phone")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-0"
                    placeholder="Số Điện Thoại"
                  />
                  {errors.phone && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="sm:h-24 h-20">
                  <input
                    {...register("birthday")}
                    onChange={(e) =>
                      setDay(
                        dayjs(e.target.value).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                      )
                    }
                    type="date"
                    className="block border border-grey-light w-full p-3 rounded mb-0"
                    placeholder="Ngày Sinh"
                  />
                  {errors.birthday && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
                <div className="sm:h-24 h-20">
                  <select
                    {...register("gender")}
                    // type=""
                    className="block border border-grey-light w-full p-3 rounded mb-0"
                  >
                    <option value={"true"}>Nam</option>
                    <option value={"false"}>Nữ</option>
                  </select>
                  {errors.gender && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white text-lg hover:bg-green-dark focus:outline-none my-1"
            >
              Tạo tài khoản
            </button>
            <div className="text-center text-sm text-grey-dark mt-4">
              {`Bằng cách đăng ký, bạn đồng ý với` + " "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                {`Điều khoản dịch vụ` + " "}
              </a>
              {`và` + " "}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                {`Chính sách quyền riêng tư`}
              </a>
            </div>
          </div>
          <div className="text-grey-dark mt-6 text-slate-700 text-xl">
            <button className="mr-2">Nếu có tài khoản ?</button>
            <button
              className="hover:text-blue-700"
              onClick={() => {
                navigate("/login/2");
              }}
            >
              Đăng Nhập
            </button>
          </div>
        </div>
        <button
          className="sm:absolute top-10 left-10 font-medium text-xl text-black hover:text-red-400 "
          onClick={() => {
            navigate("/");
          }}
        >
          Trang Chủ
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
