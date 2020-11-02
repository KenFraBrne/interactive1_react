import React from 'react';
import { Image } from 'components/ImageCard/Image'

interface Props {
  image: Image;
}

/**
 * Image card functional component for individual images
 */
function ImageCard(props: Props) {

  // extract image data
  const {
    title,
    description,
    publishedOn,
    thumbnailUrls
  } = props.image;

  // parse published date
  const publishedDate = new Date(publishedOn);

  // render
  return (
    <div className="col mb-3">
      <div className="card h-100">
        <img
          src={ thumbnailUrls.imedia_300 }
          className="card-img-top"
          alt="..."/>
        <b> { title } </b>
        <p> { description } </p>
        <p className="card-text">
          <small className="text-muted">
            Datum objave: {publishedDate.toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
}

export default ImageCard;
