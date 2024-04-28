import ImageCard from '../ImageCard/ImageCard';
import css from '../ImageGallery/ImageGallery.module.css';

export default function ImageGallery({ items, openModal }) {
  return (
    <ul className={css.gallery}>
      {items.map((item, index) => (
        <li className={css.galleryItem} key={`${item.id}-${index}`}>
          <ImageCard item={item} onImgClick={openModal} />
        </li>
      ))}
    </ul>
  );
}
