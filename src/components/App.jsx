import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { SearchBar } from './SearchBar/SearchBar';
import ContactsList from './ContactList/ContactsList';
import css from './App.module.css';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
  name: '',
  number: '',
};

export const App = () => {
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('user-data');
    return savedUserData ? JSON.parse(savedUserData) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }, [userData]);

  const onChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();

    const { name, number, contacts } = userData;

    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    setUserData({
      ...userData,
      contacts: [...contacts, { name, number, id: nanoid() }],
      name: '',
      number: '',
    });
  };

  const handleDelete = id => {
    setUserData({
      ...userData,
      contacts: userData.contacts.filter(contact => contact.id !== id),
    });
  };

  const handleFilterChange = event => {
    setUserData({ ...userData, filter: event.target.value });
  };

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Phonebook</h1>
      <ContactForm
        userData={userData}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <SearchBar filter={userData.filter} onFilterChange={handleFilterChange} />
      <h2 className={css.heading}>Contacts</h2>
      <ContactsList
        contacts={userData.contacts}
        filter={userData.filter}
        onDelete={handleDelete}
      />
    </div>
  );
};
