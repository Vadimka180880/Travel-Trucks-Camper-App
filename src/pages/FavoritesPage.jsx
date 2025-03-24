import { useSelector, useDispatch } from 'react-redux';
import CamperCard from '../components/CamperCard';
import styles from './FavoritesPage.module.css';
import { toggleFavorite } from '../store/slices/campersSlice';
import { toast } from 'react-toastify';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.campers.favorites);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
    const isNowFavorite = favorites.some(f => f.id === id);
    toast[isNowFavorite ? 'info' : 'success'](
      isNowFavorite ? 'Removed from favorites' : 'Added to favorites'
    );
  };

  return (
    <div className={styles.favoritesPage}>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorites yet</p>
      ) : (
        <div className={styles.camperList}>
          {favorites.map((camper) => (
            <CamperCard
              key={camper.id}
              camper={camper}
              isFavorite={true}
              toggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
