import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKitchen } from 'react-icons/md';
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
import { addToFavorites, removeFromFavorites } from '../store/slices/campersSlice';
import styles from './CamperCard.module.css';

// Додаємо PropTypes для перевірки типів пропсів
import PropTypes from 'prop-types';

const CamperCard = ({ camper }) => { // camper передається як пропс
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.campers.favorites);
  const isFavorite = favorites.some((fav) => fav.id === camper.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(camper.id)); // Видалити з улюблених
    } else {
      dispatch(addToFavorites(camper)); // Додати до улюблених
    }
  };

  return (
    <div className={styles.camperCard}>
      <img src={camper.gallery[0].thumb} alt={camper.name} className={styles.camperImage} />
      <h2>{camper.name}</h2>
      <p>{camper.location}</p>
      <p>Price: €{camper.price.toFixed(2)}</p>
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

// Додаємо перевірку типів для пропсів
CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        thumb: PropTypes.string.isRequired,
      })
    ).isRequired,
    transmission: PropTypes.string.isRequired,
    kitchen: PropTypes.bool.isRequired,
    AC: PropTypes.bool.isRequired,
    bathroom: PropTypes.bool.isRequired,
    TV: PropTypes.bool.isRequired,
    refrigerator: PropTypes.bool.isRequired,
    radio: PropTypes.bool.isRequired,
    gas: PropTypes.bool.isRequired,
    water: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CamperCard;