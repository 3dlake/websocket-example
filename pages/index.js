import { useEffect, useState } from "react";
import io from "socket.io-client";

import styles from "../styles/Home.module.css";

let socket;

export default function Home() {
  const [input, setInput] = useState("");

  useEffect(() => {
    useSocket();
  }, []);

  const useSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log(`[app] socket connected (ID: ${socket.id})`);
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("new-input", e.target.value);
  };

  return (
    <main className={styles.main}>
      <input
        className={styles.content}
        placeholder="Enter Text"
        value={input}
        onChange={onChangeHandler}
      />
    </main>
  );
}
