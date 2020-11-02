import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ImageCard from 'components/ImageCard';

/**
 * Main app which displays 4 images per row (images taken from interactive1's external API)
 */
function App() {

  const imageCards = Array(20).fill(null).map( (_, ind) => {
    return (
      <ImageCard key={ind} image={ind}/>
    )
  })

  return (
    <div className="container">
      <div className="row row-cols-4">
        { imageCards }
      </div>
    </div>
  );
}

export default App;
