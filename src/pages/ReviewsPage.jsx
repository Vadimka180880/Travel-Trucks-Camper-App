import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const { id } = useParams();
  const camper = useSelector((state) =>
    state.campers.items.find((item) => item.id === id)
  );

  if (!camper) return <div>Camper not found</div>;

  return (
    <div className={styles.reviewsPage}>
      <h2>Reviews for {camper.name}</h2>
      {camper.reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <p>{review.comment}</p>
          <p>Rating: {'⭐'.repeat(review.reviewer_rating)}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsPage;