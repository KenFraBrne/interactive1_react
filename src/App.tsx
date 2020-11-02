import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageCard from 'components/ImageCard';
import { Image } from 'components/ImageCard/Image';
import { getLocalState, addLocalState, removeLocalState } from 'util/localImageState'

/* Interfaces */
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

type LocalStorage = string[];

/**
 * Main app which displays 4 images per row (images fetched from interactive1's API)
 */
function App() {

  /* images state */
  const [ imageStates, setImageState ] = useState<Array<ImageState>>([]);

  /* on mount */
  useEffect(() => {

    /* get local states */
    const localView: LocalStorage = getLocalState('view');
    const localRemove: LocalStorage = getLocalState('remove');

    /* fetch images */
    fetch("https://api-dev.insidetrak.interactive1.com/homepage/get-latest-images")
      .then( res => res.json() )
      .then( ( apiResponse: ApiResponse ) => {

        /* set images viewed & remove */
        const imageStates = apiResponse.data.map( image => {
          return {
            image,
            view: localView.includes(image.id),
            remove: localRemove.includes(image.id),
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

    /* change state */
    const imageState = imageStates.find( imageState => imageState.image.id === id );
    const view = imageState ? !imageState.view : false;
    changeImageState(id, { view });

    /* and save id locally, depending on view */
    if (view) addLocalState('view', id)
    else removeLocalState('view', id);
  };

  /* handle remove click */
  const handleRemoveClick = (id: string) => {
    /* change state */
    changeImageState(id, { remove: true });

    /* and save id locally */
    addLocalState('remove', id);
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
