import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ name, number, onChange, onSubmit }) => {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.label} htmlFor="nameField">
        Name
      </label>
      <input
        className={css.input}
        id="nameField"
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        required
      />
      <label className={css.label} htmlFor="phoneField">
        Number
      </label>
      <input
        className={css.input}
        id="phoneField"
        type="tel"
        name="number"
        value={number}
        onChange={onChange}
        placeholder="Phone Number"
        pattern="\+?\d{1,4}?[ .\\-\\s]?\(?\d{1,3}?\)?[ .\\-\\s]?\d{1,4}[ .\\-\\s]?\d{1,4}[ .\\-\\s]?\d{1,9}"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
