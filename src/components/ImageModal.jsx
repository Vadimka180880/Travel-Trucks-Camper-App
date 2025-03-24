import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

const ImageModal = ({ src, alt, onClose, onPrev, onNext }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.navButton} 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{ left: '10px' }}
        >
          ←
        </button>
        <img src={src} alt={alt} className={styles.fullImage} />
        <button 
          className={styles.navButton} 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{ right: '10px' }}
        >
          →
        </button>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired, 
  onNext: PropTypes.func.isRequired, 
};

export default ImageModal;