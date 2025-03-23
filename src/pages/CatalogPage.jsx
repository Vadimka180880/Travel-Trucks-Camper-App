import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setFilters, setVehicleType } from '../store/slices/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../components/Loader';
import styles from './CatalogPage.module.css';

// Імпорт іконок
import VanIcon from '../assets/icon_catalog/bi_grid.svg';
import FullyIntegratedIcon from '../assets/icon_catalog/bi_grid-1x2.svg';
import AlcoveIcon from '../assets/icon_catalog/bi_grid-3x3-gap.svg';
import ACIcon from '../assets/icon_catalog/wind.svg';
import KitchenIcon from '../assets/icon_catalog/cup-hot.svg';
import BathroomIcon from '../assets/icon_catalog/diagram.svg';
import TVIcon from '../assets/icon_catalog/tv.svg';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, hasMore, filters, vehicleType } = useSelector((state) => state.campers);
  const [localVehicleType, setLocalVehicleType] = useState(vehicleType);
  const [page, setPage] = useState(1);

  // Фільтрація при натисканні Search
  const handleSearch = () => {
    dispatch(setVehicleType(localVehicleType));
    dispatch(fetchCampers(1)); // Починаємо з першої сторінки
    setPage(1);
  };

  // Завантаження даних при зміні сторінки
  useEffect(() => {
    dispatch(fetchCampers(page));
  }, [dispatch, page]);

  return (
    <div className={styles.catalogPage}>
      {/* Фільтри зліва */}
      <div className={styles.filtersSection}>
        <h2>Filters</h2>
        
        {/* Vehicle Type як іконки */}
        <div className={styles.filterGroup}>
          <label>Vehicle Type</label>
          <div className={styles.vehicleTypeIcons}>
            <button
              className={localVehicleType === 'Van' ? styles.activeVehicleType : ''}
              onClick={() => setLocalVehicleType('Van')}
            >
              <img src={VanIcon} alt="Van" className={styles.icon} /> Van
            </button>
            <button
              className={localVehicleType === 'Fully Integrated' ? styles.activeVehicleType : ''}
              onClick={() => setLocalVehicleType('Fully Integrated')}
            >
              <img src={FullyIntegratedIcon} alt="Fully Integrated" className={styles.icon} /> Fully Integrated
            </button>
            <button
              className={localVehicleType === 'Alcove' ? styles.activeVehicleType : ''}
              onClick={() => setLocalVehicleType('Alcove')}
            >
              <img src={AlcoveIcon} alt="Alcove" className={styles.icon} /> Alcove
            </button>
          </div>
        </div>

        {/* Інші фільтри з іконками */}
        <div className={styles.filterGroup}>
          {Object.entries(filters).map(([key, value]) => (
            <label key={key} className={styles.filterItem}>
              <input 
                type="checkbox" 
                checked={value} 
                onChange={() => dispatch(setFilters({ [key]: !value }))} 
              />
              <span className={styles.filterIcon}>
                {key === 'AC' && <img src={ACIcon} alt="AC" className={styles.icon} />}
                {key === 'kitchen' && <img src={KitchenIcon} alt="Kitchen" className={styles.icon} />}
                {key === 'bathroom' && <img src={BathroomIcon} alt="Bathroom" className={styles.icon} />}
                {key === 'TV' && <img src={TVIcon} alt="TV" className={styles.icon} />}
              </span>
              {key}
            </label>
          ))}
        </div>

        {/* Кнопка пошуку внизу */}
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {/* Список кемперів */}
      <div className={styles.camperList}>
        {items.slice(0, page * 4).map((camper, index) => ( // Використовуємо index для унікальних ключів
          <CamperCard key={`${camper.id}-${index}`} camper={camper} />
        ))}
      </div>

      {/* Кнопка Load More внизу */}
      {hasMore && items.length > page * 4 && (
        <div className={styles.loadMoreContainer}>
          <button 
            onClick={() => setPage(page + 1)} 
            className={styles.loadMoreButton}
          >
            {status === 'loading' ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;