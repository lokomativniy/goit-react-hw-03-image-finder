import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = props => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={() => {
          props.onClick(props.image.largeImageURL);
          props.onClose();
        }}
        className={s.ImageGalleryItemImage}
        src={props.image.webformatURL}
        alt={props.image.tags}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
