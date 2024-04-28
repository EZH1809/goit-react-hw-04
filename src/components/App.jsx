import { useEffect, useState } from 'react';
import { fetchImages } from '../gallery-api';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import ImageModal from './ImageModal/ImageModal';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
   const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async newQuery => {
    if (!newQuery.trim()) {
      toast.error('Введіть запит для пошуку');
      return;
    }

    setIsLoading(true);
    setError('');
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const data = await fetchImages(query, page + 1);
      setImages(prevImages => [...prevImages, ...data.results]);
      setPage(page + 1);
    } catch (err) {
      setError(err.message);
      toast.error('Помилка під час завантаження додаткових зображень');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };
  const modalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getImages() {
      if (!query) return;

      setIsLoading(true);
      setError('');

      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (err) {
        setError(err.message);
        toast.error('Помилка під час завантаження даних');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error && <ErrorMessage error="Помилка під час завантаження даних" />}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && images.length > 9 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={modalClose}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
}
