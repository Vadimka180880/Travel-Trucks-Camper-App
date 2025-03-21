import { useSelector } from 'react-redux';
import CamperCard from '../components/CamperCard';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.campers.favorites);

  return (
    <div className={styles.favoritesPage}>
      <h1>Your Favorites</h1>
      <div className={styles.camperList}>
        {favorites.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;