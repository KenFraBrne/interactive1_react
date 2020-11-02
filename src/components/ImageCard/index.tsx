import React from 'react';
import { Image } from 'components/ImageCard/Image';
import { FiEye, FiX } from 'react-icons/fi';

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

  /* render */
  return (
    <div className="col mb-3">
      <div className={ cardClassName }>
        <img
          src={ thumbnailUrls.imedia_300 }
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
