import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/images/logo.png';

// Імпортуємо SVG як звичайні зображення
import burgerIcon from '../assets/icon_catalog/burger.svg';
import closeIcon from '../assets/icon_catalog/close.svg';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {/* Кнопка бургер-меню */}
      <button className={styles.burger} onClick={toggleMenu} aria-label="Toggle menu">
        <img
          src={isMobileMenuOpen ? closeIcon : burgerIcon}
          alt="Menu Icon"
          className={styles.icon}
        />
      </button>

      {/* Навігація */}
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}>
        {location.pathname !== '/' && (
          <Link to="/" className={styles.navLink} onClick={closeMenu}>Home</Link>
        )}
        <Link to="/catalog" className={styles.navLink} onClick={closeMenu}>Catalog</Link>
        <Link to="/favorites" className={styles.navLink} onClick={closeMenu}>Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
