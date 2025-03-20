import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.banner}>
        <h1>Campers of Your Dreams</h1>
        <p>You can find everything you want in our catalog.</p>
        <Link to="/catalog" className={styles.ctaButton}>View Now</Link>
      </div>
    </div>
  );
};

export default HomePage;