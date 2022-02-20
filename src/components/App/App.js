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
    images: null,
    error: null,
    loading: false,
    page: 1,
    showModal: false,
    largeImage: null,
    showLoadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.imageName;
    const currentImage = this.state.imageName;
    const currentPage = this.state.page;

    try {
      if (prevImage !== currentImage || prevState.page !== currentPage) {
        this.setState({
          loading: true,
          images: null,
          showLoadMore: false,
        });
        const response = await Api.fetchImages(currentImage, currentPage);
        this.setState({
          loading: false,
          showLoadMore: response.data.hits.length < 12 ? false : true,
        });
        if (response.data.hits.length === 0) {
          toast.info(`not found images ${currentImage}`);
          return;
        }
        this.setState({
          images:
            this.state.page === 1
              ? response.data.hits
              : [...prevState.images, ...response.data.hits],
        });
        if (response.data.hits.length < 12) {
          this.setState({ showLoadMore: false });
        }
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
    const { images, loading, largeImage, showModal, showLoadMore } = this.state;
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
        {showModal && (
          <Modal onClose={this.toogleModal} largeImage={largeImage}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
        {showLoadMore && <Button onClick={this.handleLoadMore} />}
        {loading && <Loader> </Loader>}
      </Container>
    );
  }
}

export default App;
