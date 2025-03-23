import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookingForm from '../components/BookingForm';
import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const campers = useSelector((state) => state.campers.items);
  const camper = campers.find((item) => item.id === id);
  const [activeTab, setActiveTab] = useState('features');

  if (!camper) return <div>Camper not found</div>;

  return (
    <div className={styles.container}>
      {/* Заголовок та кнопка назад */}
      <Link to="/catalog" className={styles.backLink}>← Back to Catalog</Link>
      <h1>{camper.name}</h1>

      {/* Вкладки Features/Reviews */}
      <div className={styles.tabs}>
        <button
          className={activeTab === 'features' ? styles.activeTab : ''}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={activeTab === 'reviews' ? styles.activeTab : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({camper.reviews.length})
        </button>
      </div>

      {/* Контент вкладок */}
      <div className={styles.content}>
        {activeTab === 'features' && (
          <div className={styles.features}>
            <ul>
              <li>Transmission: {camper.transmission}</li>
              <li>AC: {camper.AC ? 'Yes' : 'No'}</li>
              {/* Інші характеристики */}
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviews}>
            {camper.reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <p>⭐ {review.reviewer_rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Форма бронювання справа */}
      <div className={styles.bookingSection}>
        <BookingForm camper={camper} />
      </div>
    </div>
  );
};

export default CamperDetailsPage;