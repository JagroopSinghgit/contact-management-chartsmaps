import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addContact, editContact, deleteContact } from "../actions";

const Contacts = ({ contacts, addContact, editContact, deleteContact }) => {
  // State to manage input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("Active");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Populate input fields when editing a contact
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

  // Handle form submission for adding/editing contacts
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedContact) {
      const updatedData = {
        firstName,
        lastName,
        status,
      };
      editContact(selectedContact.id, updatedData);
      setSelectedContact(null);
    } else {
      const newContact = {
        id: Date.now(),
        firstName,
        lastName,
        status,
      };
      addContact(newContact);
    }

    // Reset form fields and visibility
    setFirstName("");
    setLastName("");
    setStatus("Active");
    setShowAddForm(false);
  };

  // Handle editing a contact
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowAddForm(true);
  };

  // Handle deleting a contact
  const handleDelete = (contactId) => {
    deleteContact(contactId);
  };

  // Handle viewing details of a contact
  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowAddForm(false);
  };

  // Handle closing contact details popup
  const handleCloseDetails = () => {
    setSelectedContact(null);
  };

  return (
    // Main container
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-5">Contacts</h2>
        {/* Add/Edit contact form */}
        {showAddForm || selectedContact ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 mb-4"
          >
            {/* First Name input */}
            <div className="mb-4">
              <label className="block font-medium">First Name:</label>
              {/* Input field */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            {/* Last Name input */}
            <div className="mb-4">
              <label className="block font-medium">Last Name:</label>
              {/* Input field */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            {/* Status selection */}
            <div className="mb-4">
              <span className="block font-medium">Status:</span>
              <div className="flex space-x-4">
                {/* Active status */}
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
                {/* Inactive status */}
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
            {/* Submit and Cancel buttons */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 focus:outline-none"
              >
                {selectedContact ? "Update Contact" : "Save Contact"}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-red-500 hover:bg-red-600 text-white rounded py-2 px-6 ml-4 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // "Add Contact" button
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-6 mb-4 focus:outline-none"
          >
            Add Contact
          </button>
        )}
        {/* Display contacts */}
        {contacts.length === 0 ? (
          // No contacts message
          <div className="text-center">
            <span className="x-icon bg-red-500 text-white rounded-full p-2 inline-block mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <p className="text-lg font-bold mb-2">No Contact Found</p>
            Please add contacts using the "Add Contact" button
          </div>
        ) : (
          // Display contacts in grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between"
              >
                {/* Contact name */}
                <strong className="text-lg mb-2 block">
                  {contact.firstName} {contact.lastName}
                </strong>
                {/* Status */}
                <span className="inline-flex items-center px-2 py-1 rounded-full font-semibold">
                  {contact.status === "Active" ? (
                    <span className="mr-1 h-2 w-2 bg-green-500 rounded-full"></span>
                  ) : (
                    <span className="mr-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                  {contact.status}
                </span>
                {/* Action buttons */}
                <div className="mt-4 space-x-2 action-buttons">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-4 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded py-1 px-4 focus:outline-none"
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
              </div>
            ))}
          </div>
        )}
        {/* Contact details popup */}
        {selectedContact && !showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
              <p>
                <strong>First Name:</strong> {selectedContact.firstName}
                <br />
                <strong>Last Name:</strong> {selectedContact.lastName}
                <br />
                <strong>Status:</strong> {selectedContact.status}
              </p>
              <button
                onClick={handleCloseDetails}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-4 mt-4 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
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
