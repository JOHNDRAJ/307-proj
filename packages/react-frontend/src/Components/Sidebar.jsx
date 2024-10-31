import React from "react";

//will make everything props once backend is good

function Sidebar({ onSelectContact }) {
  return (
    <div className="sidebar">
      <h2>Messages</h2>
      <ContactsList onSelectContact={onSelectContact} />
    </div>
  );
}

//will pass in contacts list through props from backend when it works
function ContactsList({ onSelectContact }) {
  const contacts = [
    { id: 1, name: "John", lastMessage: "Hi" },
    { id: 2, name: "Alec", lastMessage: "Yo" },
    { id: 3, name: "Brennan", lastMessage: "Hello" },
    { id: 4, name: "Karthik", lastMessage: "Whats up" },
  ];

  //change later to include more for Contact object
  return (
    <div className="contactList">
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
      <h3>{contact.name}</h3>
      <p>{contact.lastMessage}</p>
    </div>
  );
}
export default Sidebar;
