import { Layout } from "antd";
import React, { useRef } from "react";
import { user } from "../../pages/ChatBox/Chat";
import personIcon from "../../assets/img/personIcon.jpg";
const { Sider } = Layout;
type Props = {
  arrUser: any;
  handleSelectUser: any;
  currentChat: user | null;
};

export default function SilderAdminUser({
  arrUser,
  handleSelectUser,
  currentChat,
}: Props) {
  const scrollRef = useRef<any>(0);

  return (
    <>
      {currentChat !== null ? (
        <Sider className="overflow-y-auto scroll-smooth">
          <div
            className="flex flex-col justify-center items-center gap-4 "
            ref={scrollRef}
          >
            {arrUser?.map(
              (
                user: { avatar: string; username: string; active: boolean },
                index: number
              ) => {
                return (
                  <div
                    key={index}
                    className={
                      user.active
                        ? "text-red-700 bg-slate-500 overflow-hidden rounded-lg flex flex-col items-center w-full"
                        : "flex flex-col items-center bg-slate-200 overflow-hidden rounded-lg w-full"
                    }
                  >
                    <button
                      className="mt-2"
                      onClick={() => {
                        handleSelectUser(user);
                        scrollRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      <img
                        src={user.avatar !== null ? user.avatar : personIcon}
                        alt="..."
                        className="w-full h-full rounded-full h-16 w-16"
                      />{" "}
                    </button>
                    <p className={user.active ? "text-red-500" : "text-gray-400"}>
                      {user.username.length > 20
                        ? user.username.slice(0, 15) + "..."
                        : user.username}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </Sider>
      ) : (
        <div className="bg-white">
          {arrUser?.map(
            (
              user: { avatar: string; username: string; active: boolean },
              index: number
            ) => {
              return (
                <button
                  className="flex gap-2 mb-2 bg-slate-200 py-2 w-full"
                  key={index}
                  onClick={() => {
                    handleSelectUser(user);
                  }}
                >
                  <div className="pl-2">
                    <img
                      src={
                        user.avatar!== null? user.avatar : personIcon
                      }
                      alt="..."
                      className="w-full h-full rounded-full h-16 w-16  "
                    />
                  </div>
                  <p>{user.username}</p>
                </button>
              );
            }
          )}
        </div>
      )}
    </>
  );
}
