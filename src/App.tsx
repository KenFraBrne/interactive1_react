import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageCard from 'components/ImageCard';
import { Image } from 'components/ImageCard/Image';

interface ApiResponse {
  data: Array<Image>;
  messages: any;
  status: string;
}

/**
 * Main app which displays 4 images per row (images taken from interactive1's external API)
 */
function App() {

  /** images state */
  const [ images, setImages ] = useState<Array<Image>>([]);

  /** initial images load */
  useEffect(() => {
    fetch("https://api-dev.insidetrak.interactive1.com/homepage/get-latest-images")
      .then( res => res.json() )
      .then( ( apiResponse: ApiResponse ) => {
        setImages( apiResponse.data );
      });
  }, []);

  /** image card array */
  const imageCards = images.map( (image, ind) => {
    return (
      <ImageCard {...{
        key: ind,
        image
      }}/>
    )
  })

  /** render */
  return (
    <div className="container p-3">
      <div className="row row-cols-4">
        { imageCards }
      </div>
    </div>
  );
}

export default App;
