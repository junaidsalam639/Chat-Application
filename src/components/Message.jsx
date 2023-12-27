import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const date = new Date();
  const dates = date.toLocaleString().slice(11, 23);
  const secondOut = dates.slice(0, 6);
  const pmOut = dates.slice(9, 13);
  const concat = secondOut + " " + pmOut;
  console.log(concat);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span
          style={{
            fontSize: "11px",
            marginTop: "10px",
            backgroundColor: "white",
            padding: "2px",
            borderRadius: "2px",
            fontWeight: "600",
          }}
        >
          {concat}
        </span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
