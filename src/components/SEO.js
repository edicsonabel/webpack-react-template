import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types";
import metaData from "../../package.json";

const capitalizeFirstLetter= str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const SEO = ({ description, lang, title, author, meta }) => {
  description = description ? description : metaData.description
  author = author ? author : metaData.author;
  title = title ? title : metaData.name.split("-").map( word => capitalizeFirstLetter(word)).join(" ")

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  author: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO