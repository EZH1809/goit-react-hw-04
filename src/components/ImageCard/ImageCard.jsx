import css from '../ImageCard/ImageCard.module.css';

export default function ImageCard({ item, onImgClick }) {
  const {
    alt_description,
    urls: { small, regular },
  } = item;

  const handleImageClick = () => {
    if (typeof onImgClick === 'function') {
      onImgClick(regular);
    }
  };

  return (
    <div className={css.ImageCard}>
      <img
        className={css.image}
        src={small}
        alt={alt_description}
        onClick={handleImageClick}
      />
    </div>
  );
}
