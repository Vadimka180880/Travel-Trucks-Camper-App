import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import mainPhoto from '../assets/images/banner.jpg';
import mainPhoto2x from '../assets/images/banner@2x.jpg';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroSection}>
          <img
            src={mainPhoto}
            srcSet={`${mainPhoto} 1x, ${mainPhoto2x} 2x`}
            alt="Campers"
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <h1>Campers of Your Dreams</h1>
            <p>You can find everything you want in our catalog.</p>
            <Link to="/catalog" className={styles.ctaButton}>
              View Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
