import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

const BookingForm = ({ camper, onClose }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.bookingForm}>
      <h2>Book {camper.name}</h2>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <button onClick={onClose}>Close</button>
      <button>Confirm Booking</button>
    </div>
  );
};

export default BookingForm;