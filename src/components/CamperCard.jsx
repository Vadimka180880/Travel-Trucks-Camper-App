import { useState } from 'react';
import { MdKitchen } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  FaCar,
  FaUtensils,
  FaSnowflake,
  FaShower,
  FaTv,
  FaMicrophone,
  FaFire,
  FaTint,
  FaHeart,
} from 'react-icons/fa';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.camperCard}>
      <img src={camper.gallery[0].thumb} alt={camper.name} className={styles.camperImage} />
      <h2>{camper.name}</h2>
      <p>{camper.location}</p>
      <p>Price: ${camper.price}</p>
      <div className={styles.features}>
        <div>
          <FaCar /> {camper.transmission}
        </div>
        <div>
          <FaUtensils /> {camper.kitchen ? 'Kitchen' : 'No Kitchen'}
        </div>
        <div>
          <FaSnowflake /> {camper.AC ? 'AC' : 'No AC'}
        </div>
        <div>
          <FaShower /> {camper.bathroom ? 'Bathroom' : 'No Bathroom'}
        </div>
        <div>
          <FaTv /> {camper.TV ? 'TV' : 'No TV'}
        </div>
        <div>
        <MdKitchen /> {camper.refrigerator ? 'Refrigerator' : 'No Refrigerator'}
        </div>
        <div>
          <FaMicrophone /> {camper.radio ? 'Radio' : 'No Radio'}
        </div>
        <div>
          <FaFire /> {camper.gas ? 'Gas' : 'No Gas'}
        </div>
        <div>
          <FaTint /> {camper.water ? 'Water' : 'No Water'}
        </div>
      </div>
      <button onClick={toggleFavorite} className={styles.favoriteButton}>
        <FaHeart color={isFavorite ? 'red' : 'gray'} />
      </button>
      <Link to={`/catalog/${camper.id}`} className={styles.detailsLink}>Show more</Link>
    </div>
  );
};

export default CamperCard;