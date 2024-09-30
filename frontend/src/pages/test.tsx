import { Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

const Test: React.FC = () => {
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState(0);

  useEffect(() => {
    // サーバーからのメッセージを受け取る
    socket.on("message", (msg) => {
      console.log("message from server:", msg);
      setMessage(msg);
    });

    // コンポーネントのクリーンアップ時にソケットのリスナーを解除
    return () => {
      socket.off("message");
    };
  }, []);

  const handleClick = () => {
    socket.emit("message", `Client Count: ${number}`);
    setNumber(number + 1);
  };

  return (
    <div>
      <h1>Socket.io Client</h1>
      <p>Message from server: {message}</p>
      <Button onClick={() => handleClick()}>PUSH</Button>
    </div>
  );
};

export default Test;
