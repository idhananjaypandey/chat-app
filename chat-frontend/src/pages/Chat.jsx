import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  // 🔌 CONNECT SOCKET ONCE
  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      auth: { token }
    });

    // receive messages
    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // receive online users
    socketRef.current.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // 🔽 auto scroll when message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✉️ send message
  const sendMessage = () => {
    if (!text.trim()) return;

    socketRef.current.emit("sendMessage", {
      sender: username,
      name: name, 
      text
    });

    setText("");
  };

  return (
    <div className="chat-page">
      <Navbar name={name} username={username} />

      <div className="chat-body">
        {/* CHAT */}
        <div className="chat-section">
          <div className="messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`bubble ${
                  m.sender === username ? "me" : "other"
                }`}
              >
                {/* <strong>{m.name}</strong> */}
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <input
              value={text}
              placeholder="Type a message..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        {/* ONLINE USERS */}
        <div className="users-section">
          <h4>Online Users</h4>
          {onlineUsers.map((u) => (
            <div key={u} className="online-user">
              {u}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
