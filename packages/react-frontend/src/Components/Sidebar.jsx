import React from "react";
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
    { id: 3, name: "Brennan", lastMessage: "Hello", lastTimestamp: new Date() },
    { id: 4, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 5, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 6, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 7, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 8, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 9, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 10, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 11, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 12, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
    { id: 13, name: "Karthik", lastMessage: "Sup", lastTimestamp: new Date() },
  ];

  //change later to include more for Contact object
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
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
        <img
          className="contact-pic"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        />
        <div className="contact-details">
          <h3>{contact.name}</h3>
          <p>{contact.lastMessage}</p>
        </div>
      </div>

      <p>
        {contact.lastTimestamp.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>
  );
}

export default Sidebar;
