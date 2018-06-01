import React from 'react';
import { RichText } from 'prismic-reactjs';

export const Quote = (props) => {
  return (
    <section className="content-section quote">
      <blockquote>
        {RichText.asText(props.slice.primary.quote_text)}
      </blockquote>
    </section>
  );
};

export default Quote;