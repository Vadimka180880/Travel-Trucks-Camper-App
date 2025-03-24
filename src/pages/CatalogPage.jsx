import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCampers,
  setFilters,
  setVehicleType,
  resetCampers,
  toggleFavorite,
  nextPage,
} from '../store/slices/campersSlice';

import CamperCard from '../components/CamperCard';
import Loader from '../components/Loader';
import styles from './CatalogPage.module.css';

import VanIcon from '../assets/icon_catalog/bi_grid.svg';
import FullyIntegratedIcon from '../assets/icon_catalog/bi_grid-1x2.svg';
import AlcoveIcon from '../assets/icon_catalog/bi_grid-3x3-gap.svg';
import ACIcon from '../assets/icon_catalog/wind.svg';
import KitchenIcon from '../assets/icon_catalog/cup-hot.svg';
import BathroomIcon from '../assets/icon_catalog/diagram.svg';
import TVIcon from '../assets/icon_catalog/tv.svg';
import RefrigeratorIcon from '../assets/icon_catalog/solar_fridge-outline.svg';
import MicrowaveIcon from '../assets/icon_catalog/lucide_microwave.svg';
import GasIcon from '../assets/icon_catalog/hugeicons_gas-stove.svg';
import WaterIcon from '../assets/icon_catalog/ion_water-outline.svg';

const equipmentList = [
  { key: 'AC', label: 'AC', icon: ACIcon },
  { key: 'kitchen', label: 'Kitchen', icon: KitchenIcon },
  { key: 'bathroom', label: 'Bathroom', icon: BathroomIcon },
  { key: 'TV', label: 'TV', icon: TVIcon },
  { key: 'refrigerator', label: 'Refrigerator', icon: RefrigeratorIcon },
  { key: 'microwave', label: 'Microwave', icon: MicrowaveIcon },
  { key: 'gas', label: 'Gas', icon: GasIcon },
  { key: 'water', label: 'Water', icon: WaterIcon },
];

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, hasMore, filters, vehicleType, error, favorites } = useSelector((state) => state.campers);
  const [localVehicleType, setLocalVehicleType] = useState(vehicleType);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers(1));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(resetCampers());
    dispatch(setVehicleType(localVehicleType));
    dispatch(fetchCampers(1));
    setPage(1);
  };

  const loadMore = () => {
    if (status !== 'loading') {
      dispatch(fetchCampers(page + 1));
      dispatch(nextPage()); // ← оновлення номера сторінки
    }
  };

  return (
    <div className={styles.catalogPage}>
      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>Vehicle Type</div>
          <div className={styles.vehicleTypeIcons}>
            {[
              { type: 'Van', icon: VanIcon },
              { type: 'Fully Integrated', icon: FullyIntegratedIcon },
              { type: 'Alcove', icon: AlcoveIcon },
            ].map(({ type, icon }) => (
              <button
                key={type}
                className={`${styles.vehicleTypeButton} ${
                  localVehicleType === type ? styles.activeVehicleType : ''
                }`}
                onClick={() => setLocalVehicleType(type)}
              >
                <img src={icon} alt={type} className={styles.icon} />
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>Vehicle Equipment</div>
          <div className={styles.iconGrid}>
            {equipmentList.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`${styles.iconButton} ${filters[key] ? styles.active : ''}`}
                onClick={() => {
                  dispatch(setFilters({ [key]: !filters[key] }));
                }}
              >
                <img src={icon} alt={label} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className={styles.camperList}>
        {status === 'loading' && <Loader />}
        {status === 'failed' && <p className={styles.error}>Error: {error}</p>}
        {status !== 'loading' && items.length === 0 && (
          <p>No results found. Try adjusting your filters.</p>
        )}
        {items.map((camper, index) => (
          <CamperCard
            key={camper.id || index}
            camper={camper}
            isFavorite={favorites.some(fav => fav.id === camper.id)}
            toggleFavorite={(id) => dispatch(toggleFavorite(id))}
          />
        ))}

        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button onClick={loadMore} className={styles.loadMoreButton} disabled={status === 'loading'}>
              {status === 'loading' ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
        {!hasMore && items.length > 0 && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreButton} disabled>
              No more results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
