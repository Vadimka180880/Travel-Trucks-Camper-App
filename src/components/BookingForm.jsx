import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

// Додаємо PropTypes для перевірки типів пропсів
import PropTypes from 'prop-types';

const BookingForm = ({ camper, onClose }) => { // camper та onClose передаються як пропси
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!camper || !camper.name) {
      alert('Camper information is missing.');
      return;
    }
    alert(`Booking confirmed for ${camper.name} from ${startDate.toDateString()} to ${endDate.toDateString()}`);
  };

  return (
    <div className={styles.bookingForm}>
      <h2>Book {camper?.name}</h2> {/* Використовуємо camper.name з перевіркою */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={onClose}>Close</button> {/* Використовуємо onClose */}
      </form>
    </div>
  );
};

// Додаємо перевірку типів для пропсів
BookingForm.propTypes = {
  camper: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingForm;