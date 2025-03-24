import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookingForm from '../components/BookingForm';
import styles from './CamperDetailsPage.module.css';

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

  if (!camper) return <p>Camper not found</p>;

  const features = [
    { icon: TransmissionIcon, label: camper.transmission },
    { icon: ACIcon, label: camper.AC  },
    { icon: KitchenIcon, label: camper.kitchen  },
    { icon: BathroomIcon, label: camper.bathroom },
    { icon: TVIcon, label: camper.TV },
    { icon: RefrigeratorIcon, label: camper.refrigerator },
    { icon: MicrowaveIcon, label: camper.microwave },
    { icon: GasIcon, label: camper.gas },
    { icon: WaterIcon, label: camper.water },
    { icon: PetrolIcon, label:  camper.engine },
  ].filter(Boolean);

  return (
    <div className={styles.container}>
      <Link to="/catalog" className={styles.backLink}>← Back to Catalog</Link>

      <h1>{camper.name}</h1>
      <p className={styles.location}>{camper.location}</p>
      <p className={styles.price}>€{camper.price.toFixed(2)}</p>

      <div className={styles.imageGallery}>
  {camper.gallery.map((img, index) => ( <img key={index} src={img.thumb} alt={`Camper view ${index + 1}`}
   className={styles.galleryImage} />
  ))}
</div>



      <p className={styles.description}>{camper.description}</p>

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

      <div className={styles.content}>
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
  );
};

export default CamperDetailsPage;
