import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../store/slices/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../components/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.campers);
  const [filters, setFilters] = useState({
    AC: false,
    kitchen: false,
    bathroom: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  });

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredCampers = items.filter((camper) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true; 
      return camper[key] === true;
    });
  });

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div>Error loading data</div>;

  return (
    <div className={styles.catalogPage}>
      <h1>Catalog</h1>

      {/* Фільтри */}
      <div className={styles.filters}>
        <h2>Filters</h2>
        {Object.keys(filters).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              name={key}
              checked={filters[key]}
              onChange={handleFilterChange}
            />
            {key}
          </label>
        ))}
      </div>

      {/* Список кемперів */}
      <div className={styles.camperList}>
        {filteredCampers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;