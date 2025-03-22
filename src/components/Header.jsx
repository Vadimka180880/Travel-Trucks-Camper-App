import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="TravelTrucks" />
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/catalog" className={styles.navLink}>Catalog</Link>
        <Link to="/favorites" className={styles.navLink}>Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;