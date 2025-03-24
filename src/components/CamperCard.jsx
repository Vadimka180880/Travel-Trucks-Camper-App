import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CamperCard.module.css';

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

import Heart from '../assets/icon_catalog/heart.svg';
import HeartFilled from '../assets/icon_catalog/heart-filled.svg';
import Star from '../assets/icon_catalog/star.svg';

const CamperCard = ({ camper, isFavorite, toggleFavorite }) => {
  const imageUrl = camper.gallery?.[0]?.thumb || 'default-image.jpg';

  const renderFeature = (icon, label) => (
    <div className={styles.featureItem}>
      <img src={icon} alt={label} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </div>
  );

  return (
    <div className={styles.camperCard}>
      <img src={imageUrl} alt={camper.name} className={styles.camperImage} />
      <div className={styles.camperInfo}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceFavoriteWrapper}>
            <p className={styles.price}>€{camper.price.toFixed(2)}</p>
            <img
              src={isFavorite ? HeartFilled : Heart}
              alt="Favorite"
              className={styles.heartIcon}
              onClick={() => toggleFavorite(camper.id)}
            />
          </div>
        </div>
        <p className={styles.location}>{camper.location}</p>
        <div className={styles.ratingRow}>
          <img src={Star} alt="Rating" className={styles.starIcon} />
          <span className={styles.rating}>{camper.rating}</span>
          <span className={styles.reviewCount}>({camper.reviews?.length || 0} Reviews)</span>
        </div>
        <div className={styles.features}>
          {renderFeature(TransmissionIcon)}
          {camper.AC && renderFeature(ACIcon)}
          {camper.kitchen && renderFeature(KitchenIcon)}
          {camper.bathroom && renderFeature(BathroomIcon)}
          {camper.TV && renderFeature(TVIcon)}
          {camper.refrigerator && renderFeature(RefrigeratorIcon)}
          {camper.microwave && renderFeature(MicrowaveIcon)}
          {camper.gas && renderFeature(GasIcon)}
          {camper.water && renderFeature(WaterIcon)}
          {renderFeature(PetrolIcon, camper.engine)}
        </div>
        
        <Link to={`/catalog/${camper.id}`} className={styles.detailsLink}>
          Show more
        </Link>
      </div>
    </div>
  );
};

CamperCard.propTypes = {
  camper: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  toggleFavorite: PropTypes.func,
};

export default CamperCard;
