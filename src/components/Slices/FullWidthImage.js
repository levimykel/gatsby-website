import React from 'react';

export const FullWidthImage = (props) => {
  return (
    <section className="full-width-image content-section">
      <img
        src={props.slice.primary.image.url}
        alt={props.slice.primary.image.alt}
      />
    </section>
  );
};

export default FullWidthImage;