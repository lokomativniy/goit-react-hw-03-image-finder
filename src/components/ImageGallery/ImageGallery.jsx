import s from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

// export const ImageGallery = ({ images, onClick, toogleModal }) => {
//   return (
//     <>
//       <ul className={styles.ImageGallery}>
//         {images.map(image => {
//           return (
//             <ImageGalleryItem
//               toogleModal={toogleModal}
//               onClick={onClick}
//               key={image.id}
//               image={image}
//             ></ImageGalleryItem>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

export const ImageGallery = props => (
  <ul className={s.ImageGallery}>
    {props.images.map(image => {
      return (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={props.onClick}
          onClose={props.onClose}
        ></ImageGalleryItem>
      );
    })}
  </ul>
);
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
