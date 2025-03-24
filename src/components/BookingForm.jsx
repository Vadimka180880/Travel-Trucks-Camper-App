import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';
import PropTypes from 'prop-types';

const BookingForm = ({ camper }) => {
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
      <h2>Book {camper?.name}</h2>
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
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.confirm}>
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  camper: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookingForm;
