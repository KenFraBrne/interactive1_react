import React from 'react';

import { Image } from 'components/ImageCard/Image';
import { FiEye, FiX } from 'react-icons/fi';
import useWidth from 'hooks/useWidth';
import './index.css';

type HandleClick = (id: string) => void;

interface Props {
  image: Image;
  view: boolean | undefined;
  handleViewClick: HandleClick;
  handleRemoveClick: HandleClick;
}

/**
 * Image card functional component for individual images
 */
function ImageCard(props: Props) {

  /* extract props data */
  const {
    image,
    view,
    handleViewClick,
    handleRemoveClick,
  } = props;

  /* extract image data */
  const {
    id,
    title,
    description,
    publishedOn,
    thumbnailUrls
  } = image;

  /* parse published date */
  const publishedDate = new Date(publishedOn);

  /* viewed button className */
  const buttonClassName = !view ? "btn btn-outline-dark" : "btn btn-outline-primary";

  /* card border className */
  const cardClassName = !view ? "card" : "card border-primary";

  /* width hook */
  const width = useWidth();

  /* image source change depending on window width */
  const imgSrc = ( () => {
    if (width < 768) return thumbnailUrls.imedia_300;
    else return thumbnailUrls.imedia_1024;
  })();

  /* render */
  return (
    <div id="cardContainer" className="col mb-3">
      <div className={ cardClassName }>
        <img
          src={ imgSrc }
          className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title"> { title } </h5>
          <p className="card-text"> { description } </p>
          <p className="d-flex justify-content-between">
            <button
              className={ buttonClassName }
              onClick={ () => handleViewClick(id) }> <FiEye /> </button>
            <button
              className="btn btn-outline-danger"
              onClick={ () => handleRemoveClick(id)}> <FiX /> </button>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Datum objave: {publishedDate.toLocaleDateString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
