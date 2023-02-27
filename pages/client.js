import { useEffect, useState } from "react";
import io from "socket.io-client";

import styles from "../styles/Client.module.css";

let socket;

export default function Client() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    useSocket();
  }, []);

  const useSocket = () => {
    socket = io();

    socket.on("connect", () => {
      console.log(`[app] socket connected (ID: ${socket.id})`);
    });

    socket.on("update-input", (msg) => {
      setDisplay(msg);
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.text}>{display}</h1>
    </main>
  );
}
