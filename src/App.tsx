import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageCard from 'components/ImageCard';
import { Image } from 'components/ImageCard/Image';

interface ApiResponse {
  data: Array<Image>;
  errors: any;
  messages: any;
  status: string;
}

interface State {
  view?: boolean;
  remove?: boolean;
}

interface ImageState extends State {
  image: Image;
}

/**
 * Main app which displays 4 images per row (images taken from interactive1's external API)
 */
function App() {

  /* images state */
  const [ imageStates, setImageState ] = useState<Array<ImageState>>([]);

  /* fetch images on mount */
  useEffect(() => {
    fetch("https://api-dev.insidetrak.interactive1.com/homepage/get-latest-images")
      .then( res => res.json() )
      .then( ( apiResponse: ApiResponse ) => {

        /* set images viewed & remove */
        const imageStates = apiResponse.data.map( image => {
          return {
            image,
            remove: false,
            view: false,
          }
        })

        /* set image states */
        setImageState(imageStates);
      });
  }, []);

  /* change image state function */
  const changeImageState = (id: string, state: State) => {
    const newImageStates = imageStates.map( imageState => {
      /* check by id and change states */
      if (imageState.image.id === id) return { ...imageState, ...state }
      /* or return old state */
      else return imageState
    });
    /* and set new states */
    setImageState( newImageStates );
  };

  /* handle view click */
  const handleViewClick = (id: string) => {
    const imageState = imageStates.find( imageState => imageState.image.id === id );
    const view = imageState ? !imageState.view : false;
    changeImageState(id, { view });
  };

  /* handle remove click */
  const handleRemoveClick = (id: string) => {
    changeImageState(id, { remove: true });
  };

  /* image card array, filtered by remove state */
  const imageCards = imageStates
    .filter( imageState => !imageState.remove )
    .map( (imageState, ind) => {
      const { image, view } = imageState;
      return (
        <ImageCard {...{
          key: ind,
          image,
          view,
          handleViewClick,
          handleRemoveClick,
        }}/>
      )
    })

  /* render */
  return (
    <div className="card-columns p-3" style={{columnCount: 4}}>
      { imageCards }
    </div>
  );
}

export default App;
