import s from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = props => {
  return (
    <button
      className={s.Button}
      type="button"
      onClick={e => {
        props.onClick(e);
      }}
    >
      Load More
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
