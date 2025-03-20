import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookingForm from '../components/BookingForm';
import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const campers = useSelector((state) => state.campers.items);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const camper = campers.find((item) => item.id === id);

  if (!camper) return <div>Camper not found</div>;

  return (
    <div className={styles.camperDetailsPage}>
      <h1>{camper.name}</h1>
      <p>{camper.location}</p>

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

      {/* Кнопка для бронювання */}
      <button onClick={() => setIsBookingModalOpen(true)} className={styles.bookButton}>
        Book Now
      </button>

      {/* Модальне вікно для бронювання */}
      {isBookingModalOpen && (
        <BookingForm camper={camper} onClose={() => setIsBookingModalOpen(false)} />
      )}
    </div>
  );
};

export default CamperDetailsPage;