import React, { useEffect, useState } from "react";
import { formatLastTimestamp } from "../utils/utils";
import "./Sidebar.css";
import { removeName } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Sidebar({
  onSelectContact,
  onSelectSearch,
  user,
  refresh,
  setRefresh,
}) {
  return (
    <div className="sidebar">
      <h1>PolyMessages</h1>
      <button className="search-button" onClick={() => onSelectSearch()}>
        <i className="fa-solid fa-magnifying-glass"></i> Search
      </button>
      <ContactsList
        onSelectContact={onSelectContact}
        user={user}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
}

function ContactsList({ onSelectContact, user, refresh, setRefresh }) {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/channel/`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/channel/`,
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
          const extractedData = data.cxus.map((item) => item.channel);
          setContacts(extractedData);
        } else {
          alert(data.message || "An error occurred."); // Corrected error message handling
        }
      } catch (error) {
        console.error("Error during fetch:", error); // More specific error output
        alert("An error occurred during channel fetch.");
      }
    };
    fetchChannels();
    setRefresh(false);
  }, [refresh]);

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact._id}
          contact={contact}
          onSelectContact={onSelectContact}
          user={user}
        />
      ))}
    </div>
  );
}

function ContactItem({ contact, onSelectContact, user }) {
  const [message, setMessage] = useState({});
  const [messageSender, setMessageSender] = useState({});

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/message/text/${contact.recentMessage}`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/message/text/${contact.recentMessage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error("Error during fetch:", error); // More specific error output
      }
    };

    fetchMessage();
  }, [contact.recentMessage]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5001/api/user/id/${message.userMessage.sender}`,
          `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/user/id/${message.userMessage.sender}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setMessageSender(data);
      } catch (error) {
        console.error("Error during fetch:", error); // More specific error output
      }
    };
    fetchUser();
  }, [message]);

  const limitPreviewText = (text, charLimit) => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  };

  return (
    <div
      className="contact-item"
      onClick={() => onSelectContact(contact)} // Pass contact name on click
    >
      <div className="contact-preview">
        <img className="contact-pic" src="/assets/default-profile-pic.webp" />
        <div className="contact-details">
          <div className="contact-details-top">
            <h3>{limitPreviewText(removeName(contact.name, user.name), 32)}</h3>
            <p>{formatLastTimestamp(message.userMessage?.timestamp)}</p>
          </div>
          <p>
            {message.userMessage?.contents && messageSender.user?.name && user
              ? message.userMessage.sender === user?._id
                ? limitPreviewText(`You: ${message.userMessage.contents}`, 48)
                : limitPreviewText(
                    `${messageSender.user.name}: ${message.userMessage.contents}`,
                    45
                  )
              : "No messages"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
