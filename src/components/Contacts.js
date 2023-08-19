import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addContact, editContact, deleteContact } from "../actions"; // Make sure to import the necessary actions

const Contacts = ({ contacts, addContact, editContact, deleteContact }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("Active");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setStatus(selectedContact.status);
    } else {
      setFirstName("");
      setLastName("");
      setStatus("Active");
    }
  }, [selectedContact]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedContact) {
      // Update contact
      const updatedData = {
        firstName,
        lastName,
        status,
      };
      editContact(selectedContact.id, updatedData);
      setSelectedContact(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        firstName,
        lastName,
        status,
      };
      addContact(newContact);
    }

    setFirstName("");
    setLastName("");
    setStatus("Active");
    setShowAddForm(false);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowAddForm(true);
  };

  const handleDelete = (contactId) => {
    deleteContact(contactId);
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowAddForm(false); // Don't show the form when viewing details
  };

  const handleCloseDetails = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      <h2 className="section-heading">Contacts</h2>
      {showAddForm || selectedContact ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 mb-4">
          <div className="mb-15">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-15">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="status-wrap">
            <span>Status:</span>
            <div className="flex space-x-4">
              <label className="radio">
                <input
                  type="radio"
                  value="Active"
                  checked={status === "Active"}
                  onChange={() => setStatus("Active")}
                  className="form-radio text-blue-500"
                />
                <span className="text-gray-700 font-medium">Active</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  value="Inactive"
                  checked={status === "Inactive"}
                  onChange={() => setStatus("Inactive")}
                  className="form-radio text-red-500"
                />
                <span className="text-gray-700 font-medium">Inactive</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 focus:outline-none"
            >
              {selectedContact ? "Update Contact" : "Save Contact"}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-red-500 hover:bg-red-600 text-white rounded py-2 px-6 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded py-2 px-6 mb-4 focus:outline-none"
        >
          Add Contact
        </button>
      )}
      {contacts.length === 0 ? (
        <h4 className="no-contact-found">
          <span className="x-icon">X</span>
          No Contact Found
          <br />
          Please add contact from Create Contact Button
        </h4>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="bg-white rounded-lg p-4 shadow-md">
              <strong className="text-lg mb-2 block">
                {contact.firstName} {contact.lastName}
              </strong>
              <span
                className={`inline-block px-2 py-1 rounded ${
                  contact.status === "Active"
                    ? "bg-blue-500 text-blue-100"
                    : "bg-red-500 text-red-100"
                }`}
              >
                {contact.status}
              </span>
              <div className="action-btns">
                <button
                  onClick={() => handleEdit(contact)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-4 mr-2 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded py-1 px-4 mr-2 focus:outline-none"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewDetails(contact)}
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded py-1 px-4 focus:outline-none"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedContact && !showAddForm && (
        <div className="view-detail">
          <h3>Contact Details</h3>
          <p>
            <strong>First Name:</strong> {selectedContact.firstName}
            <br />
            <strong>Last Name:</strong> {selectedContact.lastName}
            <br />
            <strong>Status:</strong> {selectedContact.status}
          </p>
          <button
            onClick={handleCloseDetails}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-4 mt-2 focus:outline-none"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

const mapDispatchToProps = {
  addContact,
  editContact,
  deleteContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
