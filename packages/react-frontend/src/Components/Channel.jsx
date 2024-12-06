import React, { useState, useEffect, useRef } from "react";
import "./Channel.css";
import { removeName, formatTimestamp } from "../utils/utils";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io(
  "https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net"
);

function Channel({ channel, user, onSelectProfile, setRefresh }) {
  const [editActive, setEditActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const sendImage = async () => {
    if (imageUrl.trim()) {
      const image = imageUrl;
      setImageUrl("");
      try {
        const response = await fetch(
          // `http://localhost:5001/api/message/send`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/message/send`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              channelId: channel._id, 
              contents: image,
              image: true,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to update message."); 
        }
      } catch (error) {
        console.error("Error while updating message:", error);
        alert("An error occurred while updating the message.");
      }

      setImageUrl("");
    }
  };

  const togglePopup = () => {
    if (!isPopupVisible) {
      setIsPopupVisible(!isPopupVisible);
    } else {
      setIsPopupVisible(!isPopupVisible);
      setImageUrl("");
    }
  };

  return (
    <>
      <div className="channel">
        <div className="channel-contents">
          <MessageList
            channel={channel}
            user={user}
            editActive={editActive}
            setEditActive={setEditActive}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            onSelectProfile={onSelectProfile}
            setRefresh={setRefresh}
          />
        </div>
      </div>
      <div className="message-input">
        <div className="message-input-container">
          <button onClick={() => togglePopup()}>
            <i className="fa-solid fa-plus"></i>
          </button>
          <MessageInput
            channel={channel}
            editActive={editActive}
            setEditActive={setEditActive}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            setRefresh={setRefresh}
          />
        </div>
      </div>
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-box">
            <h2 className="popup-header">Image URL</h2>
            <input
              className="popup-input"
              type="text"
              value={imageUrl}
              onChange={handleChangeImageUrl}
              placeholder="image url..."
            />
            <div className="popup-buttons">
              <button
                className="popup-button submit"
                onClick={() => {
                  sendImage();
                  togglePopup();
                }}
              >
                Send
              </button>
              <button className="popup-button close" onClick={togglePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContactHeader({ channel, name, user, onSelectProfile }) {
  const [channelUsers, setChannelUsers] = useState({});
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/channel/${channel._id}`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/channel/${channel._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setChannelUsers(data.cxus);
        } else {
          alert(
            data.message || "An error occurred while fetching channel users."
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("An error occurred while fetching channel users.");
      }
    };
    getUsers();
  }, [channel._id]);

  return (
    <div className="contact-header">
      <img
        className="profile-pic-medium"
        src="/assets/default-profile-pic.webp"
      />
      <h2>{removeName(name, user.name)}</h2>
      {channelUsers?.length === 2 && (
        <button
          onClick={() => {
            let desiredUser = null;
            for (const channelUser of channelUsers) {
              if (channelUser.user._id !== user._id) {
                desiredUser = channelUser.user;
              }
            }
            onSelectProfile(desiredUser);
          }}
          className="view-profile-btn"
        >
          <i className="fa-solid fa-user"></i>View Profile
        </button>
      )}
    </div>
  );
}

function MessageList({
  channel,
  user,
  editActive,
  setEditActive,
  currentMessage,
  setCurrentMessage,
  onSelectProfile,
  setRefresh,
}) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!channel) return;
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/message/${channel._id}`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/message/${channel._id}`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (data.message == "Invalid token.") {
          navigate("/");
        }

        if (response.ok) {
          setMessages(data.messages);
        } else {
          alert(data.message || "An error occurred while fetching messages.");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("An error occurred while fetching messages.");
      }
    };
    fetchMessages();

    // Join the channel's socket room and listen for new messages
    socket.emit("joinChannel", channel._id);
    socket.on("newMessage", (newMessage) => {
      fetchMessages();
      setRefresh(true);
    });
    // Cleanup when component unmounts or channel changes
    return () => {
      socket.emit("leaveChannel", channel._id);
      socket.off("newMessage");
    };
  }, [channel._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const shouldShowTime = (prevTimestamp, currTimestamp) => {
    const date1 = new Date(prevTimestamp);
    const date2 = new Date(currTimestamp);
    return Math.abs(date1 - date2) / (1000 * 60 * 60) > 1;
  };

  return (
    <div>
      <ContactHeader
        channel={channel}
        name={channel.name}
        user={user}
        onSelectProfile={onSelectProfile}
      />
      <div className="message-list">
        {messages.map((message, index) => (
          <Message
            key={message._id}
            user={user}
            message={message}
            channel={channel._id}
            editActive={editActive}
            setEditActive={setEditActive}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            showName={
              index === 0 ||
              messages[index - 1].sender._id !== message.sender._id
            }
            showTime={
              index === 0 ||
              shouldShowTime(messages[index - 1]?.timestamp, message?.timestamp)
            }
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
}

function Message({
  user,
  message,
  channel,
  editActive,
  setEditActive,
  currentMessage,
  setCurrentMessage,
  showName,
  showTime,
}) {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const deleteMessage = async () => {
    try {
      const response = await fetch(
        // `http://localhost:5001/api/message/del/`,
        `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/message/del/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            messageId: message._id, 
            channelId: channel,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
      } else {
        alert(data.message || "An error occurred while deleteing message.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred while deleting message.");
    }
  };

  const toggleTimestamp = () => {
    setShowTimestamp(!showTimestamp);
  };

  return (
    <>
      {showTime && (
        <p className="channel-timestamp">
          {formatTimestamp(message?.timestamp)}
        </p>
      )}
      {showName && (
        <p
          className={`user-name ${message.sender._id === user._id ? "sent" : "received"}`}
        >
          {message.sender.name}
        </p>
      )}
      <div
        className={`message ${
          message.sender._id === user._id &&
          editActive &&
          message._id === currentMessage?._id
            ? "sent-editing"
            : message.sender._id === user._id
              ? "sent"
              : "received"
        }`}
        onClick={toggleTimestamp}
      >
        {message.image ? (
          <img
            src={message.contents}
            alt="--Unable to Load Image"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        ) : (
          <p>{message.contents}</p>
        )}
        {message.sender._id === user._id && (
          <div className="message-actions">
            <button
              onClick={
                editActive
                  ? () => {
                      setEditActive(false);
                    }
                  : () => {
                      setCurrentMessage(message);
                      setEditActive(true);
                    }
              }
              className="edit-btn"
            >
              <i
                className={editActive ? "fa-solid fa-xmark" : "fa-solid fa-pen"}
              ></i>
            </button>
            <button onClick={deleteMessage} className="delete-btn">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      {showTimestamp && (
        <p
          className={`message ${
            message.sender._id === user._id &&
            editActive &&
            message._id === currentMessage?._id
              ? "sent-editing"
              : message.sender._id === user._id
                ? "sent"
                : "received"
          }`}
        >
          {formatTimestamp(message?.timestamp).split(" ").slice(1).join(" ")}
        </p>
      )}
    </>
  );
}

function MessageInput({
  channel,
  editActive,
  setEditActive,
  currentMessage,
  setRefresh,
}) {
  const [text, setText] = useState("");
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    if (editActive && currentMessage) {
      setInputValue(currentMessage.contents);
    } else {
      setInputValue("");
    }
  }, [editActive, currentMessage]);

  const sendMessage = async () => {
    if (text.trim()) {
      const message = text;
      setText("");
      try {
        const response = await fetch(
          // `http://localhost:5001/api/message/send`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/message/send`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              channelId: channel._id, 
              contents: message, 
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to update message."); 
        }
      } catch (error) {
        console.error("Error while updating message:", error);
        alert("An error occurred while updating the message.");
      }

      setText("");
    }
  };

  const updateMessage = async () => {
    if (text.trim()) {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/message/update`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/message/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              contents: text, 
              messageId: currentMessage._id,
              channelId: channel._id,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setText("");
          setEditActive(false);
        } else {
          alert(data.message || "Failed to send message."); 
        }
      } catch (error) {
        console.error("Error while sending message:", error);
        alert("An error occurred while sending the message.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setRefresh(true);
      editActive ? updateMessage() : sendMessage();
    }
  };

  return (
    <>
      <input
        type="text"
        value={editActive ? inputValue : text}
        onChange={
          editActive
            ? (e) => {
                setInputValue(e.target.value);
                setText(e.target.value);
              }
            : (e) => setText(e.target.value)
        }
        placeholder={editActive ? "Editing..." : "Message..."}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          setRefresh(true);
          editActive ? updateMessage() : sendMessage();
        }}
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </>
  );
}

export default Channel;
