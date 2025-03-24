import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookingForm from '../components/BookingForm';
import ImageModal from '../components/ImageModal';
import styles from './CamperDetailsPage.module.css';

import Star from '../assets/icon_catalog/star.svg';

// Icons
import TransmissionIcon from '../assets/icon_item/Automatic.png';
import KitchenIcon from '../assets/icon_item/Kitchen.png';
import ACIcon from '../assets/icon_item/AC.png';
import BathroomIcon from '../assets/icon_item/bathroom.png';
import TVIcon from '../assets/icon_item/Radio.png';
import RefrigeratorIcon from '../assets/icon_item/Container.png';
import MicrowaveIcon from '../assets/icon_item/Microwave.png';
import GasIcon from '../assets/icon_item/Gas.png';
import WaterIcon from '../assets/icon_item/Container-2.png';
import PetrolIcon from '../assets/icon_item/Petrol.png';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const camper = useSelector((state) =>
    state.campers.items.find((item) => item.id === id)
  );
  const [activeTab, setActiveTab] = useState('features');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!camper) return <p>Camper not found</p>;

  const features = [
    { icon: TransmissionIcon, label: camper.transmission },
    camper.AC && { icon: ACIcon },
    camper.kitchen && { icon: KitchenIcon },
    camper.bathroom && { icon: BathroomIcon },
    camper.TV && { icon: TVIcon },
    camper.refrigerator && { icon: RefrigeratorIcon },
    camper.microwave && { icon: MicrowaveIcon },
    camper.gas && { icon: GasIcon },
    camper.water && { icon: WaterIcon },
    { icon: PetrolIcon, label: camper.engine },
  ].filter(Boolean);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % camper.gallery.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + camper.gallery.length) % camper.gallery.length
    );
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <Link to="/catalog" className={styles.backLink}>← Back to Catalog</Link>

      <div className={styles.header}>
        <h1 className={styles.name}>{camper.name}</h1>
        <div className={styles.ratingRow}>
          <img src={Star} alt="Rating" className={styles.starIcon} />
          <span className={styles.rating}>{camper.rating}</span>
          <span className={styles.reviews}>({camper.reviews.length} Reviews)</span>
          <span className={styles.location}>📍 {camper.location}</span>
        </div>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>

      <div className={styles.imageGallery}>
        {camper.gallery.map((img, index) => (
          <img
            key={index}
            src={img.thumb}
            alt={`Gallery ${index + 1}`}
            className={styles.galleryImage}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          src={camper.gallery[currentImageIndex].original}
          alt={`Camper ${currentImageIndex + 1}`}
          onClose={() => setIsModalOpen(false)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.mainContent}>
        <div>
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

          {activeTab === 'features' && (
            <>
              <div className={styles.featureList}>
                {features.map((f, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <img src={f.icon} alt={f.label} />
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>

              <table className={styles.detailsTable}>
                <tbody>
                  <tr><td>Form</td><td>{camper.form}</td></tr>
                  <tr><td>Length</td><td>{camper.length}</td></tr>
                  <tr><td>Width</td><td>{camper.width}</td></tr>
                  <tr><td>Height</td><td>{camper.height}</td></tr>
                  <tr><td>Tank</td><td>{camper.tank}</td></tr>
                  <tr><td>Consumption</td><td>{camper.consumption}</td></tr>
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviews}>
              {camper.reviews.map((r, i) => (
                <div key={i} className={styles.reviewItem}>
                  <p>⭐ {r.reviewer_rating}/5 - {r.reviewer_name}</p>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.bookingSection}>
          <BookingForm camper={camper} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;