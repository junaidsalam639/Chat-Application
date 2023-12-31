import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import newPng from "../img/new.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EmojiPicker from "emoji-picker-react";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setText((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  const handleEmojiButtonClick = () => {
    setShowPicker((prevShowPicker) => !prevShowPicker);
  };

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const date = new Date();
  const dates = date.toLocaleString().slice(11, 23);
  const secondOut = dates.slice(0, 6);
  const pmOut = dates.slice(9, 13);
  const concat = secondOut + " " + pmOut;

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: [Timestamp.now() , concat],
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: [Timestamp.now() , concat],
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={newPng} alt="" onClick={handleEmojiButtonClick} />
        {showPicker && (
        <EmojiPicker disableSearchBar onEmojiClick={onEmojiClick} width='100%' height={600} />
      )}

        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button className="button-style" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
