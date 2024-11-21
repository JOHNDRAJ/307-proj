import React from "react";
import formatTimestamp from "../utils/utils";
import "./Sidebar.css";

//will make everything props once backend is good
//also have to create the search bar

function Sidebar({ onSelectContact, onSelectSearch }) {
  return (
    <div className="sidebar">
      <h1>PolyMessages</h1>
      <button className="search-button" onClick={() => onSelectSearch()}>
        <i className="fa-solid fa-magnifying-glass"></i> Search
      </button>
      <ContactsList onSelectContact={onSelectContact} />
    </div>
  );
}

//will pass in contacts list through props from backend when it works
function ContactsList({ onSelectContact }) {
  const contacts = [
    { id: 1, name: "John", lastMessage: "Hey", lastTimestamp: new Date() },
    { id: 2, name: "Alec", lastMessage: "Yo", lastTimestamp: new Date() },
    {
      id: 3,
      name: "Brennan",
      lastMessage: "Hello",
      lastTimestamp: new Date(new Date().getTime() - 45 * 60 * 1000),
    },
    {
      id: 4,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    {
      id: 5,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    {
      id: 6,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: 7,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 8,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(
        new Date().getTime() - 2 * 30.44 * 24 * 60 * 60 * 1000
      ),
    },
    {
      id: 9,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(
        new Date().getTime() - 2 * 30.44 * 24 * 60 * 60 * 1000
      ),
    },
    {
      id: 10,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(
        new Date().getTime() - 13 * 30.44 * 24 * 60 * 60 * 1000
      ),
    },
    {
      id: 11,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(
        new Date().getTime() - 13 * 30.44 * 24 * 60 * 60 * 1000
      ),
    },
    {
      id: 12,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(
        new Date().getTime() - 13 * 30.44 * 24 * 60 * 60 * 1000
      ),
    },
    {
      id: 13,
      name: "Karthik",
      lastMessage: "Sup",
      lastTimestamp: new Date(
        new Date().getTime() - 13 * 30.44 * 24 * 60 * 60 * 1000
      ),
    },
  ];

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        /* Pass in user object for contact */
        <ContactItem
          key={contact.id}
          contact={contact}
          onSelectContact={onSelectContact}
        />
      ))}
    </div>
  );
}

function ContactItem({ contact, onSelectContact }) {
  return (
    <div
      className="contact-item"
      onClick={() => onSelectContact(contact.name)} // Pass contact name on click
    >
      <div className="contact-preview">
        {/* Get image from contact object when the actual schema is setup for it */}
        <img
          className="contact-pic"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        />
        <div className="contact-details">
          <h3>{contact.name}</h3>
          <p>{contact.lastMessage}</p>
        </div>
      </div>

      <p>{formatTimestamp(contact.lastTimestamp, true)}</p>
    </div>
  );
}

export default Sidebar;
