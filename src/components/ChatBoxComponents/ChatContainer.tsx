import axios from "axios";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Layout, notification } from "antd";
import InputChat from "./InputChat";
import ContentChat from "./ContentChat";
import _, { reverse } from "lodash";
import { user } from "../../pages/ChatBox/Chat";
import { CURRENT_USER, getStoreJSON } from "../../utils/setting";
import { receiveMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";

const { Footer, Content } = Layout;

type Props = {
  currentChat: user | null;
  socket: React.MutableRefObject<any>;
  arrUser: user[] | null;
};

type Message = {
  fromSelf: boolean;
  message: string;
};

type ArrMessage = Message[] | null;

export default function ChatContainer({ currentChat, socket, arrUser }: Props) {
  const [arrMessage, setArrMessage] = useState<ArrMessage>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Message>();
  const [currentUser, setCurrentUser] = useState<user>();
  const scrollRef = useRef<any>();

  const [userSend, setUserSend] = useState<user | null>(null);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const findUserSend = (id: number) => {
    let findUser = arrUser?.find((user: user) => user.id === id);
    if (findUser) {
      setUserSend(findUser);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let currentUser = getStoreJSON(CURRENT_USER);
        setCurrentUser(currentUser);
        if (currentUser && currentChat) {
          const response = await axios.post(receiveMessageRoute, {
            from: currentUser.id,
            to: currentChat.id,
          });
          setArrMessage(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentChat]);

  const handleSendMsg = async (msg: string) => {
    let currentUser = getStoreJSON(CURRENT_USER);
    if (msg.trim() !== "") {
      socket.current.emit("send-msg", {
        to: currentChat?.id,
        from: currentUser.id,
        msg,
      });
      await axios.post(sendMessageRoute, {
        from: currentUser.id,
        to: currentChat?.id,
        message: msg,
      });

      let msgs = [...(arrMessage || [])];
      msgs.push({ fromSelf: true, message: msg });
      setArrMessage(msgs);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        "msg-receive",
        async (data: { from: string; msg: string }) => {
          await findUserSend(Number(data.from));
          await setArrivalMessage({ fromSelf: false, message: data.msg });
        }
      );
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setArrMessage((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [arrMessage]);

  return (
    <>
      <Content
        className={
          currentUser?.role === "USER" ? "bg-slate-200 " : "bg-slate-400"
        }
      >
        {currentUser?.role === "USER" && (
          <div className="overflow-auto h-full px-6 mt-2 h-200px">
            {arrMessage?.map((message: Message, index: number) => {
              return (
                <div key={index} ref={scrollRef}>
                  {message.fromSelf ? (
                    <ContentChat
                      message={message.message}
                      userName={""}
                      css={
                        "bg-slate-100 text-black mb-2 inline-block py-1 px-3"
                      }
                      textLeftOrRight={"text-right"}
                    />
                  ) : (
                    <ContentChat
                      message={message.message}
                      userName={""}
                      css={
                        "bg-slate-100 text-black mb-2 inline-block py-1 px-3"
                      }
                      textLeftOrRight={"text-left"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {currentUser?.role === "ADMIN" && (
          <div className="overflow-auto h-full px-6 mt-2 py-2">
            {arrMessage?.map((message: Message, index: number) => {
              return (
                <div key={index} ref={scrollRef}>
                  {message.fromSelf ? (
                    <ContentChat
                      message={message.message}
                      userName={currentUser?.role}
                      css={
                        "bg-slate-100 text-black mb-2 inline-block py-1 px-3"
                      }
                      textLeftOrRight={"text-right"}
                    />
                  ) : (
                    <ContentChat
                      message={message.message}
                      userName={
                        userSend ? userSend?.username : currentChat?.username
                      }
                      css={
                        "bg-slate-100 text-black mb-2 inline-block py-1 px-3"
                      }
                      textLeftOrRight={"text-left"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Content>

      <Footer
        className={
          currentUser?.role === "USER" ? "rounded-bl-xl rounded-br-xl" : ""
        }
      >
        <InputChat handleSendMsg={handleSendMsg} />
      </Footer>
    </>
  );
}
