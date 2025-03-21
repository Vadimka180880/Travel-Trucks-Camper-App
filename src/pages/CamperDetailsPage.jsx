import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const campers = useSelector((state) => state.campers.items);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const camper = campers.find((item) => item.id === id);

  if (!camper) return <div>Camper not found</div>;

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Booking confirmed!');
  };

  return (
    <div className={styles.camperDetailsPage}>
      <h1>{camper.name}</h1>
      <p>{camper.location}</p>

      <div className={styles.contentWrapper}>
        {/* Ліва частина: Галерея, Features, Reviews */}
        <div className={styles.leftContent}>
          {/* Галерея фотографій */}
          <div className={styles.gallery}>
            {camper.gallery?.map((photo, index) => (
              <img key={index} src={photo.original} alt={`Camper ${index + 1}`} />
            ))}
          </div>

          {/* Характеристики */}
          <div className={styles.features}>
            <h2>Features</h2>
            <ul>
              <li>Transmission: {camper.transmission}</li>
              <li>Engine: {camper.engine}</li>
              <li>AC: {camper.AC ? 'Yes' : 'No'}</li>
              <li>Kitchen: {camper.kitchen ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          {/* Відгуки */}
          <div className={styles.reviews}>
            <h2>Reviews</h2>
            {camper.reviews?.map((review, index) => (
              <div key={index} className={styles.review}>
                <p>{review.comment}</p>
                <p>Rating: {'⭐'.repeat(review.reviewer_rating)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Права частина: Форма бронювання */}
        <div className={styles.bookingForm}>
          <h2>Book this camper</h2>
          <form onSubmit={handleBooking}>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate.toISOString().split('T')[0]}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate.toISOString().split('T')[0]}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
            </div>
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;