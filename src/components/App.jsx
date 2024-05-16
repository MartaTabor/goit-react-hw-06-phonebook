import { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { SearchBar } from './SearchBar/SearchBar';
import ContactsList from './ContactList/ContactsList';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  setName,
  setNumber,
  setFilter,
} from '../redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter, name, number } = useSelector(
    (state = state.contacts)
  );

  useEffect(() => {
    const savedUserData = localStorage.getItem('user-data');
    if (savedUserData) {
      const data = JSON.parse(savedUserData);
      dispatch(setName(data.name));
      dispatch(setNumber(data.number));
      data.contacts.forEach(contact => dispatch(addContact(contact)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      'user-data',
      JSON.stringify({ contacts, filter, name, number })
    );
  }, [contacts, filter, name, number]);

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      dispatch(setName(value));
    } else if (name === 'number') {
      dispatch(setNumber(value));
    } else if (name === 'filter') {
      dispatch(setFilter(value));
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    dispatch(addContact({ name, number }));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <SearchBar filter={filter} onFilterChange={onChange} />
      <h2 className={css.heading}>Contacts</h2>
      <ContactsList
        contacts={contacts}
        filter={filter}
        onDelete={handleDelete}
      />
    </div>
  );
};
