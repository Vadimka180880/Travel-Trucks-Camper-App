import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setFilters, setVehicleType } from '../store/slices/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../components/Loader';
import {
  FaSnowflake,
  FaUtensils,
  FaShower,
  FaTv,
  FaMicrophone,
  FaFire,
  FaTint,
} from 'react-icons/fa';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, page, hasMore, filters, vehicleType } = useSelector(
    (state) => state.campers
  );

  // Завантаження кемперів при першому рендері
  useEffect(() => {
    console.log('Dispatching fetchCampers...'); // Логування для налагодження
    dispatch(fetchCampers(page));
  }, [dispatch, page]);

  // Функція для зміни фільтрів
  const handleFilterChange = (key) => {
    dispatch(setFilters({ ...filters, [key]: !filters[key] }));
  };

  // Функція для зміни типу авто
  const handleVehicleTypeChange = (type) => {
    dispatch(setVehicleType(type));
  };

  // Фільтрація кемперів
  const filteredCampers = items.filter((camper) => {
    const matchesFilters = Object.keys(filters).every((key) => {
      if (!filters[key]) return true; // Якщо фільтр не активний, пропускаємо
      return camper[key] === true; // Перевіряємо, чи кемпер відповідає фільтру
    });

    const matchesVehicleType = vehicleType ? camper.form === vehicleType : true; // Перевіряємо тип авто

    return matchesFilters && matchesVehicleType;
  });

  // Відображення лоадера під час завантаження
  if (status === 'loading' && page === 1) return <Loader />;

  // Відображення помилки, якщо щось пішло не так
  if (status === 'failed') return <div>Error loading data</div>;

  return (
    <div className={styles.catalogPage}>
      <h1>Catalog</h1>

      {/* Фільтри */}
      <div className={styles.filters}>
        <h2>Filters</h2>

        {/* Фільтр типу авто */}
        <div className={styles.filterButtons}>
          {['Van', 'Fully Integrated', 'Alcove'].map((type) => (
            <button
              key={type}
              className={vehicleType === type ? styles.activeFilter : ''}
              onClick={() => handleVehicleTypeChange(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Інші фільтри */}
        <div className={styles.filterButtons}>
          {Object.entries(filters).map(([key, value]) => (
            <button
              key={key}
              className={value ? styles.activeFilter : ''}
              onClick={() => handleFilterChange(key)}
            >
              {key === 'AC' && <FaSnowflake />}
              {key === 'kitchen' && <FaUtensils />}
              {key === 'bathroom' && <FaShower />}
              {key === 'TV' && <FaTv />}
              {key === 'radio' && <FaMicrophone />}
              {key === 'gas' && <FaFire />}
              {key === 'water' && <FaTint />}
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Список кемперів */}
      <div className={styles.camperList}>
        {filteredCampers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {/* Кнопка "Load more" */}
      {hasMore && (
        <button
          onClick={() => dispatch(fetchCampers(page))}
          disabled={status === 'loading'}
          className={styles.loadMoreButton}
        >
          {status === 'loading' ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default CatalogPage;