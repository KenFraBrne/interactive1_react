import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageCard from 'components/ImageCard';
import { Image } from 'components/ImageCard/Image';

import {
  getLocalState,
  addLocalState,
  removeLocalState,
  resetLocalState
} from 'util/localImageState'

import './App.css';

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
  const [ imageStates, setImageStates ] = useState<Array<ImageState>>([]);

  /* load images function */
  const loadImages = () => {

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
      setImageStates(imageStates);
    });
  };

  /* on mount */
  useEffect(() => {
    loadImages();
  }, []);

  /* change individual image state */
  const changeImageState = (id: string, state: State) => {
    const newImageStates = imageStates.map( imageState => {
      /* check by id and change states */
      if (imageState.image.id === id) return { ...imageState, ...state }
      /* or return old state */
      else return imageState
    });
    /* and set new states */
    setImageStates( newImageStates );
  };

  /* change all image states */
  const changeImageStates = (state: State) => {
    const newImageStates = imageStates.map( imageState => ({...imageState, ...state}) );
    setImageStates( newImageStates );
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

  /* handle reset view */
  const handleResetView = () => {

    /* set all views */
    changeImageStates({ view: false });

    /* delete locally stored view */
    resetLocalState('view');

  };

  /* handle reset remove */
  const handleResetRemove = () => {

    /* set all removes */
    changeImageStates({ remove: false });

    /* delete locally stored view */
    resetLocalState('remove');

    /* reload images */
    loadImages();

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
    <div className="container-fluid">
      <div className="container p-2 d-flex flex-wrap justify-content-center" >
        <button
          onClick={() => handleResetView()}
          className="my-2 mx-3 btn btn-outline-primary">
          Resetiraj pogledano
        </button>
        <button
          onClick={() => handleResetRemove()}
          className="my-2 mx-3 btn btn-outline-danger">
          Resetiraj obrisano
        </button>
      </div>
      <div id="cardColumns" className="card-columns p-3">
        { imageCards }
      </div>
    </div>
  );
}

export default App;
