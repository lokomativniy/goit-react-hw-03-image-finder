import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { ImageGallery } from '../ImageGallery/ImageGallery.jsx';
import { toast, ToastContainer } from 'react-toastify';
import Container from '../Container/Container.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { Modal } from '../Modal/Modal.jsx';
import { Button } from '../Button/Button.jsx';
import Api from '../services/pixabay-api';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    error: null,
    loading: false,
    page: 1,
    showModal: false,
    largeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.imageName;
    const currentImage = this.state.imageName;
    const currentPage = this.state.page;

    try {
      if (prevImage !== currentImage) {
        this.setState({
          loading: true,
          images: [],
        });
        const response = await Api.fetchImages(currentImage, currentPage);
        this.setState({
          loading: false,
        });
        if (response.data.hits.length === 0) {
          toast.info(`not found images ${currentImage}`);
          return;
        }
        this.setState({
          images: response.data.hits,
        });
      }
      if (prevState.page !== currentPage) {
        const response = await Api.fetchImages(currentImage, currentPage);
        this.setState({
          images: [...this.state.images, ...response.data.hits],
        });
      }
    } catch (error) {
      this.setState({
        error: toast.error('Something went wrong, please try again'),
      });
    }
    if (currentPage > 1) {
      this.scrollDown();
    }
  }
  scrollDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  handleSearcFormSubmit = imageName => {
    this.setState({ imageName });
  };

  handleImageClick = largeImage => {
    this.setState({ largeImage });
  };

  toogleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  handleLoadMore = e => {
    e.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, largeImage, showModal } = this.state;
    return (
      <Container>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleSearcFormSubmit}></Searchbar>
        {images && (
          <ImageGallery
            onClose={this.toogleModal}
            onClick={this.handleImageClick}
            images={images}
          ></ImageGallery>
        )}
        {loading && <Loader />}
        {showModal && (
          <Modal onClose={this.toogleModal} largeImage={largeImage}>
            <img src={largeImage} alt="" />
          </Modal>
        )}

        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
      </Container>
    );
  }
}

export default App;
