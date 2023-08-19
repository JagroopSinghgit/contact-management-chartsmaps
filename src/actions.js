// actions.js
export const addContact = (contact) => ({
  type: "ADD_CONTACT",
  payload: contact,
});

export const editContact = (contactId, updatedData) => ({
  type: "EDIT_CONTACT",
  payload: { contactId, updatedData },
});

export const deleteContact = (contactId) => ({
  type: "DELETE_CONTACT",
  payload: contactId,
});
