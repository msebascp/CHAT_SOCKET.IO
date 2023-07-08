import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me"
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  });

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className=" bg-zinc-900 p-10">
        <h1 className=" text-2xl font-bold my-2">Chat React</h1>
        <label htmlFor="newMessage">Write Message</label>
        <input
          type="text"
          id="newMessage"
          onChange={(e) => setMessage(e.target.value)}
          className=" border-2 border-zinc-500 p-2 w-full text-black"
        />
        <button>Send</button>
        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-slate-900"
              }`}
            >
              {message.from}: {message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
