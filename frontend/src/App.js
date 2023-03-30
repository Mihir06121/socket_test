import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  // Messages States
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([])

  const sendMessage = (message) => {
    setAllMessages(allMessages => [...allMessages, {send: message}])
    socket.emit("send_message", { message });
    console.log(allMessages)
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessages(allMessages => [...allMessages, {rec: data.message}])
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={() => sendMessage(message)}> Send Message</button>
      <h1> Message:</h1>
      {JSON.stringify(allMessages)}
    </div>
  );
}

export default App;