// import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchApi } from './FetchApi';

import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';

import { Container } from './App.styled';
import { Toast } from './Toast/ToastContainer';
import { Modal } from './Modal/Modal';
import { ModalInner } from './Modal/ModalInner';

// const KEY = '31349139-c34332f5cc1455d1f889740ec';
// const BASE_URL = 'https://pixabay.com/api/?';

export const App = () => {
  const [image, setImage] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [imageHits, setImageHits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const handleSearch = search => {
    setSearch(search);
    setPage(1);
    setImage([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!search) {
      return;
    }

    try {
      fetchApi(search, page).then(res =>
        res.json().then(data => {
          setImageHits(data);
          setIsLoading(true);

          setImage(prev => [...prev, ...data.hits]);
          if (page === 1) {
            toast.success(`We found ${data.total} images`);
          }
        })
      );
    } catch (error) {
      setImage([]);
      toast.error('Cannot process your request');
    } finally {
      setIsLoading(false);
    }

    // const fetchData = async () => {
    //   setIsLoading(true);
    //   try {
    //     const { data } = await axios.get(
    //       `${BASE_URL}q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    //     );

    //     setImage(prev => [...prev, ...data.hits]);
    //     setImageHits(data);

    //     if (page === 1) {
    //       toast.success(`We found ${data.total} images`);
    //     }
    //   } catch (error) {
    //     setImage([]);
    //     toast.error('Cannot process your request');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const toggleModal = () => {
    setShowModal(pS => !pS);
  };

  const handleModal = (url, alt) => {
    toggleModal();

    setUrl(url);
    setAlt(alt);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSearch} />

      {
        <ImageGallery>
          {<ImageGalleryItem image={image} onhandleModal={handleModal} />}
        </ImageGallery>
      }
      {isLoading && <Loader />}
      {<Toast />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalInner url={url} alt={alt} />
        </Modal>
      )}
      {image.length === 0 || imageHits.totalHits === image.length || (
        <Button onClick={loadMore} />
      )}
    </Container>
  );
};
