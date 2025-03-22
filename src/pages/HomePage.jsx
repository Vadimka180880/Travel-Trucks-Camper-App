import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Імпорт лого
import banner from '../assets/images/banner.jpg'; // Імпорт банеру
import banner2x from '../assets/images/banner@2x.jpg'; // Імпорт банеру для ретіна-дисплеїв
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      {/* Лого */}
      <div className={styles.logo}>
        <img src={logo} alt="TravelTrucks Logo" />
      </div>

      {/* Банер з фоткою */}
      <div className={styles.banner}>
        <img
          src={banner}
          srcSet={`${banner} 1x, ${banner2x} 2x`}
          alt="Campers of Your Dreams"
          className={styles.bannerImage}
        />
        <h1>Campers of Your Dreams</h1>
        <p>You can find everything you want in our catalog.</p>
        <Link to="/catalog" className={styles.ctaButton}>View Now</Link>
      </div>
    </div>
  );
};

export default HomePage;