import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: [],
  filter: '',
  name: '',
  number: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      const { name, number } = action.payload;
      const isExist = state.contacts.some(
        contact => contact.name.toLowerCase() === name.trim().toLowerCase()
      );
      if (isExist) {
        alert(`${name} is already in contacts`);
      } else {
        state.contacts.push({ id: nanoid(), name, number });
        state.name = '';
        state.number = '';
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setName, setNumber, setFilter } =
  contactsSlice.actions;
export default contactsSlice.reducer;
