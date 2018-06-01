import React from 'react';

// Components
import FullWidthImage from '../Slices/FullWidthImage';
import ImageGallery from '../Slices/ImageGallery';
import ImageHighlight from '../Slices/ImageHighlight';
import Quote from '../Slices/Quote';
import TextSection from '../Slices/TextSection';

class MainContent extends React.Component {
  render() {
    
    // Set the main content
    const mainContent = this.props.sliceZone.map(function(slice, index){
      switch (slice.slice_type) {
        case "full_width_image":
          return <FullWidthImage key={index} slice={slice}/>;
          break;
        case "image_gallery":
          return <ImageGallery key={index} slice={slice}/>;
          break;
        case "image_highlight":
          return <ImageHighlight key={index} slice={slice}/>;
          break;
        case "quote":
          return <Quote key={index} slice={slice}/>;
          break;
        case "text_section":
          return <TextSection key={index} slice={slice}/>;
          break;
      }
    });
    
    return (
      <article className="container">
        {mainContent}
      </article>
    );
  }
}

export default MainContent
