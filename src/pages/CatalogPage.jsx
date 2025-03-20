import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../store/slices/campersSlice';
import CamperCard from '../components/CamperCard';
import Loader from '../components/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <div>Error loading data</div>;

  return (
    <div className={styles.catalogPage}>
      <h1>Catalog</h1>
      <div className={styles.camperList}>
        {items.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;