import React, { useState } from "react";
import "./Channel.css";

//will make everything props once backend is good

//add MessageList when needed
function Channel({ contactName }) {
  return (
    <div className="channel">
      <ContactHeader name={contactName} />
      <MessageInput />
    </div>
  );
}

//name changed based on button click, and what name gets passed in
function ContactHeader({ name }) {
  return (
    <div className="contactHeader">
      <h2>Chat with {name}</h2>
    </div>
  );
}

//again will do messaging in database once set up
/*function MessageList(props) {
  const messages = [
    { id: 1, sender: "John", message: "I am John" },
    { id: 2, sender: "Alec", message: "I am Alec" },
  ];

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

function MessageItem({ message }) {
  return (
    <div
      className={`message-item ${message.sender === "Me" ? "sent" : "received"}`}
    >
      <p>
        <strong>{message.sender}:</strong> {message.content}
      </p>
    </div>
  );
}
*/

//console.log replace with whatever prop to display on the chat window
function MessageInput(props) {
  const [text, setText] = useState("");
  const sendMessage = () => {
    if (text.trim()) {
      console.log(text);
      setText("");
    }
  };

  return (
    <div className="messageInput">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Channel;
