import React, { useState } from 'react'; // Імпорт useState
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css'; // Імпорт стилів

const BookingForm = ({ camper, onClose }) => {
  const [startDate, setStartDate] = useState(new Date()); // Стан для дати початку
  const [endDate, setEndDate] = useState(new Date()); // Стан для дати завершення
  const [name, setName] = useState(''); // Стан для імені
  const [email, setEmail] = useState(''); // Стан для електронної пошти

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${camper.name} from ${startDate.toDateString()} to ${endDate.toDateString()}`);
  };

  return (
    <div className={styles.bookingForm}>
      <h2>Book {camper.name}</h2>
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
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default BookingForm;