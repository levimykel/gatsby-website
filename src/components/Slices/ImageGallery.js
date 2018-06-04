import React from 'react';
import {Link as PrismicLink, RichText, Date} from 'prismic-reactjs';
import PrismicConfig from '../../../prismic-config';

// Components
import VariableLink from '../VariableLink';

export const ImageGallery = (props) => {
  
  // Get the gallery items
  const galleryItems = props.slice.items.map(function(galleryItem, index){
    
    // Get the link
    const galleryLink = PrismicLink.url(galleryItem.link, PrismicConfig.linkResolver);
    const linkLabel = RichText.asText(galleryItem.link_label);
    const link = 
      galleryLink && linkLabel != " " ?
      <p className="gallery-link"><VariableLink link={galleryItem.link} label={galleryItem.link_label}/></p> :
      null;

    return (
      <div className="gallery-item" key={index}>
        <img src={galleryItem.image.url} alt={galleryItem.image.alt} />
        {RichText.render(galleryItem.image_description, PrismicConfig.linkResolver)}
        {link}
      </div>
    );
  });

  return (
    <section className="image-gallery content-section">
      {RichText.render(props.slice.primary.gallery_title, PrismicConfig.linkResolver)}
      <div className="gallery">
        {galleryItems}
      </div>
    </section>
  );
};

export default ImageGallery;