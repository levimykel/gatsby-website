import React from 'react';
import {Link as PrismicLink, RichText, Date} from 'prismic-reactjs';
import PrismicConfig from '../../../prismic-config';

// Components
import Link from 'gatsby-link';

export const VariableLink = (props) => {

  const linkUrl = PrismicLink.url(props.link, PrismicConfig.linkResolver);
  const linkLabel = RichText.asText(props.label);

  if (props.link.link_type == "Document") {
    return <Link to={linkUrl}>{linkLabel}</Link>;
  }
  return <a href={linkUrl}>{linkLabel}</a>;
};

export default VariableLink
