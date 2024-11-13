import React, { useState } from "react";
import "./Channel.css";

//will make everything props once backend is good

//add MessageList when needed
//maybe update contactName to be the whole user object?
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
    <div className="contact-header">
      <h2>{name}</h2>
      <button className="view-profile-btn">
        <i class="fa-solid fa-user"></i>View Profile
      </button>
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
    <div>
      <input
        className="message-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message..."
      />
      <button className="send-btn" onClick={sendMessage}>
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
}

export default Channel;
